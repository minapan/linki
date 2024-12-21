import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Landing() {
  const [longUrl, setLongUrl] = useState("")
  const navigate = useNavigate()
  const handleShorten = (e) => {
    e.preventDefault();
    if (longUrl) navigate(`/auth?createNew=${longUrl}`)
  }
  return (<>
    <div className="flex items-center flex-col">
      <h2 className="my-10 text-center text-white text-3xl font-extrabold lg:text-5xl sm:my-16 sm:text-6xl">Đừng để URL làm chậm bước tiến của bạn, hãy để chúng tôi tối ưu hóa đường đi cho bạn 👇</h2>
      <form className="flex flex-col sm:flex-row w-full gap-2 sm:h-14 md:w-2/4"
        onSubmit={handleShorten}>
        <Input type="url" placeholder="Nhập liên kết cần rút gọn..."
          onChange={(e) => setLongUrl(e.target.value)}
          value={longUrl}
          className="flex-1 h-full py-4 px-4"
        />
        <Button type="submit" variant="destructive" className="h-full">Rút gọn</Button>
      </form>
      <img src="./banner.png" alt="Banner" className="w-full my-10 md:px-10" />
    </div>
    <Accordion type="multiple" collapsible className="w-full md:px-10">
      <AccordionItem value="item-1">
        <AccordionTrigger>Làm thế nào để rút gọn URL?</AccordionTrigger>
        <AccordionContent>
          - Dán liên kết dài vào hộp nhập URL. <br />
          - Nhấn nút <strong>Rút gọn</strong> và nhận đường dẫn ngắn chỉ trong tích tắc. <br />
          - Sao chép URL ngắn và chia sẻ với bạn bè hoặc trên các nền tảng mạng xã hội.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Tại sao chọn chúng tôi?</AccordionTrigger>
        <AccordionContent>
          - <strong>Nhanh chóng:</strong> URL rút gọn trong chưa đầy 1 giây. <br />
          - <strong>Bảo mật:</strong> Dữ liệu của bạn được mã hóa và bảo vệ. <br />
          - <strong>Tùy chỉnh:</strong> Tạo URL ngắn với tên bạn muốn. <br />
          - <strong>Thống kê:</strong> Theo dõi lượt click và phân tích hiệu quả.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Tôi có thể rút gọn bao nhiêu URL?</AccordionTrigger>
        <AccordionContent>
          - Bạn có thể rút gọn không giới hạn số lượng URL mỗi ngày. <br />
          - Chúng tôi hỗ trợ tất cả các loại URL, từ trang web cá nhân đến liên kết doanh nghiệp.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </>);
}

export default Landing;