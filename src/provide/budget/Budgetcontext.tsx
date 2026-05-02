import {
  
  useEffect,
 
  useState,
 
  type ReactElement,
} from "react";
import { BudgetContext } from "./data";
import { GoogleSheetsServicies, KEY_SERVICES,        ServiciesLocal,        type IServiciesDB } from "../../Services/Servicies";
import { Transaction } from "../../Models/DataTransactions";

import { useSummary, type ISummaryHomeData } from "../hooks/useSummaryTransactions";
import { goalsDataDefault, type TKEY_GOALS, type TKEY_MONTHS } from "../interfaces";
import { settings } from "../../api";


export interface IBudgetContext {
  title: string;
  dataBase: IServiciesDB
  isLoading: boolean
  transactionsData: Transaction[]
  saveNewTransaction: (data: Transaction, action?: () => void) => void
  handleDelete: () => void
  handleBackup: () => void
  summaryHomeData: ISummaryHomeData
  currentMonthKey: string
  changeMountToShow: (action: "<" | ">") => void
  allMonthsData:string[]

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
  // "2026-04": {
  //    savingsMortgage:1400,
  //   savingsBank: 250,
  //   savingsStocks: 250,
  //   savingsCrypto: 100
  // },
  // "2026-03": {
  //    savingsMortgage:900,
  //   savingsBank: 900,
  //   savingsStocks: 950,
  //   savingsCrypto: 900
  //  }
    
 }


export const BudgetContextProvider = ({ children }: { children: ReactElement }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [transactionsData, setTransactionsData] = useState<Transaction[]>([])
  
  const { global, monthly, lastMonth, allMonthsData ,    acumulateMonth,
 } = useSummary(transactionsData);
  
  const [currentMountIndex, setCurrentMountIndex] = useState(allMonthsData.findIndex((f) => f === lastMonth))

  
  const currentMonthKey = allMonthsData[currentMountIndex] || lastMonth

  const currentMonthGoals = goalsMonthly[currentMonthKey || lastMonth ] ?? goalsDataDefault

  const summaryHomeData =monthly[currentMonthKey]
 


  const validateBalance = (cuantity: number = 0) => {
    return global?.totalBalance >= cuantity
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

  
  const dataBase = settings.isDev ? new ServiciesLocal() :  new GoogleSheetsServicies() 

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
   dataBase.handleDelete({
    sheetName: KEY_SERVICES.TRANSACIONS
   }).then((data) => {
   
     if (data) {
       window.location.reload()
      setTransactionsData([])
    }
   })
  }

  const saveNewTransaction = (data:Transaction ,action?:()=>void) => {
    setIsLoading(true)
      dataBase.sendSheetDataTransaction({
      sheetName: KEY_SERVICES.TRANSACIONS,
      transaction: data
      }).then(() => {
        const newTransactions = [...transactionsData, data]
        setTransactionsData(newTransactions)
          setIsLoading(false)
        if (action) {
          action()
        }
      
    })
    return false
  }

  const handleBackup = () => {
    
    dataBase.handleBackup(transactionsData)
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
    validateMortgageFound,
    currentMonthGoals,
    validatePaymentCard,
    handleDelete,
    allMonthsData,
    lastMonth,
    allMonthsDataSort: monthly,
    acumulateMonth,
    handleBackup

  }

  return (
     <BudgetContext.Provider value={values}> {children} </BudgetContext.Provider>
  ) 
}