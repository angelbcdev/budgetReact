


import { useBookContext } from "../provide/budget";
import { Layout } from "../UI/Layout";

const allIcons = {
  creditCard:<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-credit-card-pay"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 19h-6a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v4.5" /><path d="M3 10h18" /><path d="M16 19h6" /><path d="M19 16l3 3l-3 3" /><path d="M7.005 15h.005" /><path d="M11 15h2" /></svg>,
  trendingDown:<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-trending-down"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 7l6 6l4 -4l8 8" /><path d="M21 10l0 7l-7 0" /></svg>,
  tredingUp:<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-trending-up"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 17l6 -6l4 4l8 -8" /><path d="M14 7l7 0l0 7" /></svg>
  ,wallet:<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-wallet"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M17 8v-3a1 1 0 0 0 -1 -1h-10a2 2 0 0 0 0 4h12a1 1 0 0 1 1 1v3m0 4v3a1 1 0 0 1 -1 1h-12a2 2 0 0 1 -2 -2v-12" /><path d="M20 12v4h-4a2 2 0 0 1 0 -4h4" /></svg>
}


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
  // const { _ } = useBookContext();



  const data = {
    month: "April",
    year: 2023,
    totalBalance: 2000.89,
    totalIncome: 1500.02,
    totalExpenses: 500.13

  }

  const dataCards = [
    {
      title: "Card Red",
      cuantity: 1500.02,
      color: "#FF0000"
    },
    {
      title: "Card blue",
      cuantity: 500.13,
      color: "#0000FF"
    },
    {
      title: "Card green",
      cuantity: 500.13,
      color: "#00FF00"
    }
  ]
  const dataSavingsGoals = [
    {
      title: "Morgage Savings Goal",
      cuantity: 700.02,
      Total: 1400,
      
    },
    {
      title: "Savings DCU",
      cuantity: 150.00,
      Total: 300,
      
    },
    {
      title: "Stocks Market",
      cuantity: 150.00,
      Total: 200,
    },
    
    {
      title: "Cripto Currency",
      cuantity: 100.00,
      Total: 100,
      
    }
  ]
  
  return(
    <Layout>
      <main className="flex flex-col gap-4 ">
      <div className="flex flex-row gap-4 pl-2 items-center">
        <h3 className="text-4xl font-bold ">{data.month}</h3>
      <h6 className="text-3xl font-light text-gray-600 "> {data.year}</h6>
      </div>
      <section className="flex flex-col  gap-2  bg-linear-to-l to-blue-500 from-blue-800 h-50 p-4 text-white rounded-2xl ">
        <div className="flex flex-row gap-2">
          {allIcons.wallet}
          <span className="text-mediumd font-bold ">Total Balance</span>
        </div>
        <p className="text-4xl font-bold ">${data.totalBalance}</p>
        <div className="bg-white h-px w-[90%] rounded mx-auto"></div>
        <div className="flex flex-row  gap-20">
        
          <SubCuantity icon={allIcons.tredingUp} title="Income" cuantity={data.totalIncome} />
      
          <SubCuantity icon={allIcons.trendingDown} title="Expenses" cuantity={data.totalExpenses} />
      

      </div>
        </section>
        <section>
          <div>
            <p className="text-xl font-bold pl-2 ">Cash Flow  </p>
            <div className="flex flex-row gap-2 justify-center pt-2 ">
              {
                dataCards.map((card) => (
                  <div style={{borderColor: card.color +80, backgroundColor: card.color +90}} key={card.title} className={`flex flex-col justify-center gap-2 w-full border pl-2 py-2 rounded-lg shadow-lg`}>
                    <div className="text-sm flex flex-row items-center gap-2 font-black " ><span  className="text-2xl">{ allIcons.creditCard}</span> {card.title}</div>
                    <p className="pl-2  ">${card.cuantity}</p>
                  </div>
                ))
              }
              

            </div>
          </div>

        </section>

         <section>
          <div>
            <p className="text-xl font-bold pl-2 ">Savings Goals  </p>
            <div className="grid grid-cols-2 grid-rows-2 gap-2 justify-center pt-2 ">
              {
                dataSavingsGoals.map((card) => (
                  <div  key={card.title} className={`flex flex-col justify-center gap-1 w-full border p-2 rounded-lg shadow-lg bg-white`}>
                    <p className="text-sm font-bold ">{card.title}</p>
                    <div className="w-full h-2 bg-linear-to-t from-gray-500 to-gray-300 rounded-2xl relative m-1 shadow-2xl">
                      <div style={{width: `${(card.cuantity / card.Total) * 100}%`}} className=" h-full bg-linear-to-t   from-green-600 to-green-400 rounded-2xl relative" ></div>
                    </div>
                    <p className="text-sm text-gray-600 text-right font-light ">${card.cuantity} / ${card.Total}</p>
                  </div>
                ))
              }
              

            </div>
          </div>

        </section>
      
     </main>
    </Layout>
    )
};

export default BudgetHome; 