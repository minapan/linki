import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { storeClicks } from "@/db/apiClicks";
import { getLongUrl } from "@/db/apiUrls";
import useFetch from "@/hooks/use-fetch";
import { useEffect } from "react";
import { QRCode } from "react-qrcode-logo";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { BarLoader } from "react-spinners";

const RedirectLink = () => {
  const navigate = useNavigate()
  const { id } = useParams();
  const { loading, data, fn } = useFetch(getLongUrl, id);

  const { loading: loadingStats, fn: fnStats } = useFetch(storeClicks, {
    id: data?.id,
  });

  useEffect(() => {
    fn();
  }, []);

  useEffect(() => {
    if (!loading && data) {
      fnStats();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  if (!loading && !data) navigate("/error/404")

  return (
    (!loading && !loadingStats) ? (
      <div className="flex text-center items-center justify-center ">
        <div className="p-8 rounded-lg shadow-lg max-w-lg w-full">
          <h1 className="text-4xl font-bold mb-2 capitalize">{data?.title}</h1>
          <p className="my-4 text-gray-400">
            Liên kết được rút gọn bởi: <span className="font-semibold text-blue-600">linki.nhatphan.id.vn</span>
          </p>
          <div className="flex flex-col items-center space-y-4">
            <Button
              onClick={() => window.location.href = data?.original_url}
              className="w-full px-6 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition duration-300"
            >
              Mở liên kết ngay!
            </Button>
            <Dialog className>
              <DialogTrigger asChild>
                <Button
                  className="w-full px-6 py-3"
                >
                  Lấy mã QR
                </Button>
              </DialogTrigger>

              {/* Modal */}
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="font-bold text-2xl">Linki QR Code</DialogTitle>
                </DialogHeader>

                <div className="flex justify-center">
                  <QRCode value={data?.original_url} size={256} />
                </div>

                <DialogFooter>
                  <p className="text-center w-full font-extrabold text-gray-400 mt-4">Quét mã QR để truy cập liên kết!</p>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Button
              onClick={() => navigate(`/`)}
              className="w-full px-6 py-3 "
            >
              Rút gọn liên kết mới
            </Button>
          </div>
        </div>
      </div>
    ) : (
      <div>
        <BarLoader width={"100%"} color="#36d7b7" />
        <br />
        Chờ tí... Đang tải dữ liệu...
      </div>
    )
  );
};

export default RedirectLink;