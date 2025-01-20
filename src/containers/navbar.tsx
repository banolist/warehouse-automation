import { Icon } from "solid-heroicons";
import { bars_3 } from "solid-heroicons/solid";
const Navbar = () => {
  return (
    <div class="navbar sticky bg-base-500 z-10 shadow-md">
      <div class="flex-1 ">
        <label for="my-drawer" class="btn lg:hidden btn-primary drawer-button">
          <Icon path={bars_3} class="w-6 h-6" />
        </label>
      </div>
    </div>
  );
};

export default Navbar;
