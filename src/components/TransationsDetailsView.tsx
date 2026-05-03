import {Layout} from "../UI/Layout";
import HeatherView from "../UI/HeatherView";
import { useLocation, useNavigate } from "react-router";

import { getSubCategoryFor, getSubCategoryMeta, TRANSACTION_TYPE_META, type Subcategory } from "../Models/dummyData";
import type { Transaction } from "../Models/DataTransactions";
import { allIcons } from "../UI/allIicons";
import { useEffect, useState, type JSX } from "react";
import BlurContainer from "../UI/BlurContainer";
import { SubCategoryCard } from "../UI/SubCategoryCard";
import { MultipleAcctionButtons } from "./addNewTransactions/Keyboard";

const TransationsDetailsView = () => {
  const location = useLocation();
const navigate = useNavigate(); 
  const dataReceived = location?.state?.transaction;
  const dataShow: Transaction = dataReceived
  const [localDataToShow, setLocalDataToShow] =useState<Transaction>({...dataReceived})
  
const { title, description ,subcategory ,date ,amount ,category } = localDataToShow
  
  
  
   

  useEffect(() => {
  if (!localDataToShow) {
    navigate("/");
    
  }
}, []);



 const updateSubCategories = (sc: Subcategory) => {
  setLocalDataToShow((prev) => {
    let copy = {...prev};

    const current = copy

    const alreadyExists = current.subcategory.includes(sc);

    const updatedSubcategories = alreadyExists
      ? current.subcategory.filter((s) => s !== sc) // remove
      : [...current.subcategory, sc]; // add

    copy = {
      ...current,
      subcategory: updatedSubcategories,
    };

    return copy;
  });
};
  
  
  return(
       <Layout>
      <HeatherView title="Details" />
      <section className=" p-4 flex flex-col  relative bg-green-300 ">
        <section
          style={{background: `linear-gradient(120deg, ${TRANSACTION_TYPE_META[dataShow.type ].fill}90 0%, ${TRANSACTION_TYPE_META[dataShow.type ].fill} 50%, ${TRANSACTION_TYPE_META[dataShow.type ].fill}90 100%)`}}
          className=" w-full h-40 rounded-2xl shadow-md gap-3 flex flex-col justify-center items-center text-white">
          <p>{title}</p>
          <p className="text-3xl font-extralight" >$ {amount.toFixed(2)}</p>
          <p className="text-sm font-bold ">{TRANSACTION_TYPE_META[dataShow.type ].label}</p>
        </section>
        <section
          className=" w-full  flex flex-col overflow-auto gap-4 h-120   text-gray-700"
        >
          <BlurContainer size={10} />
          
        
        <FrameDetail icon={allIcons.tag} title={category}>
          <div className="flex flex-wrap gap-2 ">
            {
               getSubCategoryFor(category).map(subCategory =>{
                const meta = getSubCategoryMeta(subCategory)
                if (subcategory.includes(subCategory)){
                    return(
                  <SubCategoryCard key={subCategory} subCategory={subCategory} onClick={()=>{updateSubCategories(subCategory)}}/>
                )
                }
                return(
                <span 
              onClick={()=>{updateSubCategories(subCategory)}}
            className={`  bg-gray-200 border border-gray-500 text-gray-500  opacity-60 px-4 rounded capitalize`} key={subCategory} >{meta.label}
            </span>)})

            }
          </div>
         
            <span className="text-end text-[13px] text-gray-600  " >{String(date).split("T")[0]}</span>
          </FrameDetail>
          
          <FrameDetail icon={allIcons.note} title="Note">
            <div className=" border rounded-md p-1 min-h-6 border-gray-400 shadow-inner bg-gray-200 mt-1">
              <p>{description}</p>
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