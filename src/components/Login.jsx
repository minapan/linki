import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { BeatLoader } from "react-spinners";
import Error from "./ui/error";
import { useState } from "react";
import * as Yup from "yup";
import useFetch from "@/hooks/use-fetch";
import { login } from "@/db/apiAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { UrlState } from "@/context";
import PasswordVisibilityToggle from "./password-toggle";
import { Link } from "react-router-dom";

function Login() {
  let [searchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  function togglePasswordVisibility() {
    setIsPasswordVisible((prevState) => !prevState);
  }

  const { data, loading, error, fn: fnLogin } = useFetch(login, formData);
  const { fetchUser } = UrlState();
  useEffect(() => {
    if (error === null && data) {
      fetchUser()
      navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, error])

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  };

  const handleLogin = async () => {
    setErrors([]);
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .email("Email không đúng định dạng")
          .required("Email là bắt buộc"),
        password: Yup.string()
          .min(6, "Mật khẩu phải từ đủ 6 ký tự")
          .required("Mật khẩu là bắt buộc"),
      });

      await schema.validate(formData, { abortEarly: false });
      await fnLogin();
    } catch (e) {
      const newErrors = {};

      e?.inner?.forEach((err) => {
        newErrors[err.path] = err.message;
      });

      setErrors(newErrors);
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Đăng nhập</CardTitle>
          <CardDescription>Vào tài khoản đã sẳn có</CardDescription>
          {error && <Error message={error?.message} />}
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="relative">
            <Input id="email" type="email" name="email" className="peer "
              placeholder=" " onChange={handleInputChange} />
            <label
              htmlFor="email"
              className="absolute text-sm text-gray-400 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-1 z-10 origin-[0] label dark:bg-gray-900 px-1 peer-focus:px-1 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
            >
              Email
            </label>
          </div>
          {errors.email && <Error message={errors.email} />}
          <div className="relative">
            <Input className="peer " id="password"
              placeholder=" " type={isPasswordVisible ? "text" : "password"} name="password" onChange={handleInputChange} />
            <label
              htmlFor="password"
              className="absolute text-sm text-gray-400 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-1 z-10 origin-[0] label dark:bg-gray-900 px-1 peer-focus:px-1 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
            >
              Mật khẩu
            </label>
            <PasswordVisibilityToggle
              isPasswordVisible={isPasswordVisible}
              togglePasswordVisibility={togglePasswordVisibility}
            />
          </div>
          {errors.password && <Error message={errors.password} />}
          <Link
            to={"/account/forgot-password"}
            className="text-gray-400 text-sm hover:underline float-end"
          >
            Quên mật khẩu?
          </Link>
        </CardContent>
        <CardFooter>
          <Button onClick={handleLogin}>
            {loading ? <BeatLoader size={10} color="#020817" /> : "Đăng nhập"}
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}

export default Login;