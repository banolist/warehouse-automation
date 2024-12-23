import { JSX, Index } from "solid-js";
import { homeModern } from "solid-heroicons/solid";
import { Icon } from "solid-heroicons";
import { A } from "@solidjs/router";
interface Route {
  path: string;
  icon: any;
  text: string;
}
const routes: Route[] = [
  {
    path: "/",
    icon: homeModern,
    text: "Home",
  },
  {
    path: "/app/users",
    icon: homeModern,
    text: "Users",
  },
  {
    path: "/app/suppliers",
    icon: homeModern,
    text: "Suppliers",
  },
  {
    path: "/app/products",
    icon: homeModern,
    text: "Products",
  },
  {
    path: "/app/orders",
    icon: homeModern,
    text: "Orders",
  },
  { path: "/app/inventory", icon: homeModern, text: "Inventory" },
];

const LeftDrawer = (props: any) => {
  return (
    <div class="drawer">
      <input id="my-drawer" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content">{props.children}</div>
      <div class="drawer-side">
        <label
          for="my-drawer"
          aria-label="close sidebar"
          class="drawer-overlay"
        ></label>
        <ul class="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          <Index each={routes}>
            {(route, _) => (
              <li>
                <A href={route().path}>
                  <Icon path={route().icon} class="w-6 h-6" />{" "}
                  <span>{route().text}</span>
                </A>
              </li>
            )}
          </Index>
        </ul>
      </div>
    </div>
  );
};

export default LeftDrawer;
