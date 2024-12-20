import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LogOut } from "lucide-react";
import { LinkIcon } from "lucide-react";


function Header() {
  const navigate = useNavigate();
  const user = true;
  return (
    <nav className="flex items-center justify-between py-4">
      <Link to={"/"}>
        <img src="./Linki.svg" className="h-16" alt="Linki Logo" />
      </Link>

      <div>
        {
          !user ?
            <Button onClick={() => navigate("/auth")}>Đăng nhập</Button> :
            (
              <DropdownMenu>
                <DropdownMenuTrigger className="w-10 rounded-full overflow-hidden">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>Avt</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>MinhNhat</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                  <LinkIcon className="mr-2 h-4 w-4"/>
                    Danh sách liên kết</DropdownMenuItem>
                  <DropdownMenuItem className="text-red-400">
                    <LogOut className="mr-2 h-4 w-4"/>
                    Đăng xuất</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )
        }
      </div>
    </nav>
  );
}

export default Header;