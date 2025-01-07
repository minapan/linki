import Login from "@/components/Login";
import Signup from "@/components/Signup";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UrlState } from "@/context";
import { logout } from "@/db/apiAuth";
import useFetch from "@/hooks/use-fetch";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

function Auth() {
  let [searchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");
  const { isAuthenticated, loading } = UrlState();
  const {user, fetchUser} = UrlState();
  const navigate = useNavigate();
  const { fn: fnLogout } = useFetch(logout);

  return (
    <div className="flex flex-col items-center gap-10 mt-18">
      {isAuthenticated && !loading ? (
        // Hiển thị nếu người dùng đã đăng nhập
        <>
          <h1 className="text-4xl font-extrabold">Bạn đã đăng nhập vào tài khoản  
            <span className="text-green-500"> {user?.user_metadata.name}</span>!</h1>
          <p className="text-lg">
            Vui lòng đăng xuất trước khi tiếp tục thực hiện các thao tác khác.
          </p>
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
        </>
      ) : (
        // Hiển thị giao diện đăng nhập / đăng ký
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
      )}
    </div>
  );
}

export default Auth;
