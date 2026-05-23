import { useState, type SetStateAction } from "react"
import HeatherView from "../../UI/HeatherView"
import { Layout } from "../../UI/Layout"
import type { ITransaction } from "../AddNewTransactions"
import { Keyboard } from "../addNewTransactions/Keyboard"
import { emptyNewTransactions } from "../addNewTransactions/helpers"
import type { TransactionType } from "../../Models/dummyData"


export interface IKeyboardEdditable {
    amount:string
}

export const SavaingsMovement = ()=>{
        const [defaultTypeTransaction , setDefaultTypeTransaction ]= useState<TransactionType>("transaction_savings_to_mortgage")
      const [dataTransaction, setDataTransaction] = useState<ITransaction>({
  
        ...emptyNewTransactions({ defaultCategory:"moneyTransactions" , defaultTypeTransaction })
      });
      const [fromAccountValue , setFromAccountValue]= useState({amount:"0"})
      const [toAccountValue , setToAccountValue]= useState({amount:"0"})

      const isToMortgage = defaultTypeTransaction == "transaction_savings_to_mortgage"
      const isSelecteFrom = true
      const changeType = ()=>{
        setDefaultTypeTransaction(defaultTypeTransaction == "transaction_savings_to_mortgage" ?"transaction_mortgage_to_savings" :"transaction_savings_to_mortgage")
      }
    return(
    <Layout>
     <HeatherView title="Savaings Movements" />

     <section>
        <section className="h-64 p-4 relative">
            <button onClick={changeType} className="absolute top-1/2 left-1/2  size-20 bg-gray-400 -translate-x-1/2 -translate-y-1/2 rounded-full">Press</button>
            <p>{defaultTypeTransaction}</p>
          <div className=" gap-8 flex flex-col ">
              {[fromAccountValue, toAccountValue].map((e, i) =>{
            return(
            <div key={i} className="w-full bg-red-200 h-23">
                <p>{  i == 0 ? isToMortgage ? "Savings" : "Morgage" : !isToMortgage ? "Savings" : "Morgage"}</p>
               <p>{e.amount}</p> 
            </div>
            )
            })}
          </div>
        </section>

        <Keyboard triggerAnimation={()=>{}} 
        createTransaction={()=>{}}
         dataTransaction={fromAccountValue}
          setDataTransaction=
         {setFromAccountValue} />
     </section>
     </Layout>
    )
}