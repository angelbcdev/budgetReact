
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
import SubCategoryEddit from "../components/SubCategoryEddit";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Loging />,
  },
  {
    path: VALID_ROUTES.add,
    loader: authLoader, // 🔐 protected
    element: <MainLayout />,
    children: [
      {
        path: VALID_ROUTES.home,
        element: <BudgetHome />,
      },
      {
        index: true,
        //  path: "add",
        element: <AddNewTransactions />,
      },
      {
        path: VALID_ROUTES.history,
        element: <AllTransactions />,
      },
      {
        path: VALID_ROUTES.settings,
        element: <Settings />,
      },
      {
        path: VALID_ROUTES.graph,
        element: <ShowGrap />,
      },
      {
        path: VALID_ROUTES.details,
        element: <TransationsDetailsView />,
      },
      {
        path: VALID_ROUTES.multiTransactions,
        element: <MultiTransactions />,
      },
      
      {
        path: VALID_ROUTES.subcategory,
        element: <SubCategoryEddit />,
      },
      // SubCategoryEddit
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


