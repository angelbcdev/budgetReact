import { useState } from "react";
import {
  fliterCategoryAvailable,
  paymentMethodAvailable,
  savingsMethodAvailable,
  type Category,
  type PaymentMethod,
  type Subcategory,
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

export interface ITransaction {
  title: string | null;
  description: string;
  date: Date;
  amount: string;
  category: Category;
  type: TransactionType;
  paymentMethod: PaymentMethod;
  subcategory: Subcategory[];

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
  const { saveNewTransaction, validateBalance, validatePaymentCard, validateMortgageFound } =
    useBudgetContext();
  const [defaultTypeTransaction, setDefaultTypeTransaction] =
    useState<TransactionType>("spending");
  const [defaultCategory, setDefaultCategory] = useState<Category>("food");
  const [showModal, setShowModal] = useState(false);
  const [categoryToShow, setCategoryToShow] = useState<string[]>(
    fliterCategoryAvailable,
  );
  const [lastDate, setLastDate] = useState<string>("");
  const [balanceNotification, setBalanceNotification] = useState<IBalanceNotification>({ ...emptyNotification });
  const [animate, setAnimate] = useState(false);

  const [dataTransaction, setDataTransaction] = useState<ITransaction>({
    ...emptyNewTransactions({ defaultCategory, defaultTypeTransaction })
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
    }, 1200);
  }


  const createTransaction = () => {


    //Validate Balance
    if (validateEnoughBalance({ dataTransaction, validateBalance })

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


    console.log({where:"1st", dataTransaction})
    const dataForSave:Transaction = ajustDataForTransaction({dataTransaction})

    console.log({where:"after", dataForSave})
    return

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


      setDataTransaction({ ...emptyNewTransactions({ defaultCategory, defaultTypeTransaction }) });
    });
  };

  const selectCurrentType = (newType: TransactionType) => {
    setDefaultTypeTransaction(newType);

    switch (newType) {
      case "spending":
        setCategoryToShow(fliterCategoryAvailable);
        setDefaultCategory("food");
        setDataTransaction((data) => ({
          ...data,
          title: null,
          paymentMethod: "credit_card_blue",
          type: "spending",
        }));
        break;

      case "saving":
        setCategoryToShow(savingsMethodAvailable);
        setDefaultCategory("savings");
        setDataTransaction((data) => ({
          ...data,
          title: "Savings",
          paymentMethod: "checking",
          category: "savings",
          type: "saving",
        }));
        break;

      case "credit_card_payment":
        setCategoryToShow(paymentMethodAvailable);
        setDefaultCategory("credit_card_red");
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


      <div className="flex flex-col gap-4  bg-white relative  items-center   py-4 ">
        <h3 className="text-xl font-bold ">New Transaction</h3>
        <div className="flex flex-row gap-4 items-center justify-center transition-all ease-in duration-300 ">
          <p
            className={`  transition-all text-5xl font-light text-gray-600  ${animate ? "scale-101 opacity-90 pr-px rotate-1" : "scale-100 opacity-100"
              }`}
          >
            $ {Number(dataTransaction.amount || 0).toFixed(2)}
          </p>


          {Number(dataTransaction.amount || 0) != 0 && (
            <button
              onClick={() =>
                setDataTransaction({ ...dataTransaction, amount: "0.00" })
              }
              className={`text-5xl text-red-600 size-10 bg-gray-300 rounded-full flex items-center justify-center`}
            >
              {allIcons.trashCan}
            </button>
          )}
        </div>
        <TypeSelectorButtons
          selectCurrentType={selectCurrentType}
          defaultTypeTransaction={defaultTypeTransaction}
        />
      </div>
      <section className=" justify-center flex flex-col items-center">
        <SelectorContainer
          options={categoryToShow.map((category) => category)}
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
        dataTransaction={dataTransaction}
        setDataTransaction={setDataTransaction}
        triggerAnimation={triggerAnimation}
      />
    </Layout>
  );
};

export default AddNewTransactions;


;


