import { useEffect, useRef } from "react";
import type { ChartBar } from "./makeFilter";
import type { Category } from "../../Models/dummyData";

const allColors = [
  "#3B82F6",
  "#ff0000",
  "#10B981",
  "#F59E0B",
  "#EF4444", "#8B5CF6",
  "#06B6D4", "#84CC16", "#F97316",
  "#EC4899",
  "#6366F1",
  "#14B8A6",
  "#FF106a",
  "#0ea5e9",
  "#65a30d",
  "#dc2626",
  "#2563eb",
  "#f97316",
  "#f59e0b",
  "#16a34a",

];


const getLabelName = (category: Category) => {
    const labelName = {
      "mortgage_payment": "Mort.. Pay",
    }


  if (labelName[category as keyof typeof labelName]) {
    return labelName[category as keyof typeof labelName];
  }
  return category
}
export const HorizontalBarChart = ({
  data,
}: {
  data: ChartBar[];
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (!ctx) return;


    // Canvas size
    canvas.width = 360;
    canvas.height = Math.max(
      0,
      data.length * 32 + 28
    );


    ctx.clearRect(
      0,
      0,
      canvas.width,
      canvas.height
    );

    ctx.fillStyle = "#fff";
     ctx.fillRect(
      0,
      0,
      canvas.width,
      canvas.height
    );


    const maxValue = Math.max(
      ...data.map((d) => Number(d.value)),
      1
    );


    // Layout
    const labelWidth = 90;
    const valueWidth = 80;

    const leftMargin = labelWidth + 10;
    const rightMargin = valueWidth + 10;

    const chartWidth =
      canvas.width -
      leftMargin -
      rightMargin;


    const rowHeight = 32;
    const barHeight = 18;


    data.forEach((item, index) => {

      const y =
        18 +
        index * rowHeight;


      const barWidth =
        (Number(item.value) / maxValue) *
        chartWidth;



      // Label
      ctx.font = "14px Roboto";
      ctx.fillStyle = "#222";
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";

      ctx.fillText(
        getLabelName(item.label as Category).toUpperCase(),
        10,
        y + barHeight / 2
      );



      // Bar
      ctx.fillStyle = allColors[index % allColors.length];

      ctx.fillRect(
        leftMargin,
        y,
        barWidth,
        barHeight
      );



      // Value
      ctx.fillStyle = "#222";
      ctx.textAlign = "right";
      ctx.font = "14px Roboto";
    ctx.fillStyle = "black";
  
    ctx.textBaseline = "middle";

      ctx.fillText(
        Number(item.value).toLocaleString(
          "en-US",
          {
            style: "currency",
            currency: "USD",
          }
        ),
        canvas.width - 10,
        y + barHeight / 2
      );

    });



    // Axis line
    ctx.beginPath();

    ctx.moveTo(
      leftMargin,
      15
    );

    ctx.lineTo(
      leftMargin,
      canvas.height - 20
    );

    ctx.strokeStyle = "#999";
    ctx.stroke();



  }, [data]);


  return (
    <div className=" w-90 sm:w-160 h-auto overflow-hidden mx-auto ">

      <canvas
        ref={canvasRef}
        className="block rounded-md pt-1"
      />

    </div>
  );
};




