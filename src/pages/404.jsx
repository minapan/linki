import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="text-center p-6 rounded-lg max-w-lg w-full">
        <h1 className="text-5xl p-0 font-bold text-sky-600">Oh no!</h1>
        <img
          src="/404.svg"
          alt="404"
          className="min-h-10"
        />
        <p className="text-2xl mt-4">Rất tiếc! URL bạn tìm không tồn tại.</p>
        <p className="text-xl mt-2">
          Có thể bạn đã nhập sai URL hoặc nó đã bị xóa.
        </p>
        <Link to="/">
          <Button className="mt-4">
            Quay lại trang chủ
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
