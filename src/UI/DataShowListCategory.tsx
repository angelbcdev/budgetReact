import { categoryMeta } from "../Models/dummyData";

export const DataShowListCategory = ({ title, data, sizeScroll = 10, showSort = false, valueSort, setSortToggle }:
  {title: string,showSort?: boolean,sizeScroll?: number, data: { category: string, cuantity: number }[], valueSort: boolean, setSortToggle: React.Dispatch<React.SetStateAction<boolean>> }) => {
  
  if (!data) {
    return null;
  }
  return (
    <section>
            <div className="flex flex-row justify-between mb-2">
              <p className="text-xl text-gray-800 font-md pl-2  mb-1">{title}   </p>

            {showSort &&  <div className="flex bg-gray-400 rounded-md p-px h-6">
              
              {
                [true , false].map((f, i) => (
                  <button
                    key={i}
                    onClick={() => setSortToggle(f)}
                    className={` text-[12px] w-14 rounded-sm  whitespace-nowrap transition overflow-hidden
                    ${
                      f === valueSort
                        ? "bg-green-500 text-white "
                        : " text-gray-900"
                    }`}
                  >
                    {f ? "↓" : "↑"}
                  </button>
                ))
              }
            </div>}
            </div>
            
            <div className="flex flex-col  justify-center  rounded-2xl overflow-hidden  w-97 border mx-auto border-gray-200 ">
              {

                data.sort((a, b) => {
                  
                  if (valueSort) {
                    return b.cuantity - a.cuantity
                  }else {
                    return a.cuantity - b.cuantity
                  }
                  
                  
                }) && data.map((c) => {
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
            <div style={{height: `${sizeScroll}px`}} ></div>
            
          </section>
  )
}