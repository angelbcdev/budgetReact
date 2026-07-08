import { useState } from "react";
import {
  fliterCategoryAvailable,
  paymentMethodAvailable,
  savingsMethodAvailable,
  type Category,
  type PaymentMethod,

  type TransactionType,
} from "../Models/dummyData";
import { Layout } from "../UI/Layout";
import { allIcons } from "../UI/allIicons";
import { useBudgetContext } from "../provide/budget";
import { Transaction } from "../Models/DataTransactions";
import SelectorContainer from "../UI/SelectorContainer";
import { HeathersTransactions } from "./addNewTransactions/HeatherTransactions";
import { Keyboard } from "./addNewTransactions/Keyboard";
import { TypeSelectorButtons } from "./addNewTransactions/TypeSelectorButtons";
import { ModalAddTitle } from "./addNewTransactions/ModalAddTitle";
import { BalanceNotification } from "./addNewTransactions/BalanceNotification";
import { ajustDataForTransaction, emptyNewTransactions, emptyNotification, validateEnoughBalance, validateEnoughPayCreditCart, validateEnoughPayMortgage } from "./addNewTransactions/helpers";
import type { IKeyboardEdditable } from "./InternalTransactions/SavaingsMovement";
import { useNavigate } from "react-router";
import { VALID_ROUTES } from "../Routes/routes";

export interface ITransaction extends IKeyboardEdditable {
  title: string | null;
  description: string;
  date: Date;
  amount: string;
  category: Category;
  type: TransactionType;
  paymentMethod: PaymentMethod;
  subcategory: string[];
  porcentage?: number;

}

export interface IBalanceNotification {
  show: boolean;
  message: string;
  color: {
    text: string;
    bg: string;
  };
}

