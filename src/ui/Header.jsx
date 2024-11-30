import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import UserName from "../features/user/UserName";

function Header() {
  return (
    <header className="flex flex-col">
      <div className="px-2 flex items-center justify-between text-stone-200 bg-stone-800">
       
      </div>
      <div className="flex items-center justify-between bg-yellow-400 uppercase px-4 sm:px-6 py-3 border-b border-stone-300">
        <Link
          to="/"
          className="tracking-widest text-sm sm:text-base md:sm:text-lg"
        >
          Fast React Pizza Co.
        </Link>
        <SearchOrder />
        <UserName />
      </div>
    </header>
  );
}

export default Header;
