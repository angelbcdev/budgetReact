import { getSheetData, sendSheetData } from "../api";

import { useBookContext } from "../provide/budget";
import { Layout } from "../UI/Layout";



const BudgetHome = () => {
  const { title } = useBookContext();


  const sendTestData = () => {
    console.log("sendTestData");
    getSheetData("Spending3").then((data) => console.log(data));
    
    // sendSheetData( );
  }
  
  return(
    <Layout>
      <p>BudgetHome-- {title} </p>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={sendTestData}>click</button>
    </Layout>
    )
};

export default BudgetHome; 