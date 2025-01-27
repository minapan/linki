/* eslint-disable react/prop-types */
import { Copy, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import useFetch from "@/hooks/use-fetch";
import { deleteUrl } from "@/db/apiUrls";
import DeleteLink from "./delete-link";
import { useToast } from "@/hooks/use-toast";
import EditLink from "./edit-link";
import { UrlState } from "@/context";

const LinkCard = ({ url = [], fetchUrls, viewType }) => {
  const { toast } = useToast();
  const { user } = UrlState();

  const downloadImage = () => {
    const imageUrl = url?.qr;
    const fileName = url?.title;

    const anchor = document.createElement("a");
    anchor.href = imageUrl;
    anchor.download = fileName;

    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  const { loading: loadingDelete, fn: fnDelete } = useFetch(deleteUrl, url.id);

  return (
    <div className={`flex flex-col ${viewType === "basic" ? "md:flex-row" : "space-y-4"} gap-5 border p-6 break-all max-w-full overflow-x-hidden`}>
      {viewType === "detail" && (
        <div className="flex flex-col md:flex-row gap-5 rounded-lg break-all max-w-full overflow-x-hidden">
          <img
            src={url?.qr}
            className="h-32 object-contain ring ring-blue-500 self-start"
            alt="qr code"
          />
          <Link to={`/link/${url?.id}`} className="flex flex-col flex-1 overflow-hidden">
            <span className="text-2xl font-extrabold hover:underline cursor-pointer line-clamp-2">
              {url?.title}
            </span>
            <span className="text-xl text-blue-400 font-bold hover:underline cursor-pointer line-clamp-2">
              https://linki.nhatphan.id.vn/{url?.custom_url ? url?.custom_url : url.short_url}
            </span>
            <span className="hover:underline cursor-pointer truncate">
              {url?.original_url}
            </span>
            <p className="flex items-center gap-2 w-full">
              Mật khẩu:
              <span className="font-bold" title={url?.password}>{url?.password || "(Không có)"}</span>
            </p>
            <span className="flex items-end font-extralight text-sm flex-1">
              {new Date(url?.created_at).toLocaleString()}
            </span>
          </Link>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              onClick={() => {
                navigator.clipboard.writeText(`https://linki.nhatphan.id.vn/${url?.custom_url ? url?.custom_url : url.short_url}`)
                toast({
                  description: "Đã chép liên kết"
                })
              }
              }
            >
              <Copy />
            </Button>
            <Button variant="ghost" onClick={downloadImage}>
              <Download />
            </Button>
            <EditLink url={url} user={user}
              onSuccess={() => {
                fetchUrls()
                toast({
                  description: "Đã cập nhật liên kết"
                })
              }} />
            <DeleteLink fnDelete={fnDelete}
              onSuccess={
                () => {
                  fetchUrls()
                  toast({
                    description: "Đã xóa liên kết"
                  })
                }}
              loadingDelete={loadingDelete} />
          </div>
        </div>
      )}

      {viewType === "basic" && (
        <div className="w-full flex items-center justify-between">
          <Link
            to={`/link/${url?.id}`}
            className="flex items-center justify-between hover:underline w-10/12"
          >
            <div className="flex flex-col text-x font-bold hover:underline cursor-pointer gap-1">
              <span className="text-2xl font-bold line-clamp-2">{url?.title}</span>
              <span className="line-clamp-2 text-blue-400">https://linki.nhatphan.id.vn/{url?.custom_url ? url?.custom_url : url.short_url}</span>
            </div>
          </Link>
          <span className="text-sm text-gray-400 ml-4 break-keep">
            {new Date(url?.created_at).toLocaleDateString()}
          </span>
        </div>
      )}
    </div>
  );
};

export default LinkCard;
