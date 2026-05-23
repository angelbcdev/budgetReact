import { useState } from "react"
import { useBudgetContext } from "../../provide/budget"
import { VALID_ROUTES } from "../../Routes/routes"
import HeatherView from "../../UI/HeatherView"
import { Layout } from "../../UI/Layout"
import { Keyboard } from "../addNewTransactions/Keyboard"
import type { TransactionType } from "../../Models/dummyData"
import type { IBalanceNotification, ITransaction } from "../AddNewTransactions"
import { ajustDataForTransaction, emptyNotification } from "../addNewTransactions/helpers"
import { BalanceNotification } from "../addNewTransactions/BalanceNotification"
import { BiToogleButton } from "../../UI/DataShowListCategory"


const initialAmount = "0.00"
export const AssectsSell = ()=>{
      const { saveNewTransaction ,validateMortgageFound ,
      validateSavingsAccountBalance } =
        useBudgetContext();
     
    
      const [amountAssect, setAmountAssect] = useState({ amount: initialAmount })
      const [profitAssect, setProfitAssect] = useState({ amount: initialAmount })
      const [animate, setAnimate] = useState(false);
      const [balanceNotification, setBalanceNotification] = useState<IBalanceNotification>({ ...emptyNotification });
    
      const [isSellStocks, setIsSellStocks] = useState(true);
      const [isAmount, setIsAmount] = useState(true);

       const defaultTypeTransaction = "sell_stocks"
    
  
      const triggerAnimation = () => {
        setAnimate(true); // reset
        const t = setTimeout(() => {
          clearTimeout(t);
          setAnimate(false)
        }, 150);
        return () => clearTimeout(t);
      };
    
      const changeType = () => {
        setAmountAssect({ amount: initialAmount })
      }
    
      const showNotification = ({ msj, color }: { msj: string, color: { text: string, bg: string } }) => {
        setBalanceNotification({
          show: true,
          message: msj,
          color: color
        });
        setTimeout(() => {
          setBalanceNotification({ ...emptyNotification });
        }, 1500);
      }
    
      const makeTransiction = () => {
        const d: ITransaction = {
          title: isSellStocks ? "Sell Stocks" : "Sell Crypto",
          description: "",
          date: new Date(),
          amount: amountAssect.amount,
          category: "moneyTransactions",
          type: defaultTypeTransaction,
          paymentMethod: "savings_account",
          subcategory: [],
        }
    
        const data = ajustDataForTransaction({ dataTransaction: d })
        // console.log(data)
    
    
    
          if (isSellStocks) {
            if (!validateSavingsAccountBalance(Number(amountAssect.amount))) {
              showNotification({ msj: "Not enough balance in savings account", color: { text: "#FF0000", bg: "#FFCCCC" } })
              return;
            }
          }else {
            if (!validateMortgageFound(Number(amountAssect.amount))) {
              showNotification({ msj: "Not enough balance in mortgage found", color: { text: "#FF0000", bg: "#FFCCCC" } })
              return;
            }
          }
    
        saveNewTransaction(data, () => {
          setAmountAssect({ amount: initialAmount })
          triggerAnimation()
          showNotification({ msj: "Transaction saved", color: { text: "#00AA00", bg: "#CCFFCC" } })
        })
    
      }
    
    
      const cards = [
        {
          element: amountAssect,
    
    
          title: "my Assect",
        },
    
        {
          element: profitAssect,
    
    
          title: "Profit",
        }]


    return(
    <Layout>
        <BalanceNotification {...{ balanceNotification, setBalanceNotification }} />
     <HeatherView title="Assects Sell" />
       <section>
             <section className="h-64 px-10 pt-4 relative flex  flex-col gap-4 ">
               <button onClick={changeType} className=" top-24 left-3/4  size-16 bg-blue-400 text-white font-semibold border-2 shadow border-white text-sm -translate- x-1 /2 -translate-y-1/4  rounded-md  ">Change</button>
               
                <div className="w-36">
                   <BiToogleButton
                             data={[true, false]}
                             title={["sell stocks", "sell crypto"]}
                             valueSort={isSellStocks}
                             setSortToggle={setIsSellStocks}
                           />
                </div>
               
               <p className="absolute -top-20 ">{defaultTypeTransaction}</p>
               <div className=" gap-5 flex flex-col  ">
     
                 {
                   cards.map((e, i) => (
                     <div 
                     onClick={() => setIsAmount(i === 0)}
                     key={i} className={`w-3/4 bg-white min-h-12 border-4 p-2  rounded-md shadow  ${isAmount ? "  border-blue-200 " : "border-transparent "}`}>
                       <p className=" text-[11px]" >{i == 0 ? "FROM :" : "TO :"} <span className="font-semibold text-xl">{ e.title}</span></p>
                        <p className={`font-md text-3xl text-gray-700 text-end ${animate ? "scale-103 opacity-70 pr-px " : "scale-100 opacity-100"
                         }`}>{e?.element?.amount}</p>
                     </div>))
                 }
     
               </div>
             </section>
     
             <Keyboard triggerAnimation={triggerAnimation}
               createTransaction={makeTransiction}
               dataTransaction={amountAssect}
               setDataTransaction=
               {setAmountAssect} 
               buttonOptions={{title:"Move Savings",path:VALID_ROUTES.internalTransactions}}
               />
           </section>
     </Layout>
    )
}