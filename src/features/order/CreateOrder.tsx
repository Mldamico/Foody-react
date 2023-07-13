import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import { Button } from "../../ui/Button";
import { store, useAppDispatch, useAppSelector } from "../../store";
import EmptyCart from "../cart/EmptyCart";
import { fetchAddress } from "../user/userSlice";
const isValidPhone = (str: string) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

function CreateOrder() {
  const {
    username,
    status: addressStatus,
    position,
    address,
    error: errorAddress,
  } = useAppSelector((state) => state.user);
  const isLoadingAddress = addressStatus === "loading";
  // const [withPriority, setWithPriority] = useState(false);
  const { cart } = useAppSelector((state) => state.cart);
  const { state } = useNavigation();
  const isSubmitting = state === "submitting";
  const formError: any = useActionData();
  const dispatch = useAppDispatch();

  const getPosition = () => {
    dispatch(fetchAddress());
  };

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>

      {/* action="/order/new" */}
      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            type="text"
            name="customer"
            defaultValue={username}
            required
            className="input grow"
          />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input type="tel" name="phone" required className="input w-full" />
            {formError?.phone && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {formError.phone}
              </p>
            )}
          </div>
        </div>

        <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              type="text"
              name="address"
              disabled={isLoadingAddress}
              required
              className="input w-full"
              defaultValue={address}
            />
            {addressStatus === "error" && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {errorAddress}
              </p>
            )}
          </div>
          {!position.latitude && !position.longitude && (
            <span className="absolute right-1 top-[35px] z-10 sm:top-1">
              <Button
                type="small"
                onClick={getPosition}
                isLoading={isLoadingAddress}
              >
                Get position
              </Button>
            </span>
          )}
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label className="font-medium" htmlFor="priority">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              position.longitude && position.latitude
                ? `${position.latitude},${position.longitude}`
                : ""
            }
          />
          <Button
            buttonType="submit"
            isSubmitting={isSubmitting || isLoadingAddress}
          >
            {isSubmitting ? "Placing order..." : "Order now"}
          </Button>
        </div>
      </Form>
    </div>
  );
}

interface IOrder {
  customer?: string;
  phone?: string;
  address?: string;
  cart: any;
  priority: boolean;
}

export async function action({ request }: { request: Request }) {
  const formData: any = await request.formData();
  const data = Object.fromEntries(formData);

  const order: IOrder = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "on",
  };

  const errors: any = {};
  if (!isValidPhone(order.phone!))
    errors.phone = "Please give us your correct phone number.";

  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);

  store;

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