const AddNewTransactions = () => {
  const navigate = useNavigate(); 
  const { saveNewTransaction, validateBalance, validatePaymentCard, validateMortgageFound , validateCashFound , validateSavingsAccountBalance } =
    useBudgetContext();
  const [defaultTypeTransaction, setDefaultTypeTransaction] =
    useState<TransactionType>("spending");
  const [defaultCategory, setDefaultCategory] = useState<Category>("food");
  const [defaultPaymentMethod, setDefaultPaymentMethod] = useState<PaymentMethod>("credit_card_red");
  const [showModal, setShowModal] = useState(false);
  const [categoryToShow, setCategoryToShow] = useState<string[]>(
    fliterCategoryAvailable,
  );
  const [lastDate, setLastDate] = useState<string>("");
  const [balanceNotification, setBalanceNotification] = useState<IBalanceNotification>({ ...emptyNotification });
  const [animate, setAnimate] = useState(false);

  const [dataTransaction, setDataTransaction] = useState<ITransaction>({
    ...emptyNewTransactions({ defaultCategory, defaultTypeTransaction ,defaultPaymentMethod })
  });

  const triggerAnimation = () => {
    setAnimate(true); // reset
    const t = setTimeout(() => {
      clearTimeout(t);
      setAnimate(false)
    }, 150);
    return () => clearTimeout(t);
  };


  const adjustCreditCardTotalDeb = (newAmount: string) =>
    setDataTransaction((data) => ({ ...data, amount: newAmount }))

  const showNotification = ({ msj, color }: { msj: string, color: { text: string, bg: string } }) => {
    setBalanceNotification({
      show: true,
      message: msj,
      color: color
    });
    setTimeout(() => {
      setBalanceNotification({ ...emptyNotification });
    }, 500);
  }


  const createTransaction = () => {


  

    //Validate Balance
    if (!validateEnoughBalance({ dataTransaction, validateBalance , validateSavingsAccountBalance})

    ) {
      showNotification({
        msj: "Exceeded balance",
        color: {
          text: "#FF0000",
          bg: "#ffb3b3"
        }
      })
      return;
    }
    // Validate Payment Card


    if (validateEnoughPayCreditCart({ dataTransaction, adjustCreditCardTotalDeb, validatePaymentCard })) {
      const msj =
        dataTransaction.category == "credit_card_blue"
          ? "Blue Card"
          : "Red Card";
      showNotification({
        msj: "Exceeded balance for " + msj,
        color: {
          text: "#FF0000",
          bg: "#ffb3b3"
        }
      })
      return;
    }

    // validate Cash 
    if (dataTransaction.paymentMethod == "cash" && !validateCashFound(Number(dataTransaction.amount))) {
      showNotification({
        msj: "Cash not found",
        color: {
          text: "FF0000",
          bg: "#ffb3b3"
        }
      })
      return
    }

    //Validate Payment Mortgage

    if (
      validateEnoughPayMortgage({
        dataTransaction, validateMortgageFound
      })
    ) {
      showNotification({
        msj: "Mortgage not found",
        color: {
          text: "#FF0000",
          bg: "#ffb3b3"
        }
      })
      return
    }


   
    const dataForSave: Transaction = ajustDataForTransaction({ dataTransaction })
    
    

    if (!dataForSave) return

    saveNewTransaction(dataForSave, () => {
      setLastDate(String(dataForSave.date));
      showNotification({
        msj: "Transaction saved",
        color: {
          text: "#000000",
          bg: "#c9d8ff"
        }
      })


      setDataTransaction({ ...emptyNewTransactions({ defaultCategory, defaultTypeTransaction ,defaultPaymentMethod }) });
    });
  };

  const selectCurrentType = (newType: TransactionType) => {
    setDefaultTypeTransaction(newType);

    switch (newType) {
      case "spending":
        setCategoryToShow(fliterCategoryAvailable);
        setDefaultCategory("food");
        setDefaultPaymentMethod("credit_card_red");
        setDataTransaction((data) => ({
          ...data,
          title: null,
          paymentMethod: "credit_card_red",
          type: "spending",
        }));
        break;

      case "saving":
        setCategoryToShow(savingsMethodAvailable);
        setDefaultCategory("savings");
        setDefaultPaymentMethod("checking");
        setDataTransaction((data) => ({
          ...data,
          title: "Savings",
          paymentMethod: "checking",
          category: "savings",
          type: "saving",
        }));
        break;

      case "credit_card_payment":
        setCategoryToShow(paymentMethodAvailable.filter((method) => (method !== "savings_account" && method !== "cash")));
        setDefaultCategory("credit_card_red");
        setDefaultPaymentMethod("checking");
        setDataTransaction((data) => ({
          ...data,
          title: "payment",
          paymentMethod: "checking",
          category: "credit_card_red",
          type: "credit_card_payment",
        }));
        break;

      default:
        break;
    }
  };

  const selectCurrentCategory = (newCategory: Category) => {
    setDefaultCategory(newCategory);

    setDataTransaction({
      ...dataTransaction,
      category: newCategory,
      title: newCategory,
    });
  };

  return (
    <Layout>
      <BalanceNotification {...{ balanceNotification, setBalanceNotification }} />

      <ModalAddTitle
        showModal={showModal}
        setShowModal={setShowModal}
        defaultCategory={defaultCategory as Category}
        dataTransaction={dataTransaction}
        setDataTransaction={setDataTransaction}
      />
    


      <div className="flex flex-col gap-1  bg-white relative  items-center   py-7 ">
       {( dataTransaction.subcategory.length > 0 || dataTransaction.description.length > 3) &&  <div className="text-[13px] flex flex-row gap-1  text-gray-500 justify-between   w-full absolute top-2 left-0 px-7 ">
          <p className=" w-30 text-nowrap overflow-hidden text-ellipsis" >{dataTransaction.title}</p>
          <p className=" w-40 text-nowrap overflow-hidden text-ellipsis" >Description: {dataTransaction.description}</p>
          <p >Subcategory:{dataTransaction.subcategory.length }</p>
        </div>}
        <div className="flex relative ">
          <h3 className="text-xl font-bold ">New Transaction { defaultPaymentMethod}</h3>
           {Number(dataTransaction.amount || 0) != 0 && (
            <button
              onClick={() =>
                setDataTransaction({ ...dataTransaction, amount: "0.00" })
              }
              className={`text-3xl text-red-600 size-8 bg-gray-300 rounded-full flex items-center justify-center absolute -right-26 top-13`}
            >
              {allIcons.trashCan}
            </button>
          )}
        </div>
        
        <div className="flex flex-row gap-4 items-center  w-full h-12 justify-center transition-all ease-in duration-300 ">
          <p
            className={`  transition-all text-6xl font- text-gray-500  absolute ${animate ? "scale-103 opacity-70 pr-px " : "scale-100 opacity-100"
              }`}
          >
            $ {Number(dataTransaction.amount || 0).toFixed(2)}
          </p>


         
        </div>
        <div className="flex gap-1 flex-row-reverse relative top-4">
        <TypeSelectorButtons
          selectCurrentType={selectCurrentType}
          defaultTypeTransaction={defaultTypeTransaction}
        />
         
      <button onClick={()=>navigate(VALID_ROUTES.internalTransactions)} className="border-gray-200 border text-blue-600 rounded-md px-2  ">Sell Assets</button>
      </div>
    </div>
      <section className=" justify-center flex flex-col items-center">
        <SelectorContainer
          options={categoryToShow}
          selecteOption={defaultCategory}
          changeOtion={(option) => selectCurrentCategory(option as Category)}
        />

        <HeathersTransactions
          
          defaultTypeTransaction={defaultTypeTransaction}
          setShowModal={setShowModal}
          dataTransaction={dataTransaction}
          setDataTransaction={setDataTransaction}
          lastDate={lastDate}
        />
      </section>
      <Keyboard
        createTransaction={createTransaction}
        
        setDataTransaction={setDataTransaction as any}
        triggerAnimation={triggerAnimation}
        isReadyToSubmit={Number(dataTransaction.amount || 0) > 0}
      />
    </Layout>
  );
};

export default AddNewTransactions;
