import {  useContext } from "react";
import { BudgetContext } from "./data";



export const useBudgetContext = () => 
useContext(BudgetContext);
;