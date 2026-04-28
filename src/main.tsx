import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";


import {BudgetContextProvider } from "./provide/budget/Budgetcontext.tsx";
import { RouterProvider } from "react-router";
import { router } from "./Routes/index.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
  
    <BudgetContextProvider>
  
      <RouterProvider router={router} />
  
      </BudgetContextProvider>
     
  </StrictMode>
);
