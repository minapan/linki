import Header from "@/components/Header";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { matchPath } from 'react-router-dom';
import { Outlet } from "react-router-dom";

function AppLayout() {
  const location = useLocation();

  useEffect(() => {
    const routeTitles = {
      '/': "Trang chủ Linki - Rút gọn liên kết",
      '/dashboard': "Dashboard - Quản lý liên kết rút gọn của bạn trên Linki",
      '/auth': "Đăng nhập vào Linki - Quản lý liên kết rút gọn của bạn",
      '/link/:id': "Chi tiết liên kết - Xem thống kê và thông tin liên kết trên Linki",
      '/:id': "Chuyển hướng liên kết - Linki",
      '/error/404': "404 - Trang không tìm thấy | Linki",
      '*': "404 - Trang không tìm thấy | Linki",
    };

    const routeDescriptions = {
      '/': "Linki giúp bạn rút gọn liên kết nhanh chóng và miễn phí. Chia sẻ dễ dàng, theo dõi hiệu quả.",
      '/dashboard': "Trang Dashboard của Linki cho phép bạn quản lý các liên kết rút gọn của mình và theo dõi lượt truy cập.",
      '/auth': "Đăng nhập vào Linki để bắt đầu quản lý các liên kết rút gọn và xem các thông tin chi tiết.",
      '/link/:id': "Xem chi tiết thông tin và thống kê liên kết rút gọn của bạn trên Linki.",
      '/:id': "Chuyển hướng liên kết của bạn đến đích mong muốn với Linki.",
      '/error/404': "Trang không tìm thấy. Có thể đường dẫn bạn tìm kiếm không chính xác.",
      '*': "Trang không tìm thấy. Vui lòng kiểm tra lại URL.",
    };

    let matchedRouteTitle = routeTitles['*'];
    let matchedRouteDescription = routeDescriptions['*'];

    if (routeTitles[location.pathname]) {
      matchedRouteTitle = routeTitles[location.pathname];
      matchedRouteDescription = routeDescriptions[location.pathname];
    }
    else if (matchPath('/link/:id', location.pathname)) {
      matchedRouteTitle = routeTitles['/link/:id'];
      matchedRouteDescription = routeDescriptions['/link/:id'];
    }
    else if (matchPath('/:id', location.pathname)) {
      matchedRouteTitle = routeTitles['/:id'];
      matchedRouteDescription = routeDescriptions['/:id'];
    }

    document.title = matchedRouteTitle;

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', matchedRouteDescription);
    } else {
      const newMetaDescription = document.createElement('meta');
      newMetaDescription.name = "description";
      newMetaDescription.content = matchedRouteDescription;
      document.head.appendChild(newMetaDescription);
    }
  }, [location]);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <main className="min-h-screen container mx-auto px-8">
        <Header />
        <Outlet />
        <Toaster />
      </main>

      <div className="p-10 text-white text-center bg-gray-800 mt-10">
        Made with 💖 by <a target="_blank" href="https://facebook.com/MinhNhat2815">MinhNhatPhan</a>
      </div>
    </ThemeProvider>);
}

export default AppLayout;