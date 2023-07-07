import { Outlet, useNavigation } from "react-router-dom";
import CartOverview from "../features/cart/CartOverview";
import { Header } from "./Header";
import { Loading } from "./Loading";

export const AppLayout = () => {
  const { state } = useNavigation();
  const isLoading = state === "loading";

  return (
    <div className="layout">
      {isLoading && <Loading />}
      <Header />
      <main>
        <Outlet />
      </main>
      <CartOverview />
    </div>
  );
};
