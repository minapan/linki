
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
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
      </div>
    </div>
  );
};

export default NotFoundPage;
