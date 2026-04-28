import {
  createContext,
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type ReactElement,
} from "react";
import { BudgetContext } from "./data";


export interface IBudgetContext {
  title: string;
}





export const BudgetContextProvider =({ children }: { children: ReactElement }) => {
  

  const values = {
    title:"this is a test"
  }

  return (
     <BudgetContext.Provider value={values}> {children} </BudgetContext.Provider>
  ) 
}