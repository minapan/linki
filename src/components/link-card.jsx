/* eslint-disable react/prop-types */
import { Copy, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import useFetch from "@/hooks/use-fetch";
import { deleteUrl } from "@/db/apiUrls";
import DeleteLink from "./delete-link";
import { useToast } from "@/hooks/use-toast";

const LinkCard = ({ url = [], fetchUrls }) => {
  const { toast } = useToast()
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
    <div className="flex flex-col md:flex-row gap-5 border p-4 bg-gray-900 rounded-lg break-all max-w-full overflow-x-hidden">
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
          http://localhost:5173/{url?.custom_url ? url?.custom_url : url.short_url}
        </span>
        <span className="hover:underline cursor-pointer line-clamp-2">
          {url?.original_url}
        </span>

        <span className="flex items-end font-extralight text-sm flex-1">
          {new Date(url?.created_at).toLocaleString()}
        </span>
      </Link>
      <div className="flex gap-2">
        <Button
          variant="ghost"
          onClick={() => {
            navigator.clipboard.writeText(`http://localhost:5173/${url?.custom_url ? url?.custom_url : url.short_url}`)
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
        <DeleteLink fnDelete={fnDelete} onSuccess={fetchUrls} loadingDelete={loadingDelete} />
      </div>
    </div>

  );
};

export default LinkCard;