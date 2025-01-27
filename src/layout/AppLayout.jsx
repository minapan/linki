import Header from "@/components/Header";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { Outlet } from "react-router-dom";

function AppLayout() {
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