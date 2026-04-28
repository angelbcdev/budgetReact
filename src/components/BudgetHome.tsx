


import { useBookContext } from "../provide/budget";
import { allIcons } from "../UI/allIicons";
import { Layout } from "../UI/Layout";




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
    year: 2026,
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
      title: "Checking ",
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
      <main className="flex flex-col gap-4   w-98 mx-auto">
      <div className="flex flex-row gap-4 pl-2 pt-4  relative w-44">
        <h3 className="text-5xl font-bold ">{data.month}</h3>
      <h6 className="text-2xl font-light text-gray-600 absolute right-0 bottom-0 "> {data.year}</h6>
      </div>
      <section className="flex flex-col  gap-2  bg-linear-to-l to-blue-500 from-blue-800 h-50 p-4 text-white rounded-2xl  shadow-xl">
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
                dataCards.map((card) => {

                  const gradientStyle = {
                        fontSize: '20px',
                    fontWeight: 'bold',
                        background: `linear-gradient(to left,  ${card.color +90} ,${card.color +68} )`,
                  
                      };
      
                  return(
                  <div style={gradientStyle} key={card.title} className={`flex flex-col justify-center gap-2 w-full  pl-2 py-2 rounded-lg shadow-xl text-[#1d1d1d]`}>
                    <div className="text-sm flex flex-row items-center gap-2 font-black " ><span  className="text-2xl">{ allIcons.creditCard}</span> {card.title}</div>
                    <p className="pl-2  ">${card.cuantity}</p>
                  </div>
                )})
              }
              

            </div>
          </div>

        </section>

         <section>
          <div>
            <p className="text-xl font-bold pl-2 ">Savings Goals  </p>
            <div className="grid grid-cols-2 grid-rows-2 gap-2 justify-center pt-2 ">
              {
                dataSavingsGoals.map((card) => {
                    
                                      
                  
                  return (
                  <div  key={card.title} className={`flex flex-col justify-center gap-1 w-full p-2 rounded-lg shadow-lg bg-white`}>
                    <p className="text-sm font-bold ">{card.title}</p>
                    <div className="w-full h-2 bg-linear-to-t from-gray-500 to-gray-300 rounded-2xl relative m-1 shadow-xl">
                      <div style={{width: `${(card.cuantity / card.Total) * 100}%`}} className=" h-full bg-linear-to-t   from-green-600 to-green-400 rounded-2xl relative" ></div>
                    </div>
                    <p className="text-sm text-gray-600 text-right font-light ">${card.cuantity} / ${card.Total}</p>
                  </div>
                )})
              }
              

            </div>
          </div>

        </section>
      
     </main>
    </Layout>
    )
};

export default BudgetHome; 