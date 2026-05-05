import { useRef } from "react";
import { paymentMethodAvailable } from "../../Models/dummyData";
import { allIcons } from "../../UI/allIicons";
import type { ITransaction } from "../AddNewTransactions";
import { useBudgetContext } from "../../provide/budget";

export const HeathersTransactions = ({
  setShowModal,
  setDataTransaction,
  dataTransaction,
  defaultTypeTransaction,
  lastDate
}: {
  lastDate: string
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setDataTransaction: React.Dispatch<React.SetStateAction<ITransaction>>;
  dataTransaction: ITransaction;
  defaultTypeTransaction: string;
}) => {
  const selectorRef = useRef<HTMLSelectElement>(null);
  const { validateBalance , validateSavingsAccountBalance } = useBudgetContext();

  const addValue = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { value , name} = e.target;

   
    setDataTransaction((data) =>{ 
      
      return({
      ...data,
      [name]:  value,
    })});


  };
  const canSelectMethod = defaultTypeTransaction === "spending";
  return (
    <div className="flex flex-col gap-4 justify-center relative  items-center w-full max-w-94 mx-auto     rounded-2xl p-1 px-3 ">
      <div className="flex flex-row gap-2 items-center justify-center ">
        {/* TODO */}
        {/* px-2   */}
        <SelectDateGlobal
          addValue={addValue}
          lastDate={lastDate}
          
          className={`${!canSelectMethod ? "w-88 ml-3" : "w-54"} py-1 flex flex-row gap-2 items-center justify-center rounded-md bg-white text-gray-700    capitalize `}
        
        />
        {canSelectMethod ? (
          <label>
            <select
              ref={selectorRef}
              defaultValue={dataTransaction.paymentMethod}
              title="category"
              name="paymentMethod"
              onChange={addValue}
              className="w-32 px-4 border-gray-300 bg-white  h-8 border rounded"
            >
              {paymentMethodAvailable.map((method) => {
                let tilte:string = method;
                if (method === "credit_card_blue") {
                  tilte = "Card Blue";
                } else
                 if (method === "credit_card_red") {
                  tilte = "Card Red";
                 } if (method === "savings_account" ) {
                  tilte = "Savings Account";
                }
                
                
                if (method === "mortgage") return;
               
               
                if (method === "checking" && !validateBalance()) {
          
                  return;
                }

                if (method === "savings_account" && !validateSavingsAccountBalance()) {
                  return;
                }

                return (
                  <option key={method} value={method}>
                    {tilte}
                  </option>
                );
              })}
            </select>
          </label>
        ) : (
          <div className="w-0 h-8"></div>
        )}
      </div>
      <button
        onClick={() => setShowModal(true)}
        className="px-2 py-1 w-full flex flex-row gap-2 items-center justify-center rounded-md bg-white text-gray-700    transition-all ease-in duration-300 capitalize "
      >
        <span>{allIcons.note}</span>
        Title and Description
      </button>
    </div>
  );
};

export const SelectDateGlobal = ({ className, addValue, lastDate }: { className: string, addValue: (e: React.ChangeEvent<HTMLInputElement>) => void, lastDate: string }) => {
  
  const today = new Date();
const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(today.getMonth() - 0);

  const nextMonth = new Date();
  nextMonth.setMonth(today.getMonth() + 1);


  
  return(  <label
          className={className }
        >
        
        <input
  placeholder="Date"
  defaultValue={ lastDate || new Date().toISOString().split('T')[0]}
  type="date"
  name="date"
      onChange={addValue}
      min={oneMonthAgo.toISOString().split("T")[0]}
      max={nextMonth.toISOString().split("T")[0]}
/>
        </label>)
}