/* eslint-disable react/prop-types */
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Error from "./ui/error";
import useFetch from "@/hooks/use-fetch";
import { updateUrl } from "@/db/apiUrls";
import * as Yup from "yup";
import { BeatLoader } from "react-spinners";
import { Pencil } from "lucide-react";
import { Card } from "./ui/card";

function EditLink({ url, user, onSuccess }) {
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    title: url?.title || "",
    password: url?.password || "",
    custom_url: url?.custom_url || "",
  });

  const { data, loading, error, fn } = useFetch(updateUrl, { ...formData, user_id: user?.id, id: url?.id });

  const schema = Yup.object().shape({
    title: Yup.string().required("Tiêu đề là bắt buộc"),
    password: Yup.string(),
    custom_url: Yup.string(),
  });

  useEffect(() => {
    if (url) {
      setFormData({
        title: url.title || "",
        password: url.password || "",
        custom_url: url.custom_url || "",
      });
    }
  }, [url]);

  useEffect(() => {
    if (!loading && data && data.length > 0) {
      if (onSuccess) {
        onSuccess();
        setOpen(false);
      }
    }
  }, [loading, data]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleReset = () => {
    setFormData({
      title: url?.title || "",
      password: url?.password || "",
      custom_url: url?.custom_url || "",
    });
    setErrors({});
  };

  const handleSave = async () => {
    setErrors({});
    try {
      await schema.validate(formData, { abortEarly: false });
      await fn();

    } catch (e) {
      if (e?.inner) {
        const newErrors = {};
        e.inner.forEach((err) => {
          newErrors[err.path] = err.message;
        });
        setErrors(newErrors);
      } else {
        setErrors({ global: e.message });
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost">
          <Pencil />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-bold text-2xl">
            Chỉnh sửa liên kết
          </DialogTitle>
        </DialogHeader>

        <div>
          <div>
            <label htmlFor="longUrl" className="block text-sm font-medium mb-2">
              URL gốc
            </label>
            <Input
              id="longUrl"
              value={url?.original_url || ""}
              disabled
            />
          </div>

          <label htmlFor="title" className="block text-sm font-medium mb-2">
            Tiêu đề <span className="text-red-500">*</span>
          </label>
          <Input
            id="title"
            placeholder="Nhập tiêu đề"
            value={formData.title}
            onChange={handleChange}
          />
          {errors.title && <Error message={errors.title} />}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-2">
            Mật khẩu (Tùy chọn)
          </label>
          <Input
            id="password"
            maxLength={20}
            placeholder="Mật khẩu để mở khóa"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        {errors.password && <Error message={errors.password} />}


        <div>
          <label htmlFor="custom_url" className="block text-sm font-medium mb-2">
            Tùy chỉnh URL
          </label>
          <div className="flex items-center gap-2">
            <Card className="p-2">linki.nhatphan.id.vn</Card>/
            <Input
              id="custom_url"
              placeholder="Id tùy chỉnh..."
              value={formData.custom_url}
              onChange={handleChange}
            />
          </div>
        </div>

        {error && <Error message={error.message} />}

        <DialogFooter className="flex sm:justify-between sm:items-top">
          <div className="flex justify-end w-full gap-4 mb-4">
            <Button disabled={loading} onClick={handleReset}>
              Đặt lại
            </Button>
            <Button
              disabled={loading}
              onClick={handleSave}
              className="bg-indigo-600 text-white hover:bg-indigo-500"
            >
              {loading ? (
                <BeatLoader size={10} color="#020817" />
              ) : (
                "Lưu thay đổi"
              )}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default EditLink;

