import DeviceStats from "@/components/device-stats";
import Location from "@/components/location-stats";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UrlState } from "@/context";
import { getClicksForUrl } from "@/db/apiClicks";
import { deleteUrl, getUrl } from "@/db/apiUrls";
import useFetch from "@/hooks/use-fetch";
import { Trash } from "lucide-react";
import { Download } from "lucide-react";
import { Copy } from "lucide-react";
import { LinkIcon } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { BarLoader, BeatLoader } from "react-spinners";

function Link() {
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
  const navigate = useNavigate()
  const { user } = UrlState()
  const { id } = useParams()
  const { loading, data: url, fn, error } = useFetch(getUrl, { id, user_id: user?.id })
  const { loading: loadingStats, data: stats, fn: fnStats } = useFetch(getClicksForUrl, id)
  const { loading: loadingDelete, fn: fnDelete } = useFetch(deleteUrl, id)

  useEffect(() => {
    fn();
  }, []);

  useEffect(() => {
    if (!error && loading === false) fnStats();
  }, [loading, error]);

  if (!loading && !url) navigate("/error/404")

  let link = ""
  if (url) {
    link = url?.custom_url ? url?.custom_url : url.short_url
  }

  return (<>
    {(loading || loadingStats) && (<BarLoader width={"100%"} color={"#36d7b7"} />)}
    <div className="flex flex-col gap-6 sm:flex-row justify-between max-w-full">
      {!loading && <div className="flex flex-col items-start gap-4 rounded-lg sm:w-2/5">
        <span className="text-5xl font-extrabold">{url?.title}</span>
        <a href={`http://localhost:5173/${link}`} target="_blank"
          className="text-2xl sm:text-3xl text-blue-400 font-bold hover:underline cursor-pointer break-all">
          {`http://localhost:5173/${link}`}
        </a>
        <a
          href={url?.original_url}
          target="_blank"
          className="flex items-center gap-1 hover:underline cursor-pointer break-all"
        >
          <LinkIcon className="p-1" />
          <span className="line-clamp-3" title={url?.original_url}>
            {url?.original_url}
          </span>
        </a>
        <p className="flex items-center gap-2 truncate w-full">
          Mật khẩu:
          <span className="font-bold text-base truncate" title={url?.password}>{url?.password || "Không có"}</span>
          {url?.password && (<Button
            className="p-4"
            variant="ghost"
            onClick={() =>
              navigator.clipboard.writeText(url?.password)
            }
          >
            <Copy />
          </Button>)}
        </p>
        <span className="font-light text-base"> {new Date(url?.created_at).toLocaleString()}</span>
        <span className="flex items-end font-extralight text-sm"> </span>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            onClick={() =>
              navigator.clipboard.writeText(`http://localhost:5173/${url?.short_url}`)
            }
          >
            <Copy />
          </Button>
          <Button variant="ghost" onClick={downloadImage}>
            <Download />
          </Button>
          <Button
            variant="ghost"
            onClick={() => fnDelete().then(() => navigate("/dashboard"))}
            disable={loadingDelete}
          >
            {loadingDelete ? <BeatLoader size={5} color="white" /> : <Trash />}
          </Button>
        </div>
        <img
          src={url?.qr}
          className="w-full self-center sm:self-start ring ring-blue-500 p-1 object-contain"
          alt="qr code"
        />
      </div>}
      <Card className="sm:w-3/5">
        <CardHeader>
          <CardTitle className="text-4xl font-extrabold">Số liệu thống kê</CardTitle>
        </CardHeader>
        {stats && stats.length ? (
          <CardContent className="flex flex-col gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Số lượt clicks</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{stats?.length}</p>
              </CardContent>
            </Card>

            <CardTitle>Vị trí</CardTitle>
            <Location stats={stats} />
            <CardTitle>Thiết bị</CardTitle>
            <DeviceStats stats={stats} />
          </CardContent>
        ) : (
          <CardContent>
            {loadingStats === false
              ? "Không có dữ liệu"
              : "Đang tải dữ liệu.."}
          </CardContent>
        )}
      </Card>
    </div>
  </>);
}

export default Link;