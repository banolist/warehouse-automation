import Navbar from "./navbar";
import LeftDrawer from "./left-drawer";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "@solidjs/router";
import { createEffect } from "solid-js";

export const Layout = (props: any) => {
  const navigate = useNavigate();
  const { logined } = useAuth();
  // if (!logined()) {
  //   navigate("/login");
  //   // return <Navigate href={"/login"} />;
  // }
  createEffect(() => {
    if (!logined()) {
      console.log("kkk");
      navigate("/login");
    }
  });
  return (
    <LeftDrawer>
      <Navbar />
      <main class="flex-1 overflow-y-auto md:pt-4 pt-4 px-6 bg-base-200">
        {props.children}
      </main>
    </LeftDrawer>
  );
};
