import {Layout} from "../UI/Layout";
import HeatherView from "../UI/HeatherView";
import { useLocation, useNavigate } from "react-router";

import {  TRANSACTION_TYPE_META } from "../Models/dummyData";
import type { Transaction } from "../Models/DataTransactions";
import { allIcons } from "../UI/allIicons";
import { useEffect, type JSX } from "react";
import BlurContainer from "../UI/BlurContainer";
import { SubCategoryCard } from "../UI/SubCategoryCard";
import { MultipleAcctionButtons } from "./addNewTransactions/Keyboard";

const TransationsDetailsView = () => {
  const location = useLocation();
const navigate = useNavigate(); 
  const dataReceived = location?.state?.transaction;
  

  
  
  
  const dataShow: Transaction = dataReceived 

  useEffect(() => {
  if (!dataShow) {
    navigate("/");
    
  }
}, []);
  
  
  return(
       <Layout>
      <HeatherView title="Details" />
      <section className=" p-4 flex flex-col  relative bg-green-300 ">
        <section
          style={{background: `linear-gradient(120deg, ${TRANSACTION_TYPE_META[dataShow.type ].fill}90 0%, ${TRANSACTION_TYPE_META[dataShow.type ].fill} 50%, ${TRANSACTION_TYPE_META[dataShow.type ].fill}90 100%)`}}
          className=" w-full h-40 rounded-2xl shadow-md gap-3 flex flex-col justify-center items-center text-white">
          <p>{dataShow.title}</p>
          <p className="text-3xl font-extralight" >$ {dataShow.amount.toFixed(2)}</p>
          <p className="text-sm font-bold ">{TRANSACTION_TYPE_META[dataShow.type ].label}</p>
        </section>
        <section
          className=" w-full  flex flex-col overflow-auto gap-4 h-120   text-gray-700"
        >
          <BlurContainer size={10} />
          
        
        <FrameDetail icon={allIcons.tag} title={dataShow.category}>
          <div className="flex flex-wrap gap-2 ">
            {
              dataShow.subcategory.map((subCategory) => {
                
                return(
                  <SubCategoryCard key={subCategory} subCategory={subCategory} onClick={()=>{}}/>
                )
              })
            }
          </div>
         
            <span className="text-end text-[13px] text-gray-600  " >{String(dataShow.date).split("T")[0]}</span>
          </FrameDetail>
          
          <FrameDetail icon={allIcons.note} title="Note">
            <div className=" border rounded-md p-1 min-h-6 border-gray-400 shadow-inner bg-gray-200 mt-1">
              <p>{dataShow.description}</p>
            </div>
          </FrameDetail>

       
            <div>
          {
            Object.keys(dataShow).map((key) => {
              return (
                <div key={key}>
                  {key}
                 
                </div>
              )
            })
          }
          </div>


           <div className="absolute bottom-25 left-10  gap-2 flex ">
          
                     <MultipleAcctionButtons bt1={{title:"<",path:""}} bt2={{title:"Add Transactions",action:()=>{} ,validator:true}} /> 
          
                  </div>
          
          


</section>


          </section>
     </Layout>
    )
};

export default TransationsDetailsView; 


const FrameDetail = ({children , icon , title}: {children: React.ReactNode , icon: JSX.Element , title: string})  => {
  return (
     <div
      className=" w-full  gap-1 rounded-2xl shadow-md p-4  flex flex-col bg-white  text-gray-700">
        <div 
            className="flex gap-4">
            {icon}
            <span className="font-bold capitalize">{title}</span>
          </div>
      {children}
      </div>
  )
}