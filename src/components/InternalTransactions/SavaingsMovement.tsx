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
      const [fromAccountValue , setFromAccountValue]= useState({amount:""})
      const [toAccountValue , setToAccountValue]= useState({amount:""})
      const [isSelecteFrom , SetIsSelecteFrom] = useState(true)

      const isToMortgage = defaultTypeTransaction == "transaction_savings_to_mortgage"
   
      const changeType = ()=>{
        setDefaultTypeTransaction(defaultTypeTransaction == "transaction_savings_to_mortgage" ?"transaction_mortgage_to_savings" :"transaction_savings_to_mortgage")
        SetIsSelecteFrom(true)
        setFromAccountValue({amount:""})
        setToAccountValue({amount:""})
      }


      const cards = [
        {
            element: fromAccountValue,
            option:isSelecteFrom,
            value:true,
            title:{
                a:"Savings",
                b:"Mortgage"
            }
},

      {
            element:toAccountValue,
            option:!isSelecteFrom,
            value:false,
            title:{
                a:"Mortgage",
                b:"Savings",
            }
}]

    return(
    <Layout>
     <HeatherView title="Savaings Movements" />

     <section>
        <section className="h-64 p-4 relative flex  flex-col gap-4">
            <button onClick={changeType} className="absolute top-1/2 left-1/2  size-20 bg-gray-400 -translate-x-1/2 -translate-y-1/2 rounded-full">Press</button>
            <p>{defaultTypeTransaction}</p>
          <div className=" gap-5 flex flex-col ">

            {
                cards.map((e,i)=>( 
                <div key={i} onClick={()=>SetIsSelecteFrom(e.value)}  className={`w-full bg-white h-20 border-4  rounded-md  ${e.option ? "  border-blue-500 " : "border-transparent "}`}>
                <p>from:{isToMortgage ? e.title.a :e.title.b}</p>
               <p>{e.element.amount}</p> 
            </div>))
            }

          </div>
        </section>

        <Keyboard triggerAnimation={()=>{}} 
        createTransaction={()=>{}}
         dataTransaction={isSelecteFrom ?fromAccountValue : toAccountValue}
          setDataTransaction=
         {isSelecteFrom ? setFromAccountValue : setToAccountValue} />
     </section>
     </Layout>
    )
}