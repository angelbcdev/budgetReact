import { useEffect, useRef, useState } from "react";
import type { ISummaryHomeData } from "../provide/hooks/useSummaryTransactions";
import {createEmptySummary } from "../provide/hooks/useSummaryTransactions";
import { useBudgetContext } from "../provide/budget";
import ChangeMonth from "../UI/changeMonth";



type TShowData = "Year" | "Monthtly"

const ShowBarData = ()=>{
  const [showData , setShowData]= useState<TShowData>("Monthtly")

  const changeView = ()=>{
    setShowData(showData == "Year" ? "Monthtly" : "Year")
  }
  return(<section>
    <div className="flex justify-center mb-2">
     <p className="text-md font-semibold text-start  uppercase  w-full   mb-2" >Data by {showData}</p>

     <button className=" w-48 bg-red-200 rounded-xl font-bold text-md " onClick={changeView}>Change view</button>
     </div>
  {showData == "Year" && <ShowBarDataYeard/>}
  {showData == "Monthtly" && <ShowDataMonth/>}
  </section>)
}


const ShowDataMonth =()=>{
    const {
    summaryHomeData,
    curentDate,
    global,
    currentMonthGoals,
   allMonthsDataSort
  } = useBudgetContext();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const monthToShow = curentDate.month < 10 ? `0${curentDate.month+1}`: curentDate.month+ 1


   useEffect(() => {
  if (!canvasRef.current) return;
  const setDataToShow = allMonthsDataSort[curentDate.year+"-"+monthToShow]
    console.log(curentDate.year+monthToShow)
    console.log(setDataToShow)
  const canvas = canvasRef.current;
  const ctx = canvas.getContext("2d");

  if (!ctx) return;

  canvas.width =370;
  canvas.height = Math.max(320, 5 * 30 -8);

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
   },[])

  return(
    <section className="flex flex-col  gap-2">
      <div className=" w-90 flex justify-between ">
           <span>  {curentDate.nameMonth}</span>
           <span>  {monthToShow}</span>
             <div className=" w-30">
              <ChangeMonth />
             </div>
          </div>
           <canvas className="rounded-md shadow-md border border-gray-200" ref={canvasRef} />
    </section>
  )
}


const nameMonths = {
  "01": "January",
  "02": "February",
  "03": "March",
  "04": "April",
  "05": "May",
  "06": "June",
  "07": "July",
  "08": "August",
  "09": "September",
  "10": "October",
  "11": "November",
  "12": "December",
}





