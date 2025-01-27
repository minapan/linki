import Login from "@/components/Login";
import Signup from "@/components/Signup";
import { Button } from "@/components/ui/button";
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
    <>
      {isAuthenticated && !loading ? (
        <>
          <div className="flex flex-col items-center gap-6">
            <h1 className="text-4xl font-extrabold">Bạn đã đăng nhập vào tài khoản
              <span className="text-green-500"> {user?.user_metadata.name}</span>!</h1>
            <p className="text-lg">
              Vui lòng đăng xuất trước khi đăng nhập vào tài khoản khác.
            </p>
            <img className="mx-auto h-72" src="/authenticated.svg" alt="" />
            <div className="flex gap-6">
              <Button
                className="bg-red-600 hover:bg-red-500 text-white"
                onClick={() => {
                  fnLogout().then(() => {
                    fetchUser();
                    navigate("/auth");
                  });
                }}
              >
                Đăng xuất
              </Button>
              <Button
                className="bg-sky-600 hover:bg-sky-500 "
                onClick={() => { navigate("/") }}
              >
                Về trang chủ
              </Button>
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center mt-18">
          <img className="mx-auto h-24" src="/welcome-cats.svg" alt="" />
          <h1 className="text-4xl font-extrabold mb-6">
            {longLink ? "Bạn cần đăng nhập trước đã..." : ""}
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
        </div>
      )
      }
    </ >
  );
}

export default Auth;
