import { Link } from "react-router-dom";
import { SearchOrder } from "../features/order/SearchOrder";
import { Username } from "../features/user/Username";

export const Header = () => {
  return (
    <header className="bg-yellow-500 sm:px-6 uppercase px-4 py-3 border-b border-stone-200 flex justify-between items-center">
      <Link to="/" className="tracking-widest">
        Foody
      </Link>
      <SearchOrder />
      <Username />
    </header>
  );
};
