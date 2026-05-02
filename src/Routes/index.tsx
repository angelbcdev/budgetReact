
import { createBrowserRouter } from "react-router";
import Loging from "../components/Loging";
import MainLayout from "./MainLayout";
import { authLoader } from "../provide/func";
import BudgetHome from "../components/BudgetHome";
import AddNewTransactions from "../components/AddNewTransactions";
import AllTransactions from "../components/AllTransactions";
import Settings from "../components/Settings";
import ShowGrap from "../components/ShowGrap";
import{ Layout }from "../UI/Layout";
import TransationsDetailsView from "../components/TransationsDetailsView";
import MultiTransactions from "../components/MultiTransactions"
import { VALID_ROUTES } from "./routes";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Loging />,
  },
  {
    path: "/",
    loader: authLoader, // 🔐 protected
    element: <MainLayout />,
    children: [
      {
        path: "home",
        element: <BudgetHome />,
      },
      {
        index: true,
        //  path: "add",
        element: <AddNewTransactions />,
      },
      {
        path: "transactions",
        element: <AllTransactions />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
      {
        path: "graph",
        element: <ShowGrap />,
      },
      {
        path: "transactionsDetails",
        element: <TransationsDetailsView />,
      },
      {
        path: VALID_ROUTES.multiTransactions,
        element: <MultiTransactions />,
      },
      {
        path: "*",
        element: <Layout>404</Layout>,
      }
    ],
  },
  {
    path: "*",
    element: <Layout>404</Layout>,
  },
]);
//VALID_ROUTES.Settings


