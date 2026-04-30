
import { allIcons } from "../UI/allIicons";


export const VALID_ROUTES = {
  "Add": "/",
  "Home": "/home",
  "History": "/transactions",
  "Settings": "/settings",
  "Graph": "/graph",
}

export const routes = [
  {
    name: "Add",
    path: VALID_ROUTES.Add,
    icon: allIcons.plus,
  },
  {
    name: "Home",
    path: VALID_ROUTES.Home,
    icon: allIcons.home,
  },
  
  {
    name: "History",
    path: VALID_ROUTES.History,
    icon: allIcons.history,
  },
  {
    name: "Settings",
    path: VALID_ROUTES.Settings,
    icon: allIcons.gear,
  },
  //  {
  //   name: "Graph",
  //   path: VALID_ROUTES.Graph,
  //   icon: allIcons.wallet,
  // },
];