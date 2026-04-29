


import { useState } from "react";
import { categoryMeta } from "../Models/dummyData";
import { useBudgetContext } from "../provide/budget";
import { allIcons } from "../UI/allIicons";
import { Layout } from "../UI/Layout";


/**
 * 
 * TODO:
 * - move monee mor morger account and may morgage
 * - payment of card red and blue
 * - savings goals
 *  - view for transaction and deleted option
 * 
 * 
 */

const SubCuantity = ({icon, title, cuantity}: {icon: JSX.Element, title: string, cuantity: number}) => {
  return(
   <div>
            
            <div className="flex flex-row gap-1">
             {icon}
              {title}
            </div>
            <span className="text-2xl font-medium ">${cuantity}</span>
        </div>
  )
}

const BudgetHome = () => {
  const { summaryHomeData } = useBudgetContext();
  const [sortAsc, setSortAsc] = useState(true);





  const dataCards = [
    {
      title: "Card Red",
      cuantity: summaryHomeData.totalCardRed.toFixed(2),
      color: "#FF0000"
    },
    {
      title: "Card blue",
      cuantity: summaryHomeData.totalCardBlue.toFixed(2),
      color: "#0000FF"
    }
  ]
  const dataSavingsGoals = [
    {
      title: "Morgage Savings Goal",
      cuantity: summaryHomeData.savingMorgage.toFixed(2),
      Total: 1400,
      
    },
    {
      title: "Savings DCU",
      cuantity: summaryHomeData.savingBank.toFixed(2),
      Total: 300,
      
    },
    {
      title: "Stocks Market",
      cuantity: summaryHomeData.savingsStocks.toFixed(2),
      Total: 200,
    },
    
    {
      title: "crypto Currency",
      cuantity: summaryHomeData.savingsCrypto.toFixed(2),
      Total: 100,
      
    }
  ]
  const dataByCategory = Object.keys(summaryHomeData.databyCatefory).map((category) => ({ category, cuantity: summaryHomeData.databyCatefory[category as keyof typeof summaryHomeData.databyCatefory]
    
  }))

  return(
    <Layout>
      <main className="flex flex-col gap-4   w-98 mx-auto">
      <div className="flex flex-row gap-4 pl-2 pt-4  relative w-44">
        <h3 className="text-5xl font-bold ">{summaryHomeData.month}</h3>
      <h6 className="text-2xl font-light text-gray-600 absolute right-0 bottom-0 "> {summaryHomeData.year}</h6>
      </div>
      <section className="flex flex-col  gap-2  bg-linear-to-l to-blue-500 from-blue-800 h-50 p-4 text-white rounded-2xl  shadow-md">
        <div className="flex flex-row gap-2">
          {allIcons.wallet}
          <span className="text-mediumd font-bold ">Total Balance</span>
        </div>
        <p className="text-4xl font-bold ">${summaryHomeData.totalBalance}</p>
        <div className="bg-white h-px w-[90%] rounded mx-auto"></div>
        <div className="flex flex-row  gap-20">
        
          <SubCuantity icon={allIcons.tredingUp} title="Income" cuantity={summaryHomeData.totalIncome} />
      
          <SubCuantity icon={allIcons.trendingDown} title="Expenses" cuantity={summaryHomeData.totalExpenses} />
      

      </div>
        </section>
        <section className="flex flex-col gap-4  h-100 overflow-scroll ">
        <section>
          <div >
            <p className="text-xl text-gray-800 font-md pl-2 ">Cash Flow  </p>
            <div className="flex flex-row gap-2 justify-center pt-2 ">
              {
                dataCards.map((card) => {

                 
      
                  return(
                  <div  key={card.title} className={`flex flex-col justify-center gap-2 w-full bg-white  pl-2 py-2 border border-gray-100 rounded-lg shadow-sm text-gray-800`}>
                    <div className="text-sm flex flex-row items-center gap-2 font-black " ><span  className="text-xl">{ allIcons.creditCard}</span> {card.title}</div>
                    <p className="pl-9  ">${card.cuantity}</p>
                  </div>
                )})
              }
              

            </div>
          </div>

        </section>

         <section>
          <div>
            <p className="text-xl text-gray-800 font-md pl-2  ">Savings Goals  </p>
            <div className="grid grid-cols-2 grid-rows-2 gap-2 justify-center pt-2 ">
              {
                dataSavingsGoals.map((card) => {
                    let percentage = (card.cuantity / card.Total) * 100
                     
                    if (percentage > 100) {
                      percentage = 100
                    }
                  
                  return (
                  <div  key={card.title} className={`flex flex-col justify-center gap-1 w-full p-2 rounded-lg shadow-lg bg-white`}>
                    <p className="text-sm font-semibold ">{card.title}</p>
                    <div className="w-full h-2 bg-linear-to-t from-gray-400 to-gray-300 rounded-2xl relative m-1 shadow-xl">
                      <div style={{width: `${percentage}%`}} className=" h-full bg-linear-to-t   from-blue-600 to-blue-200 rounded-full relative" ></div>
                    </div>
                    <p className="text-sm text-gray-600 text-right font-light ">${card.cuantity} / ${card.Total}</p>
                  </div>
                )})
              }
              

            </div>
          </div>

        </section>

          <section>
            <div className="flex flex-row justify-between mb-4">
              <p className="text-xl text-gray-800 font-md pl-2  mb-2">By Categories  </p>

              <div className="flex bg-gray-400 rounded-md p-px h-6">
              
              {
                [true , false].map((f, i) => (
                  <button
                    key={i}
                    onClick={() => setSortAsc(f)}
                    className={` text-[12px] w-14 rounded-sm  whitespace-nowrap transition overflow-hidden
                    ${
                      f === sortAsc
                        ? "bg-green-500 text-white "
                        : " text-gray-900"
                    }`}
                  >
                    {f ? "↓" : "↑"}
                  </button>
                ))
              }
            </div>
            </div>
            
            <div className="flex flex-col  justify-center  rounded-2xl overflow-hidden  w-97 border mx-auto border-gray-200 ">
              {

                dataByCategory.sort((a, b) => {
                  
                  if (sortAsc) {
                    return b.cuantity - a.cuantity
                  }else {
                    return a.cuantity - b.cuantity
                  }
                  
                  
                }) && dataByCategory.map((c) => {
                const meta = categoryMeta[c.category as keyof typeof categoryMeta] || {
                icon: "💳",
                bg: "bg-gray-100",
                };
                  const cuantity = c.cuantity
                  if (cuantity === 0) {
                    return null;
                  }
                  return(
                  <div  key={c.category} className={`flex flex-row justify-between gap-2 w-full  bg-white  pl-2 py-2 border border-gray-100  shadow-sm text-gray-800`}>
                      
                      <div className="flex flex-row items-center gap-2 ">
                        <div
                    className={`w-10 h-10 flex items-center justify-center rounded-full ${meta.bg}`}
                  >
                    <span className="text-lg">{meta.icon}</span>
                        </div>
                        <p className="pl-  ">{c.category}</p>
                      </div>
                      
                      
                      <p className="pr-10  ">${cuantity.toFixed(2)}</p>
                  </div>
                )}) 
                }


            </div>
            <div className="h-20"></div>
            
          </section>

       </section>
      
     </main>
    </Layout>
    )
};

export default BudgetHome; 