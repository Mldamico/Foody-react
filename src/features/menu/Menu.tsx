import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "./MenuItem";
import { Menu as IMenu } from "../../types/Menu";

function Menu() {
  const menu = useLoaderData() as IMenu[];

  return (
    <ul className="px2 divide-y divide-stone-200">
      {menu.map((pizza) => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  );
}

export async function loader() {
  return await getMenu();
}

export default Menu;
