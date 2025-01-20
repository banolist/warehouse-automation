import { Index } from "solid-js";
import {
  homeModern,
  xMark,
  userGroup,
  user,
  cube,
  listBullet,
  cubeTransparent,
} from "solid-heroicons/solid";
import { Icon } from "solid-heroicons";
import { A } from "@solidjs/router";
interface Route {
  path: string;
  icon: any;
  text: string;
}
const routes: Route[] = [
  {
    path: "/app/home",
    icon: homeModern,
    text: "Home",
  },
  {
    path: "/app/users",
    icon: userGroup,
    text: "Пользователи",
  },
  {
    path: "/app/suppliers",
    icon: user,
    text: "Поставщики",
  },
  {
    path: "/app/products",
    icon: cube,
    text: "Товары",
  },
  {
    path: "/app/orders",
    icon: listBullet,
    text: "Заказы",
  },
  { path: "/app/inventory", icon: cubeTransparent, text: "Склад" },
];

const LeftDrawer = (props: any) => {
  const close = () => {
    document.getElementById("my-drawer")?.click();
  };
  return (
    <div class="drawer lg:drawer-open">
      <input id="my-drawer" type="checkbox" class="drawer-toggle" />
      <div id="content" class="drawer-content flex flex-col">
        {props.children}
      </div>
      <div class="drawer-side z-30">
        <label
          for="my-drawer"
          aria-label="close sidebar"
          class="drawer-overlay"
        ></label>
        <div class="navbar text-xl font-semibold">Складские запасы</div>
        <ul class="menu bg-base-100 text-base-content min-h-full w-80 p-4 overflow-y-auto">
          <button
            class="btn btn-ghost bg-base-300  btn-circle z-50 top-0 right-0 mt-4 mr-2 absolute lg:hidden"
            onClick={close}
          >
            <Icon path={xMark} class="w-5 h-5 inline-block" />
          </button>
          <Index each={routes}>
            {(route, _) => (
              <li>
                <A href={route().path}>
                  <Icon path={route().icon} class="w-6 h-6" />
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
