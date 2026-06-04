


import {  useState } from "react";
import { useBudgetContext } from "../provide/budget";
import { allIcons } from "../UI/allIicons";
import { Layout } from "../UI/Layout";

import { DataShowListCategory } from "../UI/DataShowListCategory";
import {  useNavigate } from "react-router";
import { VALID_ROUTES } from "../Routes/routes";
import BlurContainer from "../UI/BlurContainer";





const SubCuantity = ({icon, title, cuantity}: {icon: any, title: string, cuantity: number}) => {
  return(
   <div>
            
            <div className="flex flex-row gap-1">
             {icon}
              {title}
            </div>
            <span className="text-2xl font-medium ">${Number(cuantity).toFixed(2)}</span>
        </div>
  )
}

const BudgetHome = () => {
  const { summaryHomeData  ,curentDate ,global ,currentMonthGoals } = useBudgetContext();
  const [sortAsc, setSortAsc] = useState(true);
  const navigate = useNavigate(); 
  // const safeSummary = summaryHomeData ?? null;

  
  // if (!safeSummary ) {
  // return <Layout>Loading...</Layout>;
  // }
  

   



  const dataCards = [
    {
      title: "Card Red",
      cuantity: global?.totalCardRed.toFixed(2) ?? 0,
      color: "#FF0000"
    },
    {
      title: "Card blue",
      cuantity: global?.totalCardBlue.toFixed(2) ?? 0,
      color: "#0000FF"
    }
  ]


 

  const dataSavingsGoals = [
    {
      title: "Mortgage Savings Goal",
      cuantity: Number(summaryHomeData?.savingsMortgage.toFixed(2)) > 0 ? summaryHomeData?.savingsMortgage.toFixed(2) : 0,
      Total: currentMonthGoals?.savingsMortgage.toFixed(2) ?? 0,
      
    },
    {
      title: "Savings DCU",
      cuantity:  Number(summaryHomeData?.savingsBank.toFixed(2)) > 0 ? summaryHomeData?.savingsBank.toFixed(2) : 0,
      Total: currentMonthGoals?.savingsBank.toFixed(2) ?? 0,
      
    },
    {
      title: "Stocks Market",
      cuantity: Number(summaryHomeData?.savingsStocks.toFixed(2)) > 0 ? summaryHomeData?.savingsStocks.toFixed(2) : 0,
      Total: currentMonthGoals?.savingsStocks.toFixed(2) ?? 0,
    },
    
    {
      title: "crypto Currency",
      cuantity: Number(summaryHomeData?.savingsCrypto.toFixed(2)) > 0 ? summaryHomeData?.savingsCrypto.toFixed(2) : 0,
      Total: currentMonthGoals?.savingsCrypto.toFixed(2) ?? 0,
      
    }
  ]
  const dataByCategory =  Object.entries(summaryHomeData?.databyCatefory ?? {}).map(([category, cuantity]) => ({ category, cuantity })) 
    
   

  

  const manualNavigation = () => {
    navigate(VALID_ROUTES.graph ,{ state: { data: "GENERAL" } }) 
  }
 
  return(
    <Layout>
      <main className="flex flex-col    w-98 sm:w-160 mx-auto">
        <div className="flex flex-row justify-between items-end mb-4 ">

      <div className="flex flex-row gap-4 pl-2 pt-4  relative w-44 items-center ">
        <h3 className="text-5xl font-bold ">{curentDate.month}</h3>
        <h6 className="text-2xl font-light text-gray-600 relative  top-3"> {curentDate.year}</h6>
      </div>
          
        </div>
        
        <section
          onClick={manualNavigation}
          className="flex flex-col  gap-2  bg-linear-to-l to-blue-500 from-blue-800 h-50 p-4 text-white rounded-2xl  shadow-md">
          <div className="flex flex-row justify-between">
            <div>
                 <p className="flex flex-row gap-2">
          {allIcons.wallet}
          <span className="text-mediumd font-bold ">Total Balance</span>
          </p>
          
        <p className="text-4xl font-bold ">${global?.totalBalance.toFixed(2) ?? 0}</p>
            </div>
            
              <div className="flex flex-col justify-center items-center relative right-16">
                 <p className="flex flex-row gap-2">
        
          <span className="text-mediumd  ">Total cash</span>
          </p>
          
        <p className="text-xl  ">${global?.totalCash.toFixed(2) ?? 0}</p>
         </div>
        </div>
        <div className="bg-white h-px w-[90%] rounded mx-auto"></div>
        <div className="flex flex-row  gap-20 justify-between sm:pr-40 pr-10 ">
        
          <SubCuantity icon={allIcons.tredingUp} title="Income" cuantity={summaryHomeData?.totalIncome ?? 0} />
      
          <SubCuantity icon={allIcons.trendingDown} title="Expenses" cuantity={summaryHomeData?.totalExpenses ?? 0} />
      

      </div>
        </section>


        <section className="flex flex-col gap-4  h-125 overflow-scroll   relative ">
        
          <BlurContainer size={10}   />
          {/* Cash Flow */}
        <section>
          <div className="" >
            <p className="text-xl text-gray-800 font-md pl-2 ">Cash Flow  </p>
            <div className="flex flex-row gap-2 justify-center pt-2 ">
              {
                dataCards.map((card) => {

                  const isPositive = Number(card.cuantity) > 0
                  const numberToFixed = Math.abs(Number(card.cuantity)).toFixed(2)
      
                  return(
                  <div  key={card.title} className={`flex flex-col justify-center gap-2 w-full bg-white  pl-2 py-2 border border-gray-100 rounded-lg shadow-sm text-gray-800`}>
                    <div className="text-sm flex flex-row items-center gap-2 font-black " ><span  className="text-xl">{ allIcons.creditCard}</span> {card.title}</div>
                    <p className={`text-xl  ${isPositive ? "text-red-500" : "text-green-500"} pl-9  `}>$ {numberToFixed}</p>
                  </div>
                )})
              }
              

            </div>
          </div>

          </section>
          {/* Savings Goals */}
         <section>
          <div>
            <p className="text-xl text-gray-800 font-md pl-2  ">Savings Goals  </p>
            <div className="grid grid-cols-2 grid-rows-2 gap-2 justify-center pt-2 ">
              {
                dataSavingsGoals.map((card) => {
                    let percentage = (Number(card.cuantity) / Number(card.Total)) * 100
                     
                    if (percentage > 100) {
                      percentage = 100
                    }else if (percentage < 0) {
                      percentage = 0
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
              {/* Categories speends */}
         
          <DataShowListCategory  title="By Categories" sizeScroll={150} showSort data={dataByCategory} valueSort={sortAsc} setSortToggle={setSortAsc} />
          
                {/* Globals Savings */}


       </section>
      
     </main>
    </Layout>
    )
};

export default BudgetHome; 


