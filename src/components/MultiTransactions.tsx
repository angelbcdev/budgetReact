import {Layout} from "../UI/Layout";
import HeatherView from "../UI/HeatherView";
import {  useState } from "react";

import type { ITransaction } from "./AddNewTransactions";
import { allCategoryAvailable, paymentMethodAvailable, typeTransactionAvailable, type Category, type PaymentMethod, type TransactionType } from "../Models/dummyData";





interface IMultiTrnsaction {
    amount: string;
  category: Category;
  type: TransactionType;
  paymentMethod: PaymentMethod;
  title: string | null;
  description: string;
}

const emptyData:IMultiTrnsaction={
    amount:"",
    title:"",
    description:"",
    category:"other",
    type:"spending",
    paymentMethod:"credit_card_blue",
  
}
//TODO:ITransaction
const MultiTransactions = ()=>{
    const [numberTransactions , setNumberTransactions] = useState(4)
    const [allNewsTransactions , setAllNewTransactions] = useState<IMultiTrnsaction[]>([emptyData , emptyData])
    const maxRow = 10
    const minRow = 2

    const handleRows =(action:"+"|"-")=>{
        const isAdd = action == "+"
        if (isAdd && numberTransactions + 1 <= maxRow){
            setNumberTransactions( numberTransactions + 1 )
            setAllNewTransactions([...allNewsTransactions , emptyData])
            return
        }
         if (!isAdd && numberTransactions - 1 >= minRow){
            const oldData = [...allNewsTransactions]
            oldData.pop()
            setAllNewTransactions(oldData)
            setNumberTransactions( numberTransactions - 1 )
            return
        }
          
    }
   

    const createMultipleTransactions = ()=>{
        console.log(allNewsTransactions)
    }
    return(
        <Layout>
            <HeatherView title="Multi Transactions" />
            <section className="pt-4 relative max-w-94 flex flex-col gap-4 justify-center  mx-auto  ">
                <section className="flex   rounded-md px-4 py-2 gap-2 justify-between bg-white  ">
                    <p>{numberTransactions}/{maxRow} </p>
                    <label className="border rounded px-1 shadow-sm bg-white">
                        <input  type="date"/>
                    </label>
                    <div className="border w-20 flex p-px rounded-md text-gray-600 gap-px bg-gray-400">
                        <button onClick={()=> handleRows("+")} className="w-1/2 bg-gray-100 rounded-l-sm" >{"+"}</button>
                        <button onClick={()=> handleRows("-")} className="w-1/2 bg-gray-100 rounded-r-sm" >{"-"}</button>
                    </div>
                    
                </section>
                <section className="flex  flex-col   pb-10 gap-2 overflow-y-auto rounded-xl h-120  ">
                <div className="bg-white rounded-md px-4">
                    {
                    new Array(numberTransactions).fill(0).map((_,i)=>(
                       <RowNewTransactions key={crypto.randomUUID()} positionInList={i}/>
                    ))
                     }
              
                </div>
               
                </section>
                <button
                        // disabled={!isReadyToSubmit}
                        onClick={createMultipleTransactions}
                        className={`mt-2 absolute -bottom-4 left-18 mx-auto h-10 w-60 ${true ? "bg-blue-400 active:bg-blue-600 active:scale-95 text-white" : "bg-gray-200 text-gray-500"}  rounded-lg text-base font-semibold  transition-all ease-in duration-100 `}
                    >
                        Add Transaction
                    </button>
                

            </section>
       </Layout>
    )
}


export default MultiTransactions 




//   date: Date; [X]
//   subcategory: Subcategory[]; [X] leave empty

// 


const RowNewTransactions = ({positionInList}:{positionInList:number}) => {
   
    return (
        <div className="border-b border-black/10 h-40 gap-3 w-82 flex flex-col py-2">
            
            <div className="flex  gap-2">
                <p className=" w-12 text-3xl font-bold text-center pt-3">{positionInList + 1}</p>
               <MyInputText name="title"/>
               <MyInputText name="description"/>
            </div> 
            <div className="flex  gap-2">
                <MySelector data={typeTransactionAvailable} name="type"/> 
                <MySelector data={paymentMethodAvailable}  name="Pay"/>
                <MySelector data={allCategoryAvailable}  name="category"/>
                 
            </div> 
            <div className=" flex flex-row  justify-between h-40  items-end relative">
                    <span></span>
                <label className="flex gap-4">
                    <p>Amount:</p>
                    <input className="border border-gray-400 w-27 px-2" placeholder="$10,000.00" type="number"/>
                </label>
            </div>
        </div>
    );



}



const MySelector = ({ name, data }: { name: string; data: string[] }) => {
  const [value, setValue] = useState("");

  return (
    <section className="flex flex-col gap-1  relative group">
      <span className=" 2 text-sm transition-all duration-200  
        pointer-events-none text-gray-500
        
        group-focus-within:-top-px text-xs group-focus-within:text-blue-500 group-focus-within:bg-white">
        {name}
      </span>

      <select
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="border border-gray-300 w-26 px-1"
      >
        <option value=""  >
          
        </option>

        {data.map((selectOption) => (
          <option key={crypto.randomUUID()} value={selectOption}>
            {selectOption}
          </option>
        ))}
      </select>
    </section>
  );
};


const MyInputText = ({name}:{name:string})=>{

    return(     
    <label className="flex flex-col gap-1  relative group">
        <span className=" left-2 text-sm transition-all duration-200  
            pointer-events-none text-gray-500
            
            group-focus-within:-top-px text-xs group-focus-within:text-blue-500 group-focus-within:bg-white">
            {name}
        </span>
        <input 
                
            className="border-gray-300 border rounded-sm h-6 w-34 bg-transparent px-2 py-1 outline-none focus:border-blue-500" 
            type="text" 
            name="title"
        />
    </label>)
}