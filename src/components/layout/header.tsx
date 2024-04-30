import { Link } from "react-router-dom";
import Button from "../ui/button";
import { LogIn, Moon, Plus, Sun } from "lucide-react";
import { useUserContext } from "../../context/user-context";
import BrandTitle from "../common/brand-title";
import { useState } from "react";

const Header = () => {
  const { user } = useUserContext();
  const storegeTheme = localStorage.getItem("theme");
  const [theme, setTheme] = useState(storegeTheme);

  return (
    <header className="h-14 flex items-center px-6 shadow backdrop-blur-[6px] bg-slate-100/50 dark:bg-slate-800/50 w-full z-20 top-0 inset-x-0 sticky">
      <nav className="flex size-full items-center justify-between container">
        <div className="">
          <h2 className="text-3xl">
            <Link to={"/"} className="text-blue-600">
              <BrandTitle />
            </Link>
          </h2>
        </div>
        <div className="text-sm flex items-center gap-4">
          {!user ? (
            // LOGIN AND SIGNUP
            <Button
              variant={"outline"}
              className="flex items-center font-medium py-0 pl-0 *:text-slate-500 cursor-default"
            >
              <LogIn size={18} />
              <Link to={"/auth/signup"} className="py-2 px-2">
                <span>ثبت نام</span>
              </Link>
              <span className="w-px h-4 bg-slate-400 block" />
              <Link to={"/auth/login"} className="py-2 pr-2 pl-5">
                <span>ورود</span>
              </Link>
            </Button>
          ) : (
            // CREATE AD
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <span>سلام</span>
                <span className="font-semibold">{user.firstname}!</span>
              </div>

              <Link to={"/register-ad"}>
                <Button className="flex items-center gap-2" variant={"outline"}>
                  <span>
                    <Plus size={18} />
                  </span>
                  <span>ثبت آگهی</span>
                </Button>
              </Link>
            </div>
          )}

          {/* CHANGE THEME */}
          <span
            className="cursor-pointer"
            onClick={() => {
              if (!theme || theme === "light") {
                document.querySelector("html")?.classList.add("dark");
                setTheme("dark");
                localStorage.setItem("theme", "dark");
              } else {
                document.querySelector("html")?.classList.remove("dark");
                setTheme("light");
                localStorage.setItem("theme", "light");
              }
            }}
          >
            {!theme || theme === "light" ? <Sun /> : <Moon />}
          </span>
        </div>
      </nav>
    </header>
  );
};

export default Header;
