import { useEffect, useRef, useState } from "react";
import type { ISummaryHomeData } from "../provide/hooks/useSummaryTransactions";
import {createEmptySummary } from "../provide/hooks/useSummaryTransactions";
import { useBudgetContext } from "../provide/budget";





const ShowBarData = () => {
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
  "#A855F7", // December - Purple
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

  canvas.width =360;
  canvas.height = Math.max(320, Object.keys(data).length * 30 + 40);

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
  const leftMargin = 50;
  const rightMargin = 90;
  const topMargin = 30;

  const rowHeight = 26;
  const barHeight = 16;

  const chartWidth =
    canvas.width - leftMargin - rightMargin;

  months.forEach((month, index) => {
    const value = values[index];

    const width = (value / maxValue) * chartWidth;

    const y = topMargin + index * rowHeight;

    // Month
    ctx.font = "14px Roboto";
    ctx.fillStyle = "black";
    ctx.textAlign = "right";
    ctx.textBaseline = "middle";

    ctx.fillText(
      month.slice(5),
      leftMargin - 10,
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
  ctx.moveTo(leftMargin, 5);
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

}, [
  data,
  filterGenerals,
  filterCategories,
]);

  return <section className=" w-full flex flex-col items-center justify-center">
    <canvas className="rounded-md " ref={canvasRef} />
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
      <p className="text-md font-semibold   uppercase shadow-2xl " >{title}</p>
      <div className="grid grid-cols-3 gap-2 p-px   border-b  border-gray-400 pb-2">
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
            <p key={item} onClick={() => action(item as keyof ISummaryHomeData)} className={`text-sm rounded-sm text-nowrap truncate capitalize w-full overflow-hidden cursor-pointer text-center px-2 py-1 ${isSelected ? "text-blue-600 bg-white shadow-sm" : finalTile === "Back" ? "text-red-600 bg-white" : "text-gray-600 bg-gray-300"}`}  >
              {
                finalTile === "Back" && <span>{"< "}</span>
              }
              {finalTile}</p>
          )
        })}
        </div>
      </section>
  )
};