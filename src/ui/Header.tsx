import { Link } from "react-router-dom";
import { SearchOrder } from "../features/order/SearchOrder";

export const Header = () => {
  return (
    <header className="bg-yellow-500">
      <Link to="/">Foody</Link>
      <SearchOrder />
    </header>
  );
};
