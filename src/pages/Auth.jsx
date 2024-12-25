import Login from "@/components/Login";
import Signup from "@/components/Sinup";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useSearchParams } from "react-router-dom";


function Auth() {
  const [searchParams] = useSearchParams();

  return (<>
  <div className="flex flex-col items-center gap-10 mt-30">
    <h1 className="text-4xl font-extrabold">{searchParams.get("createNew") ? "Bạn cần đăng nhập trước đã..." : "Đăng nhập / Đăng ký"}</h1>
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