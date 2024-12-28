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

function Login() {
  let [searchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  
  const { data, loading, error, fn: fnLogin} = useFetch(login, formData);
  const { fetchUser } = useState()
  useEffect(() => {
    console.log(data)
    if (error === null && data) {
      navigate(`dashboard?${longLink ? `createNew=${longLink}` : ""}`)
      fetchUser()
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
          <CardDescription>vào tài khoản đã sẳn có</CardDescription>
          {error && <Error message={error.message} />}
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Input placeholder="Email" type="email" name="email" onChange={handleInputChange} />
          </div>
          {errors.email && <Error message={errors.email} />}
          <div className="space-y-1">
            <Input placeholder="Password" type="password" name="password" onChange={handleInputChange} />
          </div>
          {errors.password && <Error message={errors.password} />}
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