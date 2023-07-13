import { Params, useFetcher } from "react-router-dom";
import { Order } from "../../types/Order";
import { Button } from "../../ui/Button";
import { updateOrder } from "../../services/apiRestaurant";

interface IUpdateOrderProps {
  order: Order;
}

export const UpdateOrder = ({ order }: IUpdateOrderProps) => {
  const fetcher = useFetcher();

  return (
    <fetcher.Form method="PATCH" className="text-right">
      <Button>Make Priority</Button>
    </fetcher.Form>
  );
};

export async function action({
  request,
  params,
}: {
  request: Request;
  params: Params;
}) {
  const data = { priority: true };

  if (!params || !params.id) return null;

  await updateOrder(params.id, data);
  return null;
}
