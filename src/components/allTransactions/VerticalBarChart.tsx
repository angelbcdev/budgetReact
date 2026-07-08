import { useEffect, useRef } from "react";
import type { ChartBar } from "./makeFilter";

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
    canvas.width = 380;
    canvas.height = Math.max(
      120,
      data.length * 32 + 50
    );


    ctx.clearRect(
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
        30 +
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
        item.label.toUpperCase(),
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
    <div className=" w-96 h-80 overflow-y-auto mx-auto ">

      <canvas
        ref={canvasRef}
        className="block"
      />

    </div>
  );
};




const VerticalBarChart = ({
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

    canvas.width = 380;
    canvas.height = 180;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const padding = 40;
    const top = 40;
    const bottom = 45;

    const chartHeight = canvas.height - top - bottom;
    const chartWidth = canvas.width - padding * 2


    const gap = 12;

    const barWidth =
      (chartWidth - gap * (data.length - 1)) /
      data.length;

    const maxValue = Math.max(
      ...data.map((d) => Number(d.value)),
      1
    );

    // axis
    ctx.beginPath();
    ctx.moveTo(padding, top);
    ctx.lineTo(padding, canvas.height - bottom);

    ctx.lineTo(
      canvas.width - padding,
      canvas.height - bottom
    );

    ctx.strokeStyle = "#555";
    ctx.stroke();

    ctx.font = "12px Roboto";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    data.forEach((item, index) => {
      const barHeight =
        (Number(item.value) / maxValue) * chartHeight;

      // if (barHeight === 0) return;
      const x =
        padding +
        index * (barWidth + gap);

      const y =
        canvas.height -
        bottom -
        barHeight;

      // Bar
      ctx.fillStyle = "#3B82F6";
      ctx.fillRect(
        x,
        y,
        barWidth,
        barHeight
      );

      // Value
      ctx.fillStyle = "black";
      ctx.fillText(
        item.value.toLocaleString(),
        x + barWidth / 2,
        y - 10
      );

      // Label
      ctx.save();

      ctx.translate(
        x + barWidth / 2,
        canvas.height - bottom + 8
      );

      ctx.rotate(-Math.PI / 4);

      ctx.fillText(item.label, 0, 0);

      ctx.restore();
    });
  }, [data]);

  return (
    <canvas
      ref={canvasRef}
      className=" "
    />
  );
};

export default VerticalBarChart;