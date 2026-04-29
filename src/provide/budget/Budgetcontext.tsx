import {
  
  useEffect,
 
  useState,
 
  type ReactElement,
} from "react";
import { BudgetContext } from "./data";
import { GoogleSheetsServicies, KEY_SERVICES,  type IServiciesDB } from "../../Services/Servicies";
import { Transaction } from "../../Models/DataTransactions";

import { useSummary, type ISummaryHomeData } from "../hooks/useSummaryTransactions";
import { goalsDataDefault, type TKEY_GOALS, type TKEY_MONTHS } from "../interfaces";


export interface IBudgetContext {
  title: string;
  dataBase: IServiciesDB
  isLoading: boolean
  transactionsData: Transaction[]
  saveNewTransaction: (data: Transaction, action?: () => void) => void
  handleDelete: () => void
  summaryHomeData: ISummaryHomeData
  currentMonthKey: string
  changeMountToShow: (action: "<" | ">") => void
  global: ISummaryHomeData
  curentDate:{
    year: string,
    month: string,
  }
  validateBalance: (amount?: number) => boolean
  validateMorgageFound: (amount?: number) => boolean
  validatePaymentCard: (card: string, cuantity: number , acction:(newAmount: string)=>void) => boolean
  // setTransactionsData: Dispatch<Transaction[]>
  // setIsLoading: Dispatch<boolean>
  currentMonthGoals:  Record<TKEY_GOALS, number>
}


  
const goalsMonthly: TKEY_MONTHS = {
  // "2026-04": {
  //    savingsMorgage:1400,
  //   savingsBank: 250,
  //   savingsStocks: 250,
  //   savingsCrypto: 100
  // },
  // "2026-03": {
  //    savingsMorgage:900,
  //   savingsBank: 900,
  //   savingsStocks: 950,
  //   savingsCrypto: 900
  //  }
    
 }


export const BudgetContextProvider = ({ children }: { children: ReactElement }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [transactionsData, setTransactionsData] = useState<Transaction[]>([])
  const [currentMountIndex, setCurrentMountIndex] = useState(0)
  
  const { global, monthly , lastMonth ,allMonthsData } = useSummary(transactionsData);
  
  const currentMonthKey = allMonthsData[currentMountIndex] || lastMonth

  const currentMonthGoals = goalsMonthly[currentMonthKey || lastMonth ] ?? goalsDataDefault

  const summaryHomeData =monthly[currentMonthKey]
 


  const validateBalance = (cuantity: number = 0) => {
    return global?.totalBalance > cuantity
  }
  const validateMorgageFound = (cuantity: number = 0) => {
    return global?.savingsMorgage > cuantity
  }
  const validatePaymentCard = (card: string, cuantity: number = 0, acction: (newAmount: string) => void): boolean => {
    
    if (card === "credit_card_blue") {
      acction(global?.totalCardBlue.toString())
      return global?.totalCardBlue > cuantity
    } else {
      acction(global?.totalCardRed.toString())
      return global?.totalCardRed > cuantity
    }

   
  }

  
  const dataBase = new GoogleSheetsServicies()

  useEffect(() => {
    dataBase.getSheetData(KEY_SERVICES.TRANSACIONS).then((data) => {
      
       setIsLoading(false)
       setTransactionsData(data)
      if (!data.success) {
        return
      }
      
        
      })
   
  }, [])

  const changeMountToShow = (action: "<" | ">") => {
    if (action === "<") {
      setCurrentMountIndex((prev) => prev - 1 < 0 ? 0 : prev - 1)
    } else {
      setCurrentMountIndex((prev) => prev + 1 > allMonthsData.length - 1 ? allMonthsData.length - 1 :  prev + 1)
    }
    
  }

  const handleDelete = () => {
   
  }

  const saveNewTransaction = (data:Transaction ,action?:()=>void) => {
    setIsLoading(true)
      dataBase.sendSheetDataTransaction({
      sheetName: KEY_SERVICES.TRANSACIONS,
      transaction: data
    }).then(() => {
      dataBase.getSheetData(KEY_SERVICES.TRANSACIONS).then((update) => {
       setTimeout(() => {
     
          setTransactionsData(update)
          setIsLoading(false)
        if (action) {
          action()
        }

       },500)
        
      })
    })
    return false
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
    dataBase,
    isLoading,
    transactionsData,
    saveNewTransaction,
    summaryHomeData,
    currentMonthKey,
    curentDate, changeMountToShow,
    global, validateBalance,
    validateMorgageFound,
    currentMonthGoals,
    validatePaymentCard,
    handleDelete

  }

  return (
     <BudgetContext.Provider value={values}> {children} </BudgetContext.Provider>
  ) 
}