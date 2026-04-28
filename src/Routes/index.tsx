
import { createBrowserRouter } from "react-router";
import Loging from "../components/Loging";
import MainLayout from "./MainLayout";
import { authLoader } from "../provide/func";
import BudgetHome from "../components/BudgetHome";
import AddNewTransactions from "../components/AddNewTransactions";
import AllTransactions from "../components/AllTransactions";


export const router = createBrowserRouter([
  
  {
    path: "/",
    loader: authLoader, // 🔐 runs BEFORE layout
    element: <MainLayout />,
    children:  [
      {
        index: false,
        path: "home",
        element: <BudgetHome />,
      },
      {
        index: true,
       
        element: <AddNewTransactions />,
      },
      {
        path: "transactions",
        element: <AllTransactions />,
      },
      {
        path: "settings",
        element: <BudgetHome />, // change later
      },
      {
    path: "/login",
    element: <Loging />,
  },
    ],
  }, {
    path: "*",
    loader: authLoader, // 🔐 runs BEFORE layout
    element: <p> 404</p>,
    
  }
]);




// export const Router = () => {
//   return (
//     <main
//     onTuchMove={e => e.preventDefault()} 
//       className="w-107.5 h-200  border  flex flex-col relative z-0 ">
      
//     <Routes>
//       {routes.map((route) => (
//         <Route key={route.path} path={route.path} element={route.element} />
//       ))}
//       </Routes>
//        <Navbar/>
//       </main>
//   );
// }
