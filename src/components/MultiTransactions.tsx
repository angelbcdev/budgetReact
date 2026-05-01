import {Layout} from "../UI/Layout";
import HeatherView from "../UI/HeatherView";
import { useState } from "react";
import { allIcons } from "../UI/allIicons";



const MultiTransactions = ()=>{
    const [numberTransactions , setNumberTransactions] = useState(2)
    const maxRow = 10
    const minRow = 2

    const handleAddRow =()=>{
            setNumberTransactions(numberTransactions + 1 <= maxRow ? numberTransactions + 1 :  numberTransactions)
    }
    const handleDeleteRow =()=>{
        setNumberTransactions(numberTransactions - 1 >= minRow ? numberTransactions - 1 :  numberTransactions)
    }
    return(
        <Layout>
            <HeatherView title="Multi Transactions" />
            <section className="pt-4 max-w-94 flex flex-col gap-4 justify-center bg-red-300 mx-auto ">
                <section className="flex bg-white  rounded-md px-4 py-2 gap-2 justify-between ">
                    <p>{numberTransactions}/{maxRow} </p>
                    <label>
                        <input  type="date"/>
                    </label>
                    <div className="border w-20 flex p-px rounded-md text-gray-600 gap-px bg-gray-400">
                        <button onClick={handleAddRow} className="w-1/2 bg-gray-100 rounded-l-sm" >{"+"}</button>
                        <button onClick={handleDeleteRow} className="w-1/2 bg-gray-100 rounded-r-sm" >{"-"}</button>
                    </div>
                </section>
                <section className="flex bg-white flex-col rounded-md px-4 py-2 gap-2 ">
                {
                    new Array(numberTransactions).fill(0).map((_,i)=>(
                        <div key={i}>hellos</div>
                    ))
                }
            </section>

            </section>
       </Layout>
    )
}


export default MultiTransactions 