const ShowBarDataYeard = () => {
  const { allMonthsDataSort } = useBudgetContext();
  const data = allMonthsDataSort
  const colorsByMonths = [
   "#3B82F6", // January - Blue
  "#10B981", // February - Emerald
  "#F59E0B", // March - Amber
  "#EF4444", // April - Red
  "#8B5CF6", // May - Violet
  "#06B6D4", // June - Cyan
  "#84CC16", // July - Lime
  "#F97316", // August - Orange
  "#EC4899", // September - Pink
  "#6366F1", // October - Indigo
  "#14B8A6", // November - Teal
  "#FF106a", // December - Purple
  ];
  


  const canvasRef = useRef<HTMLCanvasElement>(null);
  const emptyData = createEmptySummary();
  const trackerGenerals = Object.keys(emptyData).filter((e) => ["gsMor" ,"ard", "alB", "sS" ,"sC","ash","Acc","gsB","mon"].every((f) => !e.includes(f)));
  const trackerCategories = [...Object.keys(emptyData.databyCatefory).filter((f) => ["money","credit" ,"cash","checking"].every((g) => !f.includes(g))), "Back"];

  
  const [filterGenerals, setFilterGenerals] = useState<keyof  ISummaryHomeData>(trackerGenerals[0] as  keyof  ISummaryHomeData);
  const [filterCategories, setFilterCategories] = useState<keyof  ISummaryHomeData>(trackerCategories[0] as  keyof  ISummaryHomeData);


  const seletACategory = (category: keyof ISummaryHomeData) => {
   setFilterGenerals("databyCatefory")
    setFilterCategories(category)
    if (category === "Back" as keyof ISummaryHomeData) {
      setFilterGenerals(trackerGenerals[0] as  keyof  ISummaryHomeData)
      setFilterCategories(trackerCategories[0] as  keyof  ISummaryHomeData)
    }
 }

 useEffect(() => {
  if (!canvasRef.current) return;

  const canvas = canvasRef.current;
  const ctx = canvas.getContext("2d");

  if (!ctx) return;

  canvas.width =370;
  canvas.height = Math.max(320, Object.keys(data).length * 30 -8);

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const months = Object.keys(data).sort();

  const sourceData = (month: string): number => {
    const monthData = data[month];

    if (filterGenerals === "databyCatefory") {
      return (
        monthData.databyCatefory[
          filterCategories as keyof typeof monthData.databyCatefory
        ] || 0
      );
    }
    if (filterGenerals === "totalExpenses") {
      return (
        monthData.totalExpenses + monthData.databyCatefory.mortgage_payment || 0
      );
    }
  
    return (monthData[
      filterGenerals as keyof typeof monthData
    ] as number) || 0;
  };

  const values = months.map(sourceData);
  const maxValue = Math.max(...values, 1);

  // Layout
  const leftMargin = 80;
  const rightMargin = 90;
  const topMargin = 30;

  const rowHeight = 26;
  const barHeight = 16;

  const chartWidth =
    canvas.width - leftMargin - rightMargin;
  let totalToShow = 0;
  months.forEach((month, index) => {
    const value = values[index];
    totalToShow += value;
    const width = (value / maxValue) * chartWidth;

    const y = topMargin + index * rowHeight;

    // Month
    ctx.font = "14px Roboto";
    ctx.fillStyle = "black";
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";

    ctx.fillText(
      nameMonths[month.slice(5) as keyof typeof nameMonths],
      leftMargin - 70,
      y + barHeight / 2
    );

    // Bar
    ctx.fillStyle =
      colorsByMonths[index % colorsByMonths.length];

    ctx.fillRect(
      leftMargin,
      y,
      width,
      barHeight
    );

    // Value
    ctx.fillStyle = "black";
    ctx.textAlign = "left";

    ctx.fillText(
      value.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      }),
      leftMargin + width + 8,
      y + barHeight / 2
    );
  });

  // Vertical axis
  ctx.beginPath();
  ctx.moveTo(leftMargin ,25);
  ctx.lineTo(leftMargin, canvas.height - 15);
  ctx.strokeStyle = "#444";
   ctx.stroke();

  // Horizontal axis
  ctx.beginPath();
  ctx.moveTo(leftMargin, canvas.height - 15);
  ctx.lineTo(
    leftMargin + chartWidth,
    canvas.height - 15
  );
  ctx.strokeStyle = "#444";
   ctx.stroke();
   ctx.font = "18px Roboto";
   ctx.fillStyle = "black";
   ctx.textAlign = "left";
   ctx.textBaseline = "middle";
   
    ctx.fillText(
      totalToShow.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      }),
      canvas.width - 84,
      canvas.height - 15
    );

}, [
  data,
  filterGenerals,
  filterCategories,
]);

  return <section className=" w-full flex flex-col items-center justify-center">
   
    <canvas className="rounded-md shadow-md border border-gray-200" ref={canvasRef} />
    <div>
      
      {
        filterGenerals === "databyCatefory" ?
          <ShowOptions title="Categories" action={seletACategory} data={trackerCategories} validate={filterCategories} /> :
          <ShowOptions title="Generals" action={setFilterGenerals} data={trackerGenerals} validate={filterGenerals} />
      
      }
    </div>
  </section>;
};

export default ShowBarData;

const ShowOptions = ({title, action, data,validate}: {title: string, action: (item: keyof ISummaryHomeData) => void, data: string[], validate: string}) => {
  return (
    <section className="  w-92 py-4 " >
      <p className="text-md font-semibold   uppercase   mb-2" >Filtered by {title}</p>
      <div className="grid grid-cols-3 gap-px p-px   border-b  border-gray-400 pb-2">
        {data.map((item) => {
          const isSelected = item === validate;
          let finalTile = item
          if (item === "databyCatefory") {
            finalTile = "Categories"
          }else if (item.startsWith("total")) {
            finalTile = item.slice(5)
          }else if (item.includes("_")) {
            finalTile = item.split("_").join(" ")
          }
          return(
            <p key={item} onClick={() => action(item as keyof ISummaryHomeData)} className={`text-sm rounded-sm relative text-nowrap truncate capitalize w-full overflow-hidden cursor-pointer text-center px-2 py-1 ${isSelected ? "text-blue-600 bg-white shadow-sm" : finalTile === "Back" ? "text-red-600 bg-white" : "text-gray-600 bg-gray-300"}`}  >
              
              {finalTile}</p>
          )
        })}
        </div>
      </section>
  )
};