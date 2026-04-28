import AllTransactions from "../components/AllTransactions";
import BudgetHome from "../components/BudgetHome";



export const routes = [
  {
    name: "Home",
    path: "/",
    element: <BudgetHome/> ,
  },
  {
    name: "Transactions",
    path: "/transactions",
    element: <AllTransactions/> ,
  }
  ,
  {
    name: "Settings",
    path: "/Settings",
    element: <BudgetHome/> ,
  },
  {
    name: "Others",
    path: "/others",
    element: <h1 className="text-3xl font-bold underline">test heoo this is the second window</h1> ,
  }
]