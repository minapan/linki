import Login from "@/components/Login";
import Signup from "@/components/Signup";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UrlState } from "@/context";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";


function Auth() {
  let [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { isAuthenticated, loading } = UrlState();
  const longLink = searchParams.get("createNew");

  useEffect(() => {
    if (isAuthenticated && !loading)
      navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
  }, [isAuthenticated, loading, navigate]);
  return (<>
    <div className="flex flex-col items-center gap-10 mt-18">
      <h1 className="text-4xl font-extrabold">{longLink ? "Bạn cần đăng nhập trước đã..." : "Đăng nhập / Đăng ký"}</h1>
      <Tabs defaultValue="Login" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="Login">Đăng nhập</TabsTrigger>
          <TabsTrigger value="Signup">Đăng ký</TabsTrigger>
        </TabsList>
        <TabsContent value="Login"><Login /></TabsContent>
        <TabsContent value="Signup"><Signup /></TabsContent>
      </Tabs>
    </div>

  </>);
}

export default Auth;