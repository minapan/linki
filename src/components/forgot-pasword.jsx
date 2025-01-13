import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { BeatLoader } from "react-spinners";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import * as Yup from "yup";
import useFetch from "@/hooks/use-fetch";
import { resetPassword } from "@/db/apiAuth";
import Error from "./ui/error";
import PasswordVisibilityToggle from "./password-toggle";

function ResetPasswordPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  const { data, loading, error, fn: fnResetPassword } = useFetch(resetPassword, formData);

  useEffect(() => {
    if (location.pathname.includes("reset-password")) {
      // Nếu đang ở trang reset-password, lấy email từ localStorage
      const savedEmail = localStorage.getItem("email");
      if (savedEmail) {
        setFormData((prevState) => ({
          ...prevState,
          email: savedEmail,
        }));
      }
    }

    if (error === null && data) {
      navigate(`/dashboard`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, error, location.pathname]);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible((prevState) => !prevState);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleResetPassword = async () => {
    setErrors({});
    try {
      // Create validation schema conditionally based on whether we're in "forgot-password" or "reset-password"
      const schema = Yup.object().shape({
        ...(location.pathname.includes("forgot-password") && {
          // Only validate email on the forgot-password page
          email: Yup.string().email("Email không đúng định dạng").required("Email là bắt buộc"),
        }),
        ...(location.pathname.includes("reset-password") && {
          // Only validate password and confirmPassword on the reset-password page
          password: Yup.string()
            .min(6, "Mật khẩu mới phải từ 6 ký tự")
            .required("Mật khẩu là bắt buộc"),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref("password"), null], "Mật khẩu xác nhận không khớp")
            .required("Vui lòng nhập lại mật khẩu"),
        }),
      });

      console.log("Form data trước khi validate:", formData);
      await schema.validate(formData, { abortEarly: false });
      console.log("Form data sau khi validate:", formData);

      // If we're on the reset-password page, submit both email and new password
      if (location.pathname.includes("reset-password")) {
        await fnResetPassword({
          email: formData.email,
          newPassword: formData.password,
        });
        localStorage.removeItem("email")
      } else {
        // If we're on the forgot-password page, just submit the email for a reset link
        await fnResetPassword({
          email: formData.email,
        });
        // Lưu email vào localStorage khi ở trang forgot-password
        localStorage.setItem("email", formData.email);
      }
    } catch (error) {
      const newErrors = {};
      error.inner.forEach((err) => {
        newErrors[err.path] = err.message;
      });
      setErrors(newErrors);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <Card>
        <CardHeader>
          <CardTitle>{location.pathname.includes("reset-password") ? "Cập nhật mật khẩu" : "Quên mật khẩu?"}</CardTitle>
          <CardDescription>
            {location.pathname.includes("reset-password") ? "Nhập mật khẩu mới của bạn để hoàn tất việc đặt lại mật khẩu." : "Nhập email của bạn để nhận liên kết đặt lại mật khẩu."}
          </CardDescription>
          {error && <Error message={error?.message} />}
        </CardHeader>

        <CardContent className="space-y-3">
          {location.pathname.includes("reset-password") ? (
            <>
              <div className="relative">
                <Input
                  type={isPasswordVisible ? "text" : "password"}
                  name="password"
                  placeholder="Mật khẩu mới"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                <PasswordVisibilityToggle
                  isPasswordVisible={isPasswordVisible}
                  togglePasswordVisibility={togglePasswordVisibility}
                />
              </div>
              {errors.password && <Error message={errors.password} />}

              <div className="relative">
                <Input
                  type={isConfirmPasswordVisible ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Nhập lại mật khẩu"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                />
                <PasswordVisibilityToggle
                  isPasswordVisible={isConfirmPasswordVisible}
                  togglePasswordVisibility={toggleConfirmPasswordVisibility}
                />
              </div>
              {errors.confirmPassword && <Error message={errors.confirmPassword} />}
            </>
          ) : (
            <div className="relative">
              <Input
                type="email"
                name="email"
                placeholder="Email của bạn"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
          )}
          {errors.email && <Error message={errors.email} />}
        </CardContent>

        <CardFooter>
          <Button onClick={handleResetPassword} disabled={loading}>
            {loading ? <BeatLoader size={10} color="#fff" /> : location.pathname.includes("reset-password") ? "Cập nhật mật khẩu" : "Gửi yêu cầu"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default ResetPasswordPage;
