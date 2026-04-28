import {  useContext } from "react";
import { BudgetContext } from "./data";



export const useBookContext = () => 
useContext(BudgetContext);
;