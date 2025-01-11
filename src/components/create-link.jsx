import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { UrlState } from "@/context";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Error from "./ui/error";
import useFetch from "@/hooks/use-fetch";
import { createUrl } from "@/db/apiUrls";
import { Card } from "./ui/card";
import * as Yup from "yup";
import { useRef } from "react";
import { QRCode } from "react-qrcode-logo";
import { BeatLoader } from "react-spinners";
import { useEffect } from "react";

function CreateLink() {
  const { user } = UrlState();
  const navigate = useNavigate();
  const ref = useRef()
  let [searchParams, setSearchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    title: "",
    longUrl: longLink ? longLink : "",
    customUrl: "",
  });
  const { data, loading, error, fn: fnCreate } = useFetch(createUrl, { ...formData, user_id: user.id });

  const schema = Yup.object().shape({
    title: Yup.string()
      .required("Email là bắt buộc"),
    longUrl: Yup.string()
      .required("Url là bắt buộc")
      .url("Url không hợp lệ"),
    customUrl: Yup.string()
  });

  useEffect(() => {
    if (error === null && data) {
      navigate(`/link/${data[0].id}`)
    }
  }, [error, data])
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  };

  const createNewLink = async () => {
    setErrors({});
    try {
      await schema.validate(formData, { abortEarly: false });
      const canvas = ref.current.canvasRef.current;
      const blob = await new Promise((resolve) => canvas.toBlob(resolve));
      await fnCreate(blob);
    } catch (e) {
      const newErrors = {};
      e?.inner?.forEach((err) => {
        newErrors[err.path] = err.message;
      });
      setErrors(newErrors);
    }
  };

  return (
    <Dialog defaultOpen={longLink} onOpenChange={(res) => {
      if (!res) {
        setSearchParams({});
      }
    }}>
      <DialogTrigger><Button>Tạo liên kết</Button></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-bold text-2xl">Rút gọn liên kết mới</DialogTitle>
        </DialogHeader>

        <Input id="title" placeholder="Nhập tiêu đề" value={formData.title} onChange={handleChange} />
        {errors.title && <Error message={errors.title} />}
        <Input id="longUrl" placeholder="Nhập liên kết cần rút gọn" value={formData.longUrl} onChange={handleChange} />
        {errors.longUrl && <Error message={errors.longUrl} />}
        <div className="flex items-center gap-2">
          <Card className="p-2">localhost:5173</Card>/
          <Input id="customUrl" placeholder="Tùy chỉnh..." value={formData.customUrl} onChange={handleChange} />
        </div>
        {error && <Error message={error.message} />}
        <DialogFooter className="flex sm:justify-between sm:items-top">
          {formData?.longUrl && <QRCode value={formData?.longUrl} size={200} ref={ref} />}
          <div className="flex justify-end w-full">
            <Button disabled={loading} onClick={createNewLink} className="mb-4" type="submit">
              {loading ? <BeatLoader size={10} color="#020817" /> : "Tạo"}
            </Button>
          </div>
        </DialogFooter>

      </DialogContent>
    </Dialog>
  );
}

export default CreateLink;