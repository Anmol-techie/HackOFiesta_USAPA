import { lazy, useEffect } from "react";
import {
  HouseOutlined as InventoryIcon,
  DashboardOutlined as DashboardIcon,
  Receipt as ReceiptIcon,
  CameraAlt as BarcodeIcon,
} from "@material-ui/icons";
import Box from "@material-ui/core/Box";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";

import { useAuth, authStates } from "../context/AuthContext";
import Navbar, { NAVBAR_WIDTH } from "../components/Navbar";
import Loader from "../components/Loader";

const Empty = lazy(() => import("../views/Empty"));
const Dashboard = lazy(() => import("../views/Dashboard"));
const AdminDashboard = lazy(() => import("../views/AdminDashboard"));
const Login = lazy(() => import("../views/Login"));
const Inventory = lazy(() => import("../views/Inventory"));
const Invoice = lazy(() => import("../views/Invoice"));
const AdminInventory = lazy(() => import("../views/AdminInventory"));
const AdminScanning = lazy(() => import("../views/AdminScanning"));

export const pages = [
  {
    pageLink: "/inventory",
    component: Inventory,
    displayName: "Inventory",
    showInNavbar: true,
    navbarIcon: InventoryIcon,
  },
  {
    pageLink: "/",
    component: Dashboard,
    displayName: "Dashboard",
    showInNavbar: true,
    navbarIcon: DashboardIcon,
  },
  {
    pageLink: "/invoice",
    component: Invoice,
    displayName: "Invoice",
    showInNavbar: true,
    navbarIcon: ReceiptIcon,
  },
];

export const adminPages = [
  {
    pageLink: "/admin/inventory",
    component: AdminInventory,
    displayName: "Inventory",
    showInNavbar: true,
    navbarIcon: InventoryIcon,
  },
  {
    pageLink: "/admin/dashboard",
    component: AdminDashboard,
    displayName: "Dashboard",
    showInNavbar: true,
    navbarIcon: DashboardIcon,
  },
  {
    pageLink: "/admin/barcode",
    component: AdminScanning,
    displayName: "Barcode",
    showInNavbar: true,
    navbarIcon: BarcodeIcon,
  },
];

const Router = () => {
  const location = useLocation();
  const initAuthHandler = useAuth((state) => state.initAuthHandler);
  const authState = useAuth((state) => state.authState);

  useEffect(initAuthHandler, [initAuthHandler]);

  return (
    <Switch location={location}>
      {authState === authStates.LOADING ? (
        <Loader />
      ) : authState === authStates.ADMIN ? (
        <>
          <Navbar admin />
          <Box style={{ marginLeft: NAVBAR_WIDTH }}>
            {adminPages.map((page) => (
              <Route
                exact
                key={page.pageLink}
                path={page.pageLink}
                component={page.component}
              />
            ))}
          </Box>
          <Redirect exact to="/admin/inventory" />
        </>
      ) : authState === authStates.LOGGED_IN ? (
        <>
          <Navbar admin={false} />
          <Box style={{ marginLeft: NAVBAR_WIDTH }}>
            {pages.map((page) => (
              <Route
                exact
                key={page.pageLink}
                path={page.pageLink}
                component={page.component}
              />
            ))}
          </Box>
          <Redirect exact to="/inventory" />
        </>
      ) : authState === authStates.UNAUTHORISED ? (
        <>
          <Route
            exact
            key="unauthorised"
            path="/unauthorised"
            component={Empty}
          />
          <Redirect exact to="/unauthorised" />
        </>
      ) : (
        <>
          <Route exact key="login" path="/login" component={Login} />
          <Redirect exact to="/login" />
        </>
      )}
    </Switch>
  );
};

export default Router;
