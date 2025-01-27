import { useEffect, useState } from "react";
import Error from "./ui/error";
import { Input } from "./ui/input";  // Giữ nguyên việc sử dụng Input component
import * as Yup from "yup";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { useNavigate, useSearchParams } from "react-router-dom";
import { signup } from "@/db/apiAuth";
import { BeatLoader } from "react-spinners";
import useFetch from "@/hooks/use-fetch";
import "../index.css"
import PasswordVisibilityToggle from "./password-toggle";

function Signup() {
  let [searchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");

  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    profile_pic: null,
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  function togglePasswordVisibility() {
    setIsPasswordVisible((prevState) => !prevState);
  }
  function toggleConfirmPasswordVisibility() {
    setIsConfirmPasswordVisible((prevState) => !prevState);
  }

  const { loading, error, fn: fnSignup, data } = useFetch(signup, formData);

  useEffect(() => {
    if (error === null && data) {
      navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, loading]);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSignup = async () => {
    setErrors([]);
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required("Vui lòng nhập tên"),
        email: Yup.string()
          .email("Email không hợp lệ")
          .required("Vui lòng nhập email"),
        password: Yup.string()
          .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
          .matches(/[a-z]/, "Mật khẩu phải chứa ít nhất một chữ cái thường")
          .matches(/[A-Z]/, "Mật khẩu phải chứa ít nhất một chữ cái hoa")
          .matches(/\d/, "Mật khẩu phải chứa ít nhất một số")
          .required("Vui lòng nhập mật khẩu"),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref("password"), null], "Mật khẩu xác nhận không khớp")
          .required("Vui lòng nhập lại mật khẩu"),
        profile_pic: Yup.mixed().required("Vui lòng chọn ảnh đại diện"),
      });

      await schema.validate(formData, { abortEarly: false });
      await fnSignup();
    } catch (error) {
      const newErrors = {};
      if (error?.inner) {
        error.inner.forEach((err) => {
          newErrors[err.path] = err.message;
        });

        setErrors(newErrors);
      } else {
        setErrors({ api: error.message });
      }
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Đăng ký</CardTitle>
        <CardDescription>Tạo ngay tài khoản mới</CardDescription>
        {error && <Error message={error?.message} />}
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Ảnh đại diện */}
        <div className="flex items-center space-x-2">
          <label htmlFor="profile_pic" className="w-2/6 text-sm font-medium text-gray-400">
            Ảnh đại diện
          </label>
          <div className="flex-1">
            <input
              id="profile_pic"
              name="profile_pic"
              type="file"
              accept="image/*"
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md"
            />
          </div>
        </div>
        {errors.profile_pic && <Error message={errors.profile_pic} />}

        {/* Họ tên */}
        <div className="relative">
          <Input
            id="name"
            name="name"
            type="text"
            onChange={handleInputChange}
            value={formData.name}
            className="peer "
            placeholder=" "
          />
          <label
            htmlFor="name"
            className="absolute text-sm text-gray-400 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-1 z-10 origin-[0] label px-1 peer-focus:px-1 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
          >
            Họ tên
          </label>
        </div>
        {errors.name && <Error message={errors.name} />}

        {/* Email */}
        <div className="relative">
          <Input
            id="email"
            name="email"
            type="email"
            onChange={handleInputChange}
            value={formData.email}
            className="peer "
            placeholder=" "
          />
          <label
            htmlFor="email"
            className="absolute text-sm text-gray-400 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-1 z-10 origin-[0] label px-1 peer-focus:px-1 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
          >
            Email
          </label>
        </div>
        {errors.email && <Error message={errors.email} />}

        {/* Mật khẩu */}
        <div className="relative">
          <Input
            id="password"
            name="password"
            type={isPasswordVisible ? "text" : "password"}
            onChange={handleInputChange}
            value={formData.password}
            className="peer "
            placeholder=" "
          />
          <label
            htmlFor="password"
            className="absolute text-sm text-gray-400 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-1 z-10 origin-[0] label px-1 peer-focus:px-1 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
          >
            Mật khẩu
          </label>
          <PasswordVisibilityToggle
              isPasswordVisible={isPasswordVisible}
              togglePasswordVisibility={togglePasswordVisibility}
            />
        </div>
        {errors.password && <Error message={errors.password} />}

        {/* Nhập lại mật khẩu */}
        <div className="relative">
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type={isConfirmPasswordVisible ? "text" : "password"}
            onChange={handleInputChange}
            value={formData.confirmPassword}
            className="peer "
            placeholder=" "
          />
          <label
            htmlFor="confirmPassword"
            className="absolute text-sm text-gray-400 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-1 z-10 origin-[0] label px-1 peer-focus:px-1 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
          >
            Nhập lại mật khẩu
          </label>
          <PasswordVisibilityToggle
              isPasswordVisible={isConfirmPasswordVisible}
              togglePasswordVisibility={toggleConfirmPasswordVisibility}
            />
        </div>
        {errors.confirmPassword && <Error message={errors.confirmPassword} />}
      </CardContent>


      <CardFooter>
        <Button onClick={handleSignup}>
          {loading ? <BeatLoader size={10} color="#020817" /> : "Tạo tài khoản"}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default Signup;
