import { useEffect } from "react";

import { useNavigate } from "react-router";
import { VALID_ROUTES } from "../../Routes/routes";
import type { IKeyboardEdditable } from "../InternalTransactions/SavaingsMovement";

export const Keyboard = ({
  createTransaction,
  setDataTransaction,
  triggerAnimation,
  buttonOptions = {title:"+ 1",path:VALID_ROUTES.multiTransactions},
 isReadyToSubmit 
}: {
  triggerAnimation: () => void;
  createTransaction: () => void;
  setDataTransaction: React.Dispatch<React.SetStateAction<IKeyboardEdditable>>;
  isReadyToSubmit: boolean;
  buttonOptions?: IActionButtons
}) => {
  
  const keyBoard = ["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0", "<"];

;

  const normalize = (value: string) => {
    if (
      !value ||
      value === "." ||
      value === "0." ||
      value === "" ||
      value === "0.0"
    ) {
      return "0.00";
    }
    return value;
  };

  const handleNumber = (key: string) => {
    setDataTransaction((data) => {
      let value = data.amount || "";

      if (value === "0.00") value = "";

      const [int, dec] = value.split(".");

      // limit integer digits (max 4 → 9999)
      if (!value.includes(".") && int.length >= 5) return data;

      // limit decimals (max 2)
      if (value.includes(".") && dec?.length >= 2) return data;

      value += key;

      return { ...data, amount: value };
    });
  };

  const handleDot = () => {
    setDataTransaction((data) => {
      let value = data.amount || "";

      if (value.includes(".")) return data;

      if (value === "" || value === "0.00") value = "0";

      return { ...data, amount: value + "." };
    });
  };

  const handleDelete = () => {
    setDataTransaction((data) => {
      let value = data.amount || "";

      value = value.slice(0, -1);

      value = normalize(value);

      return { ...data, amount: value };
    });
  };

  const handleSubmit = () => {
    createTransaction();
  };
  useEffect(()=>{

    const evenListener = (e:any)=>{
      if (keyBoard.includes(e.key)){
        validateInput(e.key)
      }
      if(e.key == "Enter"){
        handleSubmit()
      }
       if(e.key == "Backspace"){
        validateInput("<")
      }
     
    }
    document.addEventListener("keydown",evenListener)

    return()=>{
    
      document.removeEventListener("keydown", evenListener)
    }
  },[])

  const validateInput = (key: string) => {
    triggerAnimation();
    switch (key) {
      case ".":
        handleDot();
        break;
      case "<":
        handleDelete();
        break;
      default:
        handleNumber(key);
    }
  };

  return (
    <div className="flex flex-col bg-white gap-1 justify-center items-center p-4 px-3">
      {/* DISPLAY */}
      {/* <div className="text-sm font-semibold  text-red-500">
     // ${Number(dataTransaction.amount || 0).toFixed(2)}
    
       
      </div> */}

      {/* KEYBOARD */}
      <div className="grid grid-cols-3 gap-2">
        {keyBoard.map((key) => (
          <button
            key={key}
            onClick={() => validateInput(key)}
            className="h-14 w-28 flex items-center justify-center bg-gray-200 rounded-md text-lg font-semibold shadow active:bg-gray-400 active:scale-95 transition-all ease-in duration-100"
          >
            {key === "<" ? "⌫" : key}
          </button>
        ))}
      </div>
      {/* ACTION */}
      <div className="flex w-88 gap-2 mx-auto">

      {/*     */}

      <MultipleAcctionButtons bt1={buttonOptions} bt2={{title:"Add Transaction",action:handleSubmit ,validator:isReadyToSubmit}} />
      </div>
    </div>
  );
};

export interface IActionButtons  {
    title: string;

    action?: () => void;
    validator?:boolean
    path?:string
}

export const MultipleAcctionButtons = ({bt1 , bt2}:{bt1:IActionButtons , bt2:IActionButtons})=>{
  const navigate = useNavigate(); 

  return(
    <>
    <button
        
        onClick={()=>{
          if (bt1.path){
          navigate(bt1.path)
        }else{
         if(bt1.action) bt1.action()
        }
        }}
        className={`mt-2  h-10 w-28 bg-blue-400 active:bg-blue-600 active:scale-95 text-white  rounded-lg text-base font-semibold  transition-all ease-in duration-100 `}
      >
       { bt1.title}
      </button>


      <button
        disabled={!bt2.validator}
        onClick={bt2.action}
        className={`mt-2  h-10 w-58 ${bt2.validator ? "bg-blue-400 active:bg-blue-600 active:scale-95 text-white" : "bg-gray-200 text-gray-500"}  rounded-lg text-base font-semibold  transition-all ease-in duration-100 `}
      >
         { bt2.title}
      </button>
    
    </>
  )
}
