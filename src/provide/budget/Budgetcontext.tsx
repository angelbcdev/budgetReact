import {
  
  useEffect,
 
  useState,
 
  type ReactElement,
} from "react";
import { BudgetContext } from "./data";
import { KEY_SERVICES, ServiciesLocal, type IServiciesDB } from "../../Services/Servicies";
import { Transaction } from "../../Models/DataTransactions";
import type { Category } from "../../Models/dummyData";


export interface IBudgetContext {
  title: string;
  dataBase: IServiciesDB
  isLoading: boolean
  transactionsData: Transaction[]
  saveNewTransaction: (data: Transaction, action?: () => void) => void
  summaryHomeData: ISummaryHomeData
  // setTransactionsData: Dispatch<Transaction[]>
  // setIsLoading: Dispatch<boolean>
}

export interface ISummaryHomeData {
  month: string;
  year: number;
  totalBalance: number;
  totalIncome: number;
  totalExpenses: number;
  totalCardRed: number;
  totalCardBlue: number;
  totalCheckingAccount: number;
  savingMorgage: number;
  savingBank: number;
  savingsStocks: number;
  savingsCrypto: number;
  databyCatefory: Record<Category, number> ;
}



export const BudgetContextProvider = ({ children }: { children: ReactElement }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [transactionsData, setTransactionsData] = useState<Transaction[]>([])
  const [summaryHomeData, setSummaryHomeData] = useState<ISummaryHomeData>({
    month: new Date().toLocaleDateString("en-US", { month: "long" }),
    year: new Date().getFullYear(),
    totalBalance: 0,
    totalIncome: 0,
    totalExpenses: 0,
    totalCardRed: 0,
    totalCardBlue: 0,
    totalCheckingAccount: 0,
    savingMorgage: 0,
    savingBank: 0,
    savingsStocks: 0,
    savingsCrypto: 0,
    databyCatefory: {
      food: 0,
      transport: 0,
      drinks: 0,
      bills: 0,
      amazon: 0,
      savings: 0,
      credit_card_payment: 0,
      other: 0,
      morgage: 0,
      stocks: 0,
      crypto: 0,
      checking: 0,
      credit_card_blue: 0,
      credit_card_red: 0,
      house: 0
    }
  })


  
  const dataBase = new ServiciesLocal()

  useEffect(() => {
    dataBase.getSheetData(KEY_SERVICES.TRANSACIONS).then((data) => {
    
      setTransactionsData(data)
      
         setIsLoading(false)
      })
   
  }, [])


  useEffect(() => {

    const data = transactionsData.reduce((acc, transaction) => {

      if (transaction.paymentMethod === "paycheck") {
        acc.totalIncome += transaction.amount;
        acc.totalCheckingAccount += transaction.amount;
        acc.totalBalance += transaction.amount;
      } else if (transaction.type === "saving") {
        acc.totalBalance -= transaction.amount;
        acc.databyCatefory[transaction.category] += transaction.amount;
        switch (transaction.category) {
          case "morgage":
            acc.savingMorgage += transaction.amount;
            break;
          case "savings":
            acc.savingBank += transaction.amount;
            break;
          
          case "stocks":
            acc.savingsStocks += transaction.amount;
            break;
          case "crypto":
            acc.savingsCrypto += transaction.amount;
            break;
          
          default:
            break;
        }
      } else if (transaction.type === "spending") {
        acc.totalBalance -= transaction.amount;
        acc.totalExpenses += transaction.amount;
        acc.databyCatefory[transaction.category] += transaction.amount;
        switch (transaction.paymentMethod) {

          case "credit_card_blue":
            acc.totalCardBlue += transaction.amount;
            break;
          case "credit_card_red":
            acc.totalCardRed += transaction.amount;
            break;

          default:
            break;  
        }
      }

      return acc;
    }, {totalBalance: 0,
    totalIncome: 0,
    totalExpenses: 0,
    totalCardRed: 0,
    totalCardBlue: 0,
    totalCheckingAccount: 0,
    savingMorgage: 0,
    savingBank: 0,
    savingsStocks: 0,
      savingsCrypto: 0,
    databyCatefory: {
      food: 0,
      transport: 0,
      drinks: 0,
      bills: 0,
      amazon: 0,
      savings: 0,
      credit_card_payment: 0,
      other: 0,
      morgage: 0,
      stocks: 0,
      crypto: 0,
      checking: 0,
      credit_card_blue: 0,
      credit_card_red: 0,
      house: 0
    }
    } as ISummaryHomeData);
    

    setSummaryHomeData(prev => ({...prev , ...data}))
    
  },[transactionsData])


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

       },1200)
        
      })
    })
    return false
  }
  const values = {
    title: "this is a test",
    dataBase,
    isLoading,
    transactionsData,
    saveNewTransaction,
    summaryHomeData
  }

  return (
     <BudgetContext.Provider value={values}> {children} </BudgetContext.Provider>
  ) 
}