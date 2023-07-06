import { formatCurrency } from "../../utils/helpers";

interface ICartItem {
  item: any;
}

function CartItem({ item }: ICartItem) {
  const { pizzaId, name, quantity, totalPrice } = item;

  return (
    <li>
      <p>
        {quantity}&times; {name}
      </p>
      <div>
        <p>{formatCurrency(totalPrice)}</p>
      </div>
    </li>
  );
}

export default CartItem;
