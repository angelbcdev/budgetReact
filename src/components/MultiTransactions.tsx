import {Layout} from "../UI/Layout";
import HeatherView from "../UI/HeatherView";
import { useRef, useState } from "react";
import { allIcons } from "../UI/allIicons";
import type { ITransaction } from "./AddNewTransactions";








const MultiTransactions = ()=>{
    const [numberTransactions , setNumberTransactions] = useState(4)
    const [allNewsTransactions , setAllNewTransactions] = useState<ITransaction[]>([])
    const maxRow = 10
    const minRow = 2

    const handleAddRow =()=>{
            setNumberTransactions(numberTransactions + 1 <= maxRow ? numberTransactions + 1 :  numberTransactions)
    }
    const handleDeleteRow =()=>{
        setNumberTransactions(numberTransactions - 1 >= minRow ? numberTransactions - 1 :  numberTransactions)
    }

    const createMultipleTransactions = ()=>{
        console.log(allNewsTransactions)
    }
    return(
        <Layout>
            <HeatherView title="Multi Transactions" />
            <section className="pt-4 max-w-94 flex flex-col gap-4 justify-center  mx-auto  ">
                <section className="flex   rounded-md px-4 py-2 gap-2 justify-between bg-white  ">
                    <p>{numberTransactions}/{maxRow} </p>
                    <label className="border rounded px-1 shadow-sm bg-white">
                        <input  type="date"/>
                    </label>
                    <div className="border w-20 flex p-px rounded-md text-gray-600 gap-px bg-gray-400">
                        <button onClick={handleAddRow} className="w-1/2 bg-gray-100 rounded-l-sm" >{"+"}</button>
                        <button onClick={handleDeleteRow} className="w-1/2 bg-gray-100 rounded-r-sm" >{"-"}</button>
                    </div>
                </section>
                <section className="flex bg-white flex-col rounded-md px-4 py-2 gap-2 overflow-scroll  max-h-100">
                {
                    new Array(numberTransactions).fill(0).map((_,i)=>(
                       <RowNewTransactions key={i}/>
                    ))
                }
            </section>

                {/* createMultipleTransactions */}

                <button
        // disabled={!isReadyToSubmit}
        onClick={createMultipleTransactions}
        className={`mt-2  mx-auto h-10 w-60 ${false ? "bg-blue-400 active:bg-blue-600 active:scale-95 text-white" : "bg-gray-200 text-gray-500"}  rounded-lg text-base font-semibold  transition-all ease-in duration-100 `}
      >
        Add Transaction
      </button>

            </section>
       </Layout>
    )
}


export default MultiTransactions 



// 
//   title: string | null;[X]
//   description: string;[X]
//   date: Date; [X]
//   amount: string;
//   category: Category;
//   type: TransactionType;
//   paymentMethod: PaymentMethod;
//   subcategory: Subcategory[]; [X] leave empty
// 


const RowNewTransactions = () => {
   
    return (
        <div className="border-b border-black/10 h-30 gap-3 flex flex-col pt-2">
            <div className="flex  gap-2">
               <MyInputText name="title"/>
               <MyInputText name="description"/>
            </div> 
            <div className="flex  gap-2">
                <MySelector/>
                <MySelector/>
                <MySelector/>
            </div>
            <div className=" flex  items-center bg-red-300">
                <label>
                    <input className="border border-gray-400" type="number"/>
                </label>
            </div>
        </div>
    );



}

const MySelector =()=>{
    return(
        <select className="border border-gray-300 w-26 px-1">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
        </select>
    )
}


const MyInputText = ({name}:{name:string})=>{

    return(     <label className="flex gap-2 relative group">
                    <span className="absolute left-2 text-sm transition-all duration-200  
                        pointer-events-none text-gray-500
                        top-1/2 -translate-y-1/2 
                        group-focus-within:-top-px group-focus-within:text-xs group-focus-within:text-blue-500 group-focus-within:bg-white">
                        {name}
                    </span>
                    <input 
                         
                        className="border-gray-300 border rounded-md h-6 w-34 bg-transparent px-2 py-1 outline-none focus:border-blue-500" 
                        type="text" 
                        name="title"
                    />
                </label>)
}