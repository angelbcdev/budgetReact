import { useEffect, useState } from "react"
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
import { SubCategortCardForList } from "../SubCategoryEddit"


const initialAmount = "0.00"
export const AssectsSell = ()=>{
      const { saveNewTransaction ,validateMortgageFound , subcategoriesData,
      validateSavingsAccountBalance } =
        useBudgetContext();
     
    
      const [amountAssect, setAmountAssect] = useState({ amount: initialAmount })
      const [profitAssect, setProfitAssect] = useState({ amount: initialAmount })
      const [animate, setAnimate] = useState(false);
      const [balanceNotification, setBalanceNotification] = useState<IBalanceNotification>({ ...emptyNotification });
    
      const [isSellStocks, setIsSellStocks] = useState(true);
      const [isAmount, setIsAmount] = useState(true);

       const defaultTypeTransaction = isSellStocks ? "sell_stocks" : "sell_crypto"
       const [allCategories, setAllCategories] = useState<string[]>([])

    const addCategory = (category: string) => {
    console.log(allCategories)
    if (allCategories.includes(category)) {
      setAllCategories(allCategories.filter((c) => c !== category));
    } else {
       setAllCategories([...allCategories, category]);
    }
  }
  useEffect(() => {
    setAllCategories([])
  }, [isSellStocks])
    
  
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
          category: "sell_assets",
          type: defaultTypeTransaction,
          paymentMethod: "savings_account",
          subcategory: [],
          porcentage: 100,
        }
    
        const data = ajustDataForTransaction({ dataTransaction: d })
        // console.log(data)
    
    
    
          // if (isSellStocks) {
          //   if (!validateSavingsAccountBalance(Number(amountAssect.amount))) {
          //     showNotification({ msj: "Not enough balance in savings account", color: { text: "#FF0000", bg: "#FFCCCC" } })
          //     return;
          //   }
          // }else {
          //   if (!validateMortgageFound(Number(amountAssect.amount))) {
          //     showNotification({ msj: "Not enough balance in mortgage found", color: { text: "#FF0000", bg: "#FFCCCC" } })
          //     return;
          //   }
          // }
          console.log(data)
          return
        saveNewTransaction(data, () => {
          setAmountAssect({ amount: initialAmount })
          triggerAnimation()
          showNotification({ msj: "Transaction saved", color: { text: "#00AA00", bg: "#CCFFCC" } })
        })
    
      }
    
    
      const cards = [
        {
          element: amountAssect,
          value: true,
          isSelected:isAmount,
          title: "Assect",
        },
    
        {
          element: profitAssect,
    value: false,
          isSelected:!isAmount,
          title: "Profit",
        }]


    return(
    <Layout>
        <BalanceNotification {...{ balanceNotification, setBalanceNotification }} />
     <HeatherView title="Assects Sell" />
       <section>
             <section className="h-64 px-10 pt-4 relative flex  flex-col gap-4 ">
               
                <div className="w-36">
                   <BiToogleButton
                             data={[true, false]}
                             title={["sell stocks", "sell crypto"]}
                             valueSort={isSellStocks}
                             setSortToggle={setIsSellStocks}
                           />
                </div>
               
               <p className="absolute -top-20 ">{defaultTypeTransaction}</p>
               <div className=" gap-5 flex flex-row  ">
     
                 {
                   cards.map((e, i) => (
                     <div 
                     onClick={() => setIsAmount(e.value)}
                     key={i} className={`w-3/4 bg-white min-h-12 border-4 p-2  rounded-md shadow  ${e.isSelected ? "  border-blue-200 " : "border-transparent "}`}>
                       <p className=" " > <span className="font-semibold text-xl">{ e.title}</span></p>
                        <p className={`font-md text-3xl text-gray-700 text-end ${ (e.isSelected && animate) ? "scale-103 opacity-70 pr-px " : "scale-100 opacity-100"
                         }`}>{e?.element?.amount}</p>
                     </div>))
                 }
     
               </div>
               <div className="flex flex-wrap gap-2 overflow-auto  w-full  h-20 rounded-md p-2 overflow-y-auto w-full  ">
                {
                  subcategoriesData.map(sc => {
                    if (isSellStocks && !sc.category.includes("stocks")) return null;
                    if (!isSellStocks && !sc.category.includes("crypto")) return null;
                    console.log(sc)
                    
                    return (<SubCategortCardForList sc={sc} editSubCategory={()=>addCategory(sc.title)} size="M" showColor={allCategories.includes(sc.title)}  />)})
                }
               </div>
             </section>
     
             <Keyboard triggerAnimation={triggerAnimation}
               createTransaction={makeTransiction}
               dataTransaction={isAmount ? amountAssect : profitAssect}
               setDataTransaction=
               {isAmount ? setAmountAssect : setProfitAssect} 
               buttonOptions={{title:"Move Savings",path:VALID_ROUTES.internalTransactions}}
               />
           </section>
     </Layout>
    )
}