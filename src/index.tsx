/* @refresh reload */
import { render } from "solid-js/web";
import "./index.css";
import { Route, Router } from "@solidjs/router";
import { lazy } from "solid-js";
import Home from "./pages/home";
import { Layout } from "./containers/layout";
import Products from "./pages/Products";
import Users from "./pages/Users";
import InventoryPage from "./pages/Inventory";
import Supplers from "./pages/Supplers";
import Orders from "./pages/Orders";
import Login from "./pages/Login";
import AuthProvider from "./providers/auth";

const App = lazy(() => import("./App"));

const AppRoot = (props: any) => {
  return (
    <>
      <AuthProvider>{props.children}</AuthProvider>
    </>
  );
};

const root = document.getElementById("root");
render(
  () => (
    <Router root={AppRoot}>
      <Route path="/">
        <Route path="login" component={Login} />
        <Route path="" component={App} />
        <Route path="app" component={Layout}>
          <Route path="home" component={Home} />
          <Route path="users" component={Users} />
          <Route path="suppliers" component={Supplers} />
          <Route path="products" component={Products} />
          <Route path="orders" component={Orders} />
          <Route path="inventory" component={InventoryPage} />
        </Route>
      </Route>
      <Route
        path="*"
        component={() => (
          <div style={{ color: "white" }}>404 - Page Not Found</div>
        )}
      ></Route>
    </Router>
  ),
  root!
);
