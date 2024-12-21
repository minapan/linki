import Header from "@/components/Header";
import { Outlet } from "react-router-dom";

function AppLayout() {
  return (<>
  <main className="min-h-screen container mx-auto px-8">
      <Header/>
      <Outlet/>
  </main>

  <div className="p-10 text-center bg-gray-800 mt-10">
    Made with 💖 by <a target="_blank" href="https://facebook.com/MinhNhat2815">MinhNhatPhan</a>
  </div>
  </>);
}

export default AppLayout;