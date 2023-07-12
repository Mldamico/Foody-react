import { useAppDispatch } from "../../store";
import { Button } from "../../ui/Button";
import { decreaseItemQuantity, increaseItemQuantity } from "./cartSlice";

interface IUpdateItemQuantityProps {
  pizzaId: number;
  currentQuantity: number;
}

export const UpdateItemQuantity = ({
  pizzaId,
  currentQuantity,
}: IUpdateItemQuantityProps) => {
  const dispatch = useAppDispatch();
  return (
    <div className="flex items-center gap-2 md:gap-3">
      <Button
        type="round"
        onClick={() => dispatch(decreaseItemQuantity(pizzaId))}
      >
        -
      </Button>
      <span className="text-sm font-medium">{currentQuantity}</span>
      <Button
        type="round"
        onClick={() => dispatch(increaseItemQuantity(pizzaId))}
      >
        +
      </Button>
    </div>
  );
};
