import { useState, useRef, useEffect } from "react";
import {
  fliterCategoryAvailable,
  paymentMethodAvailable,
  savingsMethodAvailable,
  subCateriesAvailable,
  typeTransactionAvailable,
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

interface ITransaction {
  title: string | null;
  description: string;
  date: Date;
  amount: string;
  category: Category;
  type: TransactionType;
  paymentMethod: PaymentMethod;
  subcategory: Subcategory[];
}

const AddNewTransactions = () => {
  const { saveNewTransaction, validateBalance, validatePaymentCard ,validateMortgageFound } =
    useBudgetContext();
  const [defaultTypeTransaction, setDefaultTypeTransaction] =
    useState<TransactionType>("spending");
  const [defaultCategory, setDefaultCategory] = useState<Category>("food");
  const [showModal, setShowModal] = useState(false);
  const [categoryToShow, setCategoryToShow] = useState<string[]>(
    fliterCategoryAvailable,
  );
  const [lastDate, setLastDate] = useState<string>("");
  const [balanceNotification, setBalanceNotification] = useState({
    show: false,
    message: "",
    color: {
      text: "",
      bg: "",
    }
    
  });
  const [animate, setAnimate] = useState(false);

  const [dataTransaction, setDataTransaction] = useState<ITransaction>({
    title: defaultCategory,
    description: "",
    date: new Date(),
    amount: "0",
    category: defaultCategory,
    type: defaultTypeTransaction,
    paymentMethod: "credit_card_blue",
    subcategory: [],
  });

  const triggerAnimation = () => {
  setAnimate(true); // reset
    const t = setTimeout(() => {
      clearTimeout(t);
      setAnimate(false)
    }, 150);
    return () => clearTimeout(t);
};

  
  const showNotification = ({msj , color}: {msj: string, color: {text: string, bg: string}}) => {
       setBalanceNotification({
        show: true,
        message: msj,
        color: color
      });
      setTimeout(() => {
        setBalanceNotification({
          show: false,
          message: "",
          color: {
            text: "",
            bg: "",
          },
        });
      }, 1200);
  }


  const createTransaction = () => {


   //Validate Balance
    if (
      (dataTransaction.paymentMethod == "checking" || dataTransaction.paymentMethod == "credit_card_blue") &&
      dataTransaction.category !== "checking" &&
    
      !validateBalance(Number(dataTransaction.amount))
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
    
    if (
      dataTransaction.paymentMethod == "checking" &&
      dataTransaction.type == "credit_card_payment" &&
      (dataTransaction.category == "credit_card_blue" ||
        dataTransaction.category == "credit_card_red") &&
      !validatePaymentCard(
        dataTransaction.category,
        Number(dataTransaction.amount),
        (newAmount: string) =>
          setDataTransaction((data) => ({ ...data, amount: newAmount })),
      )
    ) {
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
      dataTransaction.category == "mortgage" &&
      dataTransaction.type == "credit_card_payment" &&
      !validateMortgageFound(Number(dataTransaction.amount))) {
      showNotification({
        msj: "Mortgage not found",
        color: {
          text: "#FF0000",
          bg: "#ffb3b3"
        }
      })
      return
    }
   
   
    
    const validatePayMortgage =
      dataTransaction.type == 
"credit_card_payment" &&
      dataTransaction.category == "mortgage" ;
   
    const validateIsPayCheck =
      dataTransaction.category == "checking" &&
      dataTransaction.type == "credit_card_payment";
    const validatePayCreditCard =
      dataTransaction.type == "credit_card_payment" &&
      (dataTransaction.category == "credit_card_blue" ||
        dataTransaction.category == "credit_card_red");
    
    
    
    const checkValidationsPayment = (): PaymentMethod => {
      if (validatePayMortgage) {
        return "mortgage";
      }
      if (validateIsPayCheck) {
        return "paycheck";
      }
      if (validatePayCreditCard) {
        return "paycheck";
      }
      return dataTransaction.paymentMethod;
    };

    const checkValidationTitle = (): string => {
      if (validatePayCreditCard) {
        return dataTransaction.category == "credit_card_blue"
          ? "Payment Blue Card "
          : "Payment Red Card ";
      }
      return dataTransaction.title || "No title";
    };

    const validateSubcategory = (): Subcategory[] => {
      if (validatePayCreditCard) {
        return ["payment_card"];
      }
      return dataTransaction.subcategory;
    };

    const dataForSave = new Transaction({
      id: crypto.randomUUID(),
      title: checkValidationTitle(),
      description: dataTransaction.description,
      amount: Number(dataTransaction.amount),
      date: dataTransaction.date,
      type: dataTransaction.type,
      category: dataTransaction.category,
      subcategory: validateSubcategory(),
      paymentMethod: checkValidationsPayment(),
    });

   

    saveNewTransaction(dataForSave, () => {
      setLastDate(String(dataForSave.date));
      showNotification({
        msj: "Transaction saved",
        color: {
          text: "#000000",
          bg: "#c9d8ff"
        }
      })


      setDataTransaction({
        title: defaultCategory,
        description: "",
        date: new Date(),
        amount: "0",
        category: defaultCategory,
        type: defaultTypeTransaction,
        paymentMethod: "credit_card_blue",
        subcategory: [],
      });
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
      {balanceNotification.show && (
        <div
          onClick={() => setBalanceNotification({ show: false, message: "" , color: { text: "", bg: "" }})}
          className="fixed top-0 left-0 w-screen h-screen flex z-80 justify-center items-center bg-black/50"
        >
          <div style={{ color: balanceNotification.color.text , backgroundColor: balanceNotification.color.bg  }} className={`text-md  absolute top-44 rounded-md  shadow-2xl fade-in w-90  z-20 py-2 left-10 flex justify-center uppercase `}>
            {" "}
            {balanceNotification.message}
          </div>
        </div>
      )}
      {showModal && (
        <Modal
          setShowModal={setShowModal}
          defaultCategory={defaultCategory as Category}
          dataTransaction={dataTransaction}
          setDataTransaction={setDataTransaction}
        />
      )}

      <div className="flex flex-col gap-4  bg-white relative  items-center   py-4 ">
        <h3 className="text-xl font-bold ">New Transaction</h3>
        <div className="flex flex-row gap-4 items-center justify-center transition-all ease-in duration-300 ">
          <p
            className={`  transition-all text-5xl font-light text-gray-600  ${
              animate ? "scale-101 opacity-90 pr-px rotate-1" : "scale-100 opacity-100"
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
        <TypeTransaction
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

const Modal = ({
  setShowModal,
  setDataTransaction,
  defaultCategory,
  dataTransaction,
}: {
  setDataTransaction: React.Dispatch<React.SetStateAction<ITransaction>>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  defaultCategory: Category;
  dataTransaction: ITransaction;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const addValue = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const value = e.target.value;
    const name = e.target.name;
    setDataTransaction((data) => ({ ...data, [name]: value + 1 }));
  };
  const addSubcategory = (newSubcategory: string) => {
    if (dataTransaction.subcategory.includes(newSubcategory as Subcategory)) {
      setDataTransaction((data) => ({
        ...data,
        subcategory: data.subcategory.filter(
          (sub: Subcategory) => sub !== newSubcategory,
        ),
      }));
    } else {
      setDataTransaction((data) => ({
        ...data,
        subcategory: [...data.subcategory, newSubcategory as Subcategory],
      }));
    }
  };

  return (
    <div
      onClick={() => setShowModal(false)}
      className="fixed inset-0 bg-black/50 z-50 flex px-4"
    >
      {/* FORM */}
      <form
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl p-4 w-100 max-w-md h-115  max-h-140 relative top-4"
        onSubmit={(e) => {
          e.preventDefault();
          buttonRef.current?.click(); // trigger done
        }}
      >
        {/* HEADER */}
        <div className="flex justify-between items-center mb-2">
          <p className="text-2xl font-bold">Add Note for {defaultCategory}</p>

          <button
            type="button"
            onClick={() => setShowModal(false)}
            className="bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center"
          >
            {allIcons.cancel}
          </button>
        </div>

        {/* INPUTS */}
        <div className="flex flex-col gap-2">
          {/* TITLE */}
          <input
            ref={inputRef}
            className="w-full h-10 text-base bg-gray-100 rounded-lg p-3 outline-none"
            placeholder="Title"
            name="title"
            onChange={addValue}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                textareaRef.current?.focus(); // 👉 jump to textarea
              }
            }}
          />

          {/* TEXTAREA */}
          <textarea
            ref={textareaRef}
            className="w-full h-30 text-base bg-gray-100 rounded-lg p-3 outline-none"
            placeholder="Add a note..."
            name="description"
            onChange={addValue}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                buttonRef.current?.click(); // 👉 trigger Done
              }
            }}
          />
        </div>
        <div
          onClick={(e) => e.stopPropagation()}
          className="flex w-full  flex-col gap-4     items-start   pt-2 "
        >
          <p className="text-lg font-semibold ">Other categories</p>
        </div>

        {/* BUTTON */}
        <button
          ref={buttonRef}
          onClick={() => setShowModal(false)}
          type="submit"
          className="mt-4 bg-blue-600 h-13 w-full text-white rounded-lg text-base font-semibold"
        >
          Done
        </button>
        <div className="grid grid-cols-3 h-22 gap-1 pt-3   overflow-scroll">
          {subCateriesAvailable[defaultCategory as Category].map((category) => {
            return (
              <div
                onClick={() => addSubcategory(category)}
                key={category}
                className={`${dataTransaction.subcategory.includes(category) ? "bg-green-600 text-white " : "bg-gray-200"}
                      flex flex-row gap-1.5  text-[13px] font-semibold relative  h-8  items-center justify-center    min-w-24 text  rounded-full py-1 px-3 `}
              >
                {category}
              </div>
            );
          })}
        </div>
      </form>
    </div>
  );
};

const TypeTransaction = ({
  selectCurrentType,
  defaultTypeTransaction,
}: {
  selectCurrentType: (type: TransactionType) => void;
  defaultTypeTransaction: TransactionType;
}) => {
  return (
    <div className="flex flex-row  justify-between bg-gray-200 rounded-md shadow-inner-md p-px">
      {typeTransactionAvailable.map((type) => {
        let title = "";
        if (type === "credit_card_payment") {
          title = "Payment";
        } else {
          title = type;
        }
        const isSelected = defaultTypeTransaction === type;

        return (
          <button
            key={type}
            onClick={() => selectCurrentType(type)}
            className={`px-2 py-1 w-22 rounded-md ${isSelected ? "bg-white text-red-600" : "text-gray-700"}    transition-all ease-in duration-100 capitalize `}
          >
            {title}
          </button>
        );
      })}
    </div>
  );
};

const Keyboard = ({
  createTransaction,
  dataTransaction,
  setDataTransaction,
  triggerAnimation,
}: {
  triggerAnimation: () => void;
  createTransaction: () => void;
  dataTransaction: ITransaction;
  setDataTransaction: React.Dispatch<React.SetStateAction<ITransaction>>;
}) => {
  const keyBoard = ["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0", "<"];

  const isReadyToSubmit =
    Number(dataTransaction.amount || 0) > 0 && dataTransaction.title !== "";

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
    <div className="flex flex-col bg-white gap-1 justify-center items-center pt-4 px-3">
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
      <button
        disabled={!isReadyToSubmit}
        onClick={handleSubmit}
        className={`mt-2  h-10 w-60 ${isReadyToSubmit ? "bg-blue-400 active:bg-blue-600 active:scale-95 text-white" : "bg-gray-200 text-gray-500"}  rounded-lg text-base font-semibold  transition-all ease-in duration-100 `}
      >
        Add Transaction
      </button>
    </div>
  );
};

const HeathersTransactions = ({
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
  const { validateBalance } = useBudgetContext();

  const addValue = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const value = e.target.value;
    const name = e.target.name;

    const dataFormat = new Date(value).toISOString().split("T")[0];
   
    setDataTransaction((data) => ({
      ...data,
      [name]: name === "date" ? dataFormat : value,
    }));
  };
  const canSelectMethod = defaultTypeTransaction === "spending";
  return (
    <div className="flex flex-col gap-4 justify-center relative  items-center w-full max-w-94 mx-auto     rounded-2xl p-1 px-3 ">
      <div className="flex flex-row gap-2 items-center justify-center ">
        <label
          className={`px-2  ${!canSelectMethod ? "w-88 ml-3" : "w-54"} py-1 flex flex-row gap-2 items-center justify-center rounded-md bg-white text-gray-700    capitalize `}
        >
          <input
           
            placeholder="Date"
  
            defaultValue={ lastDate.length > 0 ? lastDate :  new Date().toISOString().split("T")[0]}
            type="date"
            name="date"
            onChange={addValue}
          ></input>
        </label>
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
                let tilte = "";
                if (method === "credit_card_blue") {
                  tilte = "Card Blue";
                } else if (method === "credit_card_red") {
                  tilte = "Card Red";
                } else {
                  tilte = method;
                }
                if (method === "mortgage") return;

                if (method === "checking" && !validateBalance()) {
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
