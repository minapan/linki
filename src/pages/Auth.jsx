import Login from "@/components/Login";
import Signup from "@/components/Signup";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UrlState } from "@/context";
import { logout } from "@/db/apiAuth";
import useFetch from "@/hooks/use-fetch";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

function Auth() {
  const navigate = useNavigate();
  let [searchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");
  useEffect(() => {
    if (longLink && isAuthenticated) navigate(`/dashboard?createNew=${longLink}`);
  }, []);
  
  const { isAuthenticated, loading } = UrlState();
  const { user, fetchUser } = UrlState();
  const { fn: fnLogout } = useFetch(logout);

  return (
    <div className="flex flex-col items-center gap-10 mt-18">
      {isAuthenticated && !loading ? (
        <>
          <h1 className="text-4xl font-extrabold text-balance">Bạn đã đăng nhập vào tài khoản
            <span className="text-green-500"> {user?.user_metadata.name}</span>!</h1>
          <p className="text-lg">
            Vui lòng đăng xuất trước khi đăng nhập vào tài khoản khác.
          </p>
          <div className="flex gap-6">
            <button
              onClick={() => {
                fnLogout().then(() => {
                  fetchUser();
                  navigate("/auth");
                });
              }}
              className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Đăng xuất
            </button>
            <button
              onClick={() => {navigate("/")}}
              className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Về trang chủ
            </button>
          </div>

        </>
      ) : (
        <>
          <h1 className="text-4xl font-extrabold">
            {longLink ? "Bạn cần đăng nhập trước đã..." : "Đăng nhập / Đăng ký"}
          </h1>
          <Tabs defaultValue="Login" className="w-[400px]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="Login">Đăng nhập</TabsTrigger>
              <TabsTrigger value="Signup">Đăng ký</TabsTrigger>
            </TabsList>
            <TabsContent value="Login">
              <Login />
            </TabsContent>
            <TabsContent value="Signup">
              <Signup />
            </TabsContent>
          </Tabs>
        </>
      )
      }
    </div >
  );
}

export default Auth;
