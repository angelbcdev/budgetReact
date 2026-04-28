import AddNewTransactions from "../components/AddNewTransactions";
import AllTransactions from "../components/AllTransactions";
import BudgetHome from "../components/BudgetHome";
import { allIcons } from "../UI/allIicons";



export const routes = [
  {
    name: "Add",
    path: "/",
    icon: allIcons.plus,
  },
  {
    name: "Home",
    path: "/home",
    icon: allIcons.home,
  },
  
  {
    name: "History",
    path: "/transactions",
    icon: allIcons.history,
  },
  {
    name: "Settings",
    path: "/settings",
    icon: allIcons.gear,
  },
];