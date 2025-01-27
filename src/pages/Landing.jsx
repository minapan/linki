import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowBigRightDash } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Landing() {
  const [longUrl, setLongUrl] = useState("");
  const navigate = useNavigate();

  const handleShorten = (e) => {
    e.preventDefault();
    if (longUrl) navigate(`/auth?createNew=${longUrl}`);
  };

  return (
    <div className="py-8">
      <div className="flex items-center flex-col">
        <h2 className="text-center text-3xl font-extrabold lg:text-5xl sm:text-6xl bg-gradient-to-r from-sky-400 via-violet-500 to-indigo-600 bg-clip-text text-transparent pb-8 md:pb-12">
          Đừng để URL làm chậm bước tiến của bạn, hãy để chúng tôi tối ưu hóa đường đi cho bạn <span className="text-yellow-50">👇</span>
        </h2>

        <form
          className="flex flex-col sm:flex-row w-full gap-2 sm:h-14 md:w-2/4"
          onSubmit={handleShorten}
        >
          <Input
            type="url"
            placeholder="Nhập liên kết cần rút gọn..."
            onChange={(e) => setLongUrl(e.target.value)}
            value={longUrl}
            className="flex-1 h-full py-4 px-4 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          />
          <Button
            type="submit"
            className="h-full px-6 py-3 bg-blue-500 text-white rounded-md transition-all duration-300 hover:bg-blue-700"
          >
            Rút gọn
          </Button>
        </form>
      </div>

      <section className="flex items-center justify-between text-justify gap-12 rounded-lg py-6 md:px-10">
        <div>
          <h3 className="text-2xl font-extrabold text-center mb-6">
            Tại sao bạn cần URL rút gọn?
          </h3>
          <p className="text-lg mb-4">
            Chắc hẳn bạn đã gặp phải tình huống cần chia sẻ một liên kết dài và khó nhớ. Để tối ưu hóa trải nghiệm của người dùng và nâng cao tính chuyên nghiệp cho công việc của bạn, việc sử dụng URL ngắn gọn là một giải pháp cực kỳ hữu ích. Nó giúp:
          </p>
          <ul className="space-y-2">
            <li><ArrowBigRightDash className="inline text-violet-600" /> Tiết kiệm không gian khi chia sẻ trên các nền tảng như Twitter hay Facebook.</li>
            <li><ArrowBigRightDash className="inline text-violet-600" /> Giúp người nhận dễ dàng nhớ và truy cập liên kết nhanh chóng.</li>
            <li><ArrowBigRightDash className="inline text-violet-600" /> Cải thiện tỷ lệ nhấp chuột (CTR) vì URL ngắn gọn trông hấp dẫn hơn.</li>
            <li><ArrowBigRightDash className="inline text-violet-600" /> Hỗ trợ tối ưu cho các chiến dịch marketing trực tuyến.</li>
          </ul>
        </div>
        <img className="hidden md:block w-1/3" src="/url.svg" alt="url" />
      </section>

      <section className="py-8 rounded-lg md:px-12">
        <h3 className="text-4xl font-extrabold text-center mb-8 text-transparent bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-700 bg-clip-text pb-4 dark:text-transparent dark:bg-gradient-to-r dark:from-indigo-500 dark:via-purple-600 dark:to-blue-400">
          Lợi ích khi sử dụng dịch vụ rút gọn URL của chúng tôi
        </h3>

        <div className="flex flex-wrap justify-center gap-4">
          <div className="w-full sm:w-2/5 p-8 bg-white dark:bg-gray-800 rounded-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 transform flex items-center justify-center gap-6">
            <img src="/fast.svg" alt="Nhanh chóng" className="w-1/3" />
            <div className="mb-6 text-balance">
              <h4 className="text-2xl font-semibold mb-4 text-indigo-600 dark:text-violet-300">
                Nhanh chóng và dễ dàng
              </h4>
              <p className="text-gray-700 dark:text-gray-300">
                Chỉ cần dán liên kết, nhấn nút và nhận URL ngắn gọn trong vòng 1 giây. Tiết kiệm thời gian tối đa cho bạn.
              </p>
            </div>
          </div>

          <div className="w-full sm:w-2/5 p-8 bg-white dark:bg-gray-800 rounded-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 transform flex items-center justify-center gap-6">
            <img src="/config.svg" alt="Tùy chỉnh" className="w-1/3" />
            <div className="mb-6 text-balance">
              <h4 className="text-2xl font-semibold mb-4 text-indigo-600 dark:text-violet-300">
                Tùy chỉnh URL
              </h4>
              <p className="text-gray-700 dark:text-gray-300">
                Tạo URL ngắn gọn với tên riêng biệt, dễ nhớ. Hoàn toàn miễn phí và không giới hạn.
              </p>
            </div>
          </div>

          <div className="w-full sm:w-2/5 p-8 bg-white dark:bg-gray-800 rounded-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 transform flex items-center justify-center gap-6">
            <img src="/analytics.svg" alt="Thống kê" className="w-1/3" />
            <div className="mb-6 text-balance">
              <h4 className="text-2xl font-semibold mb-4 text-indigo-600 dark:text-violet-300">
                Thống kê chi tiết
              </h4>
              <p className="text-gray-700 dark:text-gray-300">
                Theo dõi lượt click, địa điểm và thiết bị truy cập để tối ưu hóa chiến dịch marketing của bạn.
              </p>
            </div>
          </div>
        </div>
      </section>

      <h4 className="text-3xl font-extrabold text-center mb-6 text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-600 bg-clip-text p-2">Câu hỏi thường gặp</h4>
      <Accordion
        type="multiple"
        collapsible
        className="w-full md:px-10 bg-gradient-to-r from-blue-400 via-violet-500 to-purple-600 rounded-lg shadow-lg p-6"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-white font-bold">Làm thế nào để rút gọn URL?</AccordionTrigger>
          <AccordionContent className="text-white">
            - Dán liên kết dài vào hộp nhập URL. <br />
            - Nhấn nút <strong>Rút gọn</strong> và nhận đường dẫn ngắn chỉ trong tích tắc. <br />
            - Sao chép URL ngắn và chia sẻ với bạn bè hoặc trên các nền tảng mạng xã hội.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger className="text-white font-bold">Tại sao chọn chúng tôi?</AccordionTrigger>
          <AccordionContent className="text-white">
            - <strong>Nhanh chóng:</strong> URL rút gọn trong chưa đầy 1 giây. <br />
            - <strong>Tùy chỉnh:</strong> Tạo URL ngắn với tên bạn muốn. <br />
            - <strong>Thống kê:</strong> Theo dõi lượt click và phân tích hiệu quả chiến dịch của bạn.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger className="text-white font-bold">Tôi có thể rút gọn bao nhiêu URL?</AccordionTrigger>
          <AccordionContent className="text-white">
            - Bạn có thể rút gọn không giới hạn số lượng URL mỗi ngày. <br />
            - Chúng tôi hỗ trợ tất cả các loại URL, từ trang web cá nhân đến liên kết doanh nghiệp.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4">
          <AccordionTrigger className="text-white font-bold">Các tính năng bổ sung khác</AccordionTrigger>
          <AccordionContent className="text-white">
            - <strong>Chia sẻ và phân tích:</strong> Bạn có thể theo dõi các liên kết đã rút gọn và phân tích hiệu quả chia sẻ. <br />
            - <strong>Tạo mã QR:</strong> Tự động tạo mã QR cho mỗi liên kết đã rút gọn để dễ dàng chia sẻ offline.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default Landing;