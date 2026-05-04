import { useState } from "react";
import {  getCategoryMeta, type TallTypeCategory } from "../Models/dummyData";
import { allIcons } from "./allIicons";

export const DataShowListCategory = ({ title, data, sizeScroll = 10, showSort = false, valueSort, setSortToggle }:
  {title: string,showSort?: boolean,sizeScroll?: number, data: { category: string, cuantity: number }[], valueSort: boolean, setSortToggle: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const [showDataWithCero , setShowDataWithCero] = useState(false)
  if (!data) {
    return null;
  }
  return (
    <section className= "">
            <div className="flex flex-row justify-between items-center mb-2">
        <p
          onClick={() => setShowDataWithCero(!showDataWithCero)}
          className="text-xl text-gray-500  font-md   p-1">{title}   </p>
{/* <span className="text-gray-300 text-lg">›</span> */}
        {showSort && <BiToogleButton
          
          title={[allIcons.myArrowup, allIcons.myArrowDown]}
          data={[true, false]} valueSort={valueSort} setSortToggle={setSortToggle} />}
            </div>
            
            <div className="flex flex-col  justify-center  rounded-2xl overflow-hidden  w-93 border mx-auto border-gray-200 ">
              {

                data.sort((a, b) => {
                  
                  if (valueSort) {
                    return b.cuantity - a.cuantity
                  }else {
                    return a.cuantity - b.cuantity
                  }
                  
                  
                }) && data.map((c) => {
                const meta = getCategoryMeta(c.category as  TallTypeCategory)
                  const cuantity = c.cuantity
                  if (cuantity === 0 && !showDataWithCero) {
                    return null;
                  }
                  return(
                  <div  key={c.category} className={`flex flex-row justify-between gap-2 w-full  bg-white  pl-2 py-2 border border-gray-100  shadow-sm text-gray-800`}>
                      
                      <div className="flex flex-row items-center gap-2 ">
                        <div
                        style={{backgroundColor:meta.bg + "30"}}
                    className={`w-10 h-10 flex items-center justify-center rounded-full `}
                  >
                    <span className="text-lg">{meta.icon}</span>
                        </div>
                        <p className="pl- capitalize  ">{meta.label}</p>
                      </div>
                      
                      
                      <p className="pr-10  ">${cuantity.toFixed(2)}</p>
                  </div>
                )}) 
                }


            </div>
            <div style={{height: `${sizeScroll}px`}} ></div>
            
          </section>
  )
}

export const BiToogleButton = ({data, valueSort, setSortToggle ,title }: {data: any[], title: any[] ,  valueSort: boolean, setSortToggle: React.Dispatch<React.SetStateAction<boolean>>}) => {
  


  return(<div className="flex bg-gray-300 rounded-md p-px h-6">
              
              {
                data.map((f, i) => (
                  <button
                    key={i}
                    onClick={() => setSortToggle(f)}
                    className={` text-[12px] w-14 rounded-sm flex justify-center items-center  whitespace-nowrap transition overflow-hidden
                    ${
                      f === valueSort
                        ? "bg-gray-100 text-blue-500 "
                        : " text-gray-900"
                    }`}
                  >
                    {title[i] ?? ""}
                  </button>
                ))
              }
            </div>)
}