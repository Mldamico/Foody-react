import { Link } from "react-router-dom";
import { useAppSelector } from "../../store";
import { getTotalCartPrice, getTotalCartQuantity } from "./cartSlice";
import { formatCurrency } from "../../utils/helpers";

function CartOverview() {
  const totalQuantity = useAppSelector(getTotalCartQuantity);
  const totalCartPrice = useAppSelector(getTotalCartPrice);

  if (!totalQuantity) return null;

  return (
    <div className="flex items-center justify-between px-4 py-4 text-sm uppercase bg-stone-800 text-stone-200 sm:px-6 md:text-base">
      <p className="space-x-4 font-semibold text-stone-300 sm:space-x-6">
        <span>{totalQuantity} pizzas</span>
        <span>{formatCurrency(totalCartPrice)}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
