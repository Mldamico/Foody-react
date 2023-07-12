import { useAppDispatch } from "../../store";
import { Button } from "../../ui/Button";
import { removeItem } from "./cartSlice";

interface IDeleteItemProps {
  pizzaId: number;
}

export const DeleteItem = ({ pizzaId }: IDeleteItemProps) => {
  const dispatch = useAppDispatch();
  return (
    <Button type="small" onClick={() => dispatch(removeItem(pizzaId))}>
      Delete
    </Button>
  );
};
