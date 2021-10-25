import Home from "../pages/home/index";
import Error from "../pages/error/index";
import User from "../pages/User";
import BasicLayout from "../layouts/BasicLayout";

const route = [
  {
    path: "/",
    layout: BasicLayout,
    component: Home,
    exact: true,
  },
  {
    path: "/:username",
    layout: BasicLayout,
    component: User,
    exact: true,
  },
  {
    layout: BasicLayout,
    component: Error,
  },
];

export default route;
