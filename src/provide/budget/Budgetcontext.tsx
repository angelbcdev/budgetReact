import {
  
  useEffect,
 
  useState,
 
  type ReactElement,
} from "react";
import { BudgetContext } from "./data";
import {        GoogleSheetsServicies   } from "../../Services/Servicies";
import { Transaction } from "../../Models/DataTransactions";

import { useSummary, type ISummaryHomeData } from "../hooks/useSummaryTransactions";
import { goalsDataDefault, type TKEY_GOALS, type TKEY_MONTHS } from "../interfaces";
// import { settings } from "../../api";


export interface IBudgetContext {
  title: string;
  isLoading: boolean
  transactionsData: Transaction[]
  saveNewTransaction: (data: Transaction, action?: () => void) => void
  handleDelete: () => void
  handleBackup: () => void
  summaryHomeData: ISummaryHomeData
  currentMonthKey: string
  changeMountToShow: (action: "<" | ">") => void
  allMonthsData:string[]
  saveMultipleTransaction:(data:Transaction[] ,action?:()=>void)=>void
  handleUpdate:(data:Transaction)=>void
  handleDeleteOne: (data: Transaction) => void
  udateLocalDataBase: () => void
  validateSavingsAccountBalance: (cuantity?: number) => boolean
  global: ISummaryHomeData
  curentDate:{
    year: string,
    month: string,
  }
  validateBalance: (amount?: number) => boolean
  validateMortgageFound: (amount?: number) => boolean
  validatePaymentCard: (card: string, cuantity: number , acction:(newAmount: string)=>void) => boolean
  // setTransactionsData: Dispatch<Transaction[]>
  // setIsLoading: Dispatch<boolean>
  currentMonthGoals: Record<TKEY_GOALS, number>
  lastMonth: string
  allMonthsDataSort: Record<string, ISummaryHomeData>
  acumulateMonth: Record<string, ISummaryHomeData>
}


  
const goalsMonthly: TKEY_MONTHS = {

    
 }


