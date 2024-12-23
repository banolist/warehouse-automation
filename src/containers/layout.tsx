import { Component, JSX } from "solid-js";
import Navbar from "./navbar";
import LeftDrawer from "./left-drawer";

type Props = {
  children: JSX.Element;
};

export const Layout = (props: any) => {
  return (
    <LeftDrawer>
      <Navbar />
      <main class="bg-base-200 w-full h-full">{props.children}</main>
    </LeftDrawer>
  );
};
