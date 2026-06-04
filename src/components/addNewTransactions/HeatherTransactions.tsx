import { useRef } from "react";
import { paymentMethodAvailable } from "../../Models/dummyData";
import { allIcons } from "../../UI/allIicons";
import type { ITransaction } from "../AddNewTransactions";
import { useBudgetContext } from "../../provide/budget";
import { SelectDateGlobal } from "../../UI/SelectDateGlobal";

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
  const { validateBalance , validateSavingsAccountBalance ,validateCashFound } = useBudgetContext();

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

                if (method === "cash" && !validateCashFound()) {
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
        className={`
          ${!( dataTransaction.subcategory.length > 0 || dataTransaction.description.length > 3) ? "bg-blue-400 text-white": "bg-white text-gray-700"}
          
          px-2 py-1 w-full flex flex-row gap-2 items-center justify-center rounded-md     transition-all ease-in duration-300 capitalize `}
      >
        <span>{allIcons.note}</span>
        Title and Description
      </button>
    </div>
  );
};

