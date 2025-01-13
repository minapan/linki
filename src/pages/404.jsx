import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  const [longUrl, setLongUrl] = useState("")
  const navigate = useNavigate()
  const handleShorten = (e) => {
    e.preventDefault();
    if (longUrl) navigate(`/auth?createNew=${longUrl}`)
  }
  return (
    <div className="flex items-center justify-center">
      <div className="text-center p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h1 className="text-8xl font-bold text-red-500">404</h1>
        <p className="text-2xl text-gray-600 mt-4">Rất tiếc! URL bạn tìm không tồn tại.</p>
        <p className="text-gray-500 text-xl mt-2">
          Có thể bạn đã nhập sai URL hoặc nó đã bị xóa.
        </p>
        <Link to="/">
          <Button variant="primary" className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-700">
            Quay lại trang chủ
          </Button>
        </Link>
        <p className='text-gray-500 text-xl mt-2'>Hoặc rút gọn liên kết mới ngay:</p>
        <div className="mt-6 flex justify-center gap-4">
          <form className="flex flex-col sm:flex-row w-full gap-2 sm:h-14 md:w-3/4"
            onSubmit={handleShorten}>
            <Input type="url" placeholder="Nhập liên kết cần rút gọn..."
              onChange={(e) => setLongUrl(e.target.value)}
              value={longUrl}
              className="flex-1 h-full py-4 px-4"
            />
            <Button type="submit" variant="destructive" className="h-full">Rút gọn</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