export const BudgetContextProvider = ({ children }: { children: ReactElement }) => {
  const [isLoading, setIsLoading] = useState(false )
  const [transactionsData, setTransactionsData] = useState<Transaction[]>([])
  
  const { global, monthly, lastMonth, allMonthsData ,    acumulateMonth,
 } = useSummary(transactionsData);
  
  const [currentMountIndex, setCurrentMountIndex] = useState(allMonthsData.findIndex((f) => f === lastMonth))

  
  const currentMonthKey = allMonthsData[currentMountIndex] || lastMonth

  const currentMonthGoals = goalsMonthly[currentMonthKey || lastMonth ] ?? goalsDataDefault

  const summaryHomeData =monthly[currentMonthKey]
 


  const validateBalance = (cuantity: number = 0) => {
    return global?.totalBalance > cuantity
  }
   const validateSavingsAccountBalance = (cuantity: number = 0) => {
    return global?.savingsBank > cuantity
  }
  const validateMortgageFound = (cuantity: number = 0) => {

    return global?.savingsMortgage > cuantity
  }
  const validatePaymentCard = (card: string, cuantity: number = 0, acction: (newAmount: string) => void): boolean => {
    
    if (card === "credit_card_blue") {
      acction(global?.totalCardBlue.toString())
      return global?.totalCardBlue >= cuantity
    } else {
      acction(global?.totalCardRed.toString())
      return global?.totalCardRed >= cuantity
    }

   
  }

   const changeMountToShow = (action: "<" | ">") => {
    if (action === "<") {
      setCurrentMountIndex((prev) => prev - 1 < 0 ? 0 : prev - 1)
    } else {
      setCurrentMountIndex((prev) => prev + 1 > allMonthsData.length - 1 ? allMonthsData.length - 1 :  prev + 1)
    }
    
  }

  
  const dataBase = new GoogleSheetsServicies() //  new GoogleSheetsServicies()  // new ServiciesLocal()
  // const onlineData = new GoogleSheetsServicies()
  useEffect(() => {
    setIsLoading(true)
    dataBase.getSheetData().then((data) => {
      
       setIsLoading(false)
       setTransactionsData(data)
      if (!data.length ) {
        return
      }
      
        
    })
   
   
  }, [])

  const udateLocalDataBase = () => {
    setIsLoading(true)
    new GoogleSheetsServicies().getSheetData().then((data) => {
      setIsLoading(false)
      console.log(transactionsData)
      console.log(data)
    })
 }

  const handleDelete = () => {
    return;
   dataBase.handleDelete().then((data) => {
   
     if (data) {
       window.location.reload()
      setTransactionsData([])
    }
   })
  }
  const saveMultipleTransaction = (data: Transaction[], action?: () => void) => {
    setIsLoading(true)
    const newTransactions = [...transactionsData, ...data]
    setTransactionsData(newTransactions)
 
    dataBase.handleBackup(newTransactions).then(() => {
       setIsLoading(false)
      if (action) {
        action()
      }
    })
    
  }

  const saveNewTransaction = (data:Transaction ,action?:()=>void) => {
    setIsLoading(true)
    const newTransactions = [...transactionsData, new Transaction(data)]
    setTransactionsData(newTransactions)
    setIsLoading(false)
    if (action) {
        action()
    }
    

    dataBase.sendSheetDataTransaction(newTransactions).then(() => {
      
    })
    return false
  }

  const handleBackup = () => {
   
    dataBase.handleBackup(transactionsData)
  

  }
  const handleUpdate=(data:Transaction)=>{

     const newTransactions = [...transactionsData.filter(t => t.id != data.id), new Transaction(data)]
    setTransactionsData(newTransactions)
    console.log(newTransactions)
        dataBase.handleUpdate(newTransactions)

  }



  const handleDeleteOne = (data: Transaction) => {
  

     const newTransactions = [...transactionsData.filter(t => t.id != data.id)]
        setTransactionsData(newTransactions)
        dataBase.handleDeleteOne(newTransactions)

  }


     const [year, month] = currentMonthKey.split("-").map(Number);
  
  const nameMonth = new Date(year, month - 1).toLocaleString("default", {
    month: "long",
  });

  const curentDate = {
    year: year.toString(),
    month: nameMonth,
  }
  const values = {
    title: "this is a test",

    isLoading,
    transactionsData,
    saveNewTransaction,
    summaryHomeData,
    currentMonthKey,
    curentDate, changeMountToShow,
    global, validateBalance,
    validateMortgageFound,
    currentMonthGoals,
    validatePaymentCard,
    handleDelete,
    allMonthsData,
    lastMonth,
    allMonthsDataSort: monthly,
    acumulateMonth,
    handleBackup, saveMultipleTransaction, handleUpdate, handleDeleteOne,
    udateLocalDataBase,
    validateSavingsAccountBalance

  }

  return (
     <BudgetContext.Provider value={values}> {children} </BudgetContext.Provider>
  ) 
}



// export function diferenciaDiasExactos(f1:Date, f2:Date) {
//   const d1 = new Date(f1.getFullYear(), f1.getMonth(), f1.getDate());
//   const d2 = new Date(f2.getFullYear(), f2.getMonth(), f2.getDate());

//   const msPorDia = 1000 * 60 * 60 * 24;
//    const parse = (str: Date) => {
//                 const [month, day, year] = str.split(" ");
//                 return new Date(`${month} ${day}, ${year}`).getTime();
//               };
//   return (parse(d2) - parse(d1)) / msPorDia;
// }


// export function diferenciaTiempo(f1:Date, f2:Date):boolean {
//   // Normalizar fechas completas (no quitamos horas aquí)
//   const fecha1 = new Date(f1);
//   const fecha2 = new Date(f2);

//   const diffMs = Number(fecha2) - Number(fecha1);

//   // ---- MINUTOS ----
//   const msPorMinuto = 1000 * 60;
//   const minutos = diffMs / msPorMinuto;

//   if (minutos >= 1) {
//     return true; // ya pasaron 5 minutos
//   }

//   return false;

//   // ---- DÍAS (por si lo necesitas después) ----
//   // const msPorDia = 1000 * 60 * 60 * 24;
//   // const dias = diffMs / msPorDia;
//   // return dias;
// }