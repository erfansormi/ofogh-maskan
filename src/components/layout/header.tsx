import { Link } from "react-router-dom";
import Button from "../ui/button";
import { LogIn, Plus } from "lucide-react";
import { useUserContext } from "../../context/user-context";
import BrandTitle from "../common/brand-title";

const Header = () => {
  const { user } = useUserContext();

  return (
    <header className="h-14 flex items-center px-6 shadow backdrop-blur-[6px] bg-slate-100/50 dark:bg-slate-900 w-full z-50 top-0 inset-x-0 sticky">
      <nav className="flex size-full items-center justify-between container">
        <div className="">
          <h2 className="text-3xl">
            <Link to={"/"} className="text-blue-600">
              <BrandTitle />
            </Link>
          </h2>
        </div>
        <div className="text-sm">
          {!user ? (
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
        </div>
      </nav>
    </header>
  );
};

export default Header;
