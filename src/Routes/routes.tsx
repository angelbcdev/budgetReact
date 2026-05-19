
import { allIcons } from "../UI/allIicons";


export const VALID_ROUTES = {
  "add": "/",
  "home": "/home",
  "history": "/transactions",
  "settings": "/settings",
  "graph": "/graph",
  "details": "/transactionsDetails",
  "multiTransactions": "/multiTransactions",
  "subcategory":"/subcategory"
}

export const routes = [
  {
    name: "Add",
    path: VALID_ROUTES.add,
    icon: allIcons.plus,
  },
  {
    name: "Home",
    path: VALID_ROUTES.home,
    icon: allIcons.home,
  },
  
  {
    name: "History",
    path: VALID_ROUTES.history,
    icon: allIcons.history,
  },
  {
    name: "Settings",
    path: VALID_ROUTES.settings,
    icon: allIcons.gear,
  },
  // {
  //   name: "multi",
  //   path: VALID_ROUTES.subcategory,
  //   icon: allIcons.wallet,
  // },
  //  {
  //   name: "transactions",
  //   path: VALID_ROUTES.Details,
  //   icon: allIcons.wallet,
  // },
];