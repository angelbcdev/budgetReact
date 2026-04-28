import { useState ,useRef, useEffect } from "react";
import { categoryMeta, fliterCategoryAvailable, paymentMethodAvailable, savingsMethodAvailable, subCateriesAvailable, typeTransactionAvailable, type Category, type PaymentMethod, type TransactionType } from "../Models/dummyData";
import { Layout } from "../UI/Layout";
import { allIcons } from "../UI/allIicons";



interface ITransaction {
  title: string;
  description: string;
  date: Date ;
  amount: string;
  category: string;
  type: string;
  paymentMethod: string
  subcategory: string[]
}

const AddNewTransactions = () => {
  const [defaultTypeTransaction, setDefaultTypeTransaction] = useState<TransactionType>("spending");
  const [defaultCategory, setDefaultCategory] = useState("food");
  const [showModal, setShowModal] = useState(false);
  const [categoryToShow, setCategoryToShow] = useState<string[]>(fliterCategoryAvailable);
  const [paymentMethodToShow, setPaymentMethodToShow] = useState<PaymentMethod>("credit_card_blue");

  const [dataTransaction, setDataTransaction] = useState<ITransaction>({
    title: defaultCategory,
    description: "",
    date: new Date(),
    amount: "0",
    category: "",
    type: defaultTypeTransaction,
    paymentMethod: paymentMethodToShow,
    subcategory: []
  })

 

  const createTransaction = () => {
    console.log(dataTransaction);

    // setDefaultTypeTransaction("spending");
    // setDefaultCategory("food");
    // setDataTransaction({
    //   title: "",
    // description: "",
    // date: undefined,
    // amount: "0",
    // category: defaultCategory,
    // type: defaultTypeTransaction,
    // paymentMethod: "credit_card_blue",
    // subcategory: []
    // })
    
  }


  const selectCurrentType =(newType: TransactionType) => {
    setDefaultTypeTransaction(newType);
    const typeConfig = {
  spending: {
    categories: fliterCategoryAvailable,
    defaultCategory: "food",
        title: null,
    defaultPaymentMethod: paymentMethodToShow,
  },
  saving: {
    categories: savingsMethodAvailable,
    defaultCategory: "savings",
    title: "saving",
    defaultPaymentMethod: "checking_account",
  },
  credit_card_payment: {
    categories: paymentMethodAvailable.filter((method) => method !== "checking"),
    defaultCategory: "credit_card_red",
    title: "payment",
    defaultPaymentMethod: "checking_account",
  },
};
    
   setDefaultTypeTransaction(newType);

  const config = typeConfig[newType];

  if (!config) {
    setCategoryToShow([]);
    return;
  }

  setCategoryToShow(config.categories);
  setDefaultCategory(config.defaultCategory);

  setDataTransaction((prev) => ({
    ...prev,
    type: newType,
    category: config.defaultCategory,
    paymentMethod: config.defaultPaymentMethod,
    ...(config.title ? { title: config.title } : {}),
  }));

  }

  const selectCurrentCategory = (newCategory:Category) => {
    setDefaultCategory(newCategory);
    setDataTransaction({...dataTransaction, category: newCategory})
  }

  

  


  return(
    <Layout>
      {showModal && <Modal setShowModal={setShowModal}
        
        
        defaultCategory={defaultCategory as Category} dataTransaction={dataTransaction} setDataTransaction={setDataTransaction} />}
      
        <div className="flex flex-col gap-4  bg-white relative  items-center   py-4 ">
        <h3 className="text-xl font-bold ">New Transaction</h3>
        <div className="flex flex-row gap-4 items-center justify-center transition-all ease-in duration-300 ">
          <h6 className="text-5xl font-light text-gray-600 ">  ${Number(dataTransaction.amount || 0).toFixed(2)}</h6>
          {Number(dataTransaction.amount || 0) != 0 && <button
            
          onClick={() => setDataTransaction({...dataTransaction, amount: "0.00"})} className={`text-5xl text-red-600 size-10 bg-gray-300 rounded-full flex items-center justify-center`}>{allIcons.trashCan}</button>
        }</div>
        <TypeTransaction selectCurrentType={selectCurrentType} defaultTypeTransaction={defaultTypeTransaction} />
       
      </div>
      <SelectCurrentCategory categoryToShow={categoryToShow} defaultCategory={defaultCategory as Category} selectCurrentCategory={selectCurrentCategory} />
      <HeathersTransactions defaultTypeTransaction={defaultTypeTransaction} setPaymentMethodToShow={setPaymentMethodToShow} setShowModal={setShowModal}  dataTransaction={dataTransaction}  setShowModal={setShowModal} setDataTransaction={setDataTransaction} />
      <Keyboard  createTransaction={createTransaction} dataTransaction={dataTransaction}  setDataTransaction={setDataTransaction} />
    </Layout>
    )
};

export default AddNewTransactions; 


const Modal = ({
  setShowModal,
  setDataTransaction,
defaultCategory,
dataTransaction
}: {
setDataTransaction: React.Dispatch<React.SetStateAction<ITransaction>>
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    defaultCategory: Category
    dataTransaction: ITransaction
  
  
  }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  },[])

  const addValue = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value;
    const name = e.target.name;
    setDataTransaction((data) => ({...data, [name]: value + 1}))
  }
  const addSubcategory = (newSubcategory: string) => {
    if (dataTransaction.subcategory.includes(newSubcategory)) {
      setDataTransaction((data) => ({...data, subcategory: data.subcategory.filter((sub) => sub !== newSubcategory)}))
    } else {
      setDataTransaction((data) => {
        return {...data, subcategory: [...data.subcategory, newSubcategory]}
      })
    }
    }
  

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
          <p className="text-2xl font-bold">Add Note for { defaultCategory}</p>

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
          className="flex w-full  flex-col gap-4     items-start   pt-2 ">
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
            {
              subCateriesAvailable[defaultCategory as Category].map((category) => {
                return(
                  <div
                    onClick={() => addSubcategory(category)}
                    key={category}
                    className={`${dataTransaction.subcategory.includes(category) ? "bg-green-600 text-white " : "bg-gray-200"}
                      flex flex-row gap-1.5  text-[13px] font-semibold relative  h-8  items-center justify-center    min-w-24 text  rounded-full py-1 px-3 `}>{category}</div>
                )
              })
            }
          </div>
        
      </form>
        
      
    </div>
  );
};

const SelectCurrentCategory = ({categoryToShow, defaultCategory, selectCurrentCategory}:{categoryToShow:string[], defaultCategory:Category, selectCurrentCategory: (newCategory:Category) => void}) => {
  return (
    <div className="flex flex-row gap-4 overflow-scroll  justify-evenly relative  items-center     rounded-2xl p-3  ">
        {
          categoryToShow.map((category) => {
            const isSelected = defaultCategory === category;

            let title = "";
            if (category === "credit_card_blue") {
              title = "blue card";
            }else if (category === "credit_card_red") {
              title = "red card";
            }
            
            else {
              title = category;
            }
            return(
              <div
                key={category}
                onClick={() => selectCurrentCategory(category as Category)}
                className={`flex flex-row gap-1.5  relative  items-center  transition-all ease-in duration-100 capitalize  ${isSelected ? "bg-blue-600 text-white" : "text-gray-700 bg-white"}  w-31 rounded-md py-1 px-3 `}>
                <span>{categoryMeta[category as keyof typeof categoryMeta]?.icon }</span>
                <h3 className="text-md  capitalize">{title}</h3>
              
              </div>
            )
          })
          }
      </div>
  )
}

const TypeTransaction = ({selectCurrentType, defaultTypeTransaction}: {selectCurrentType: (type: TransactionType) => void ,defaultTypeTransaction: TransactionType}) => {
  return (
     <div className="flex flex-row  justify-between bg-gray-200 rounded-md shadow-inner-md p-px">
          {
            typeTransactionAvailable.map((type) => {
              let title = "";
              if (type === "credit_card_payment") {
                title = "Payment";
              }else {
                title = type;
              }
              const isSelected = defaultTypeTransaction  === type;

              return(
                <button key={type}
                  onClick={() => selectCurrentType(type)}
                  className={`px-2 py-1 w-22 rounded-md ${isSelected ? "bg-white text-red-600" : "text-gray-700"}    transition-all ease-in duration-100 capitalize `}>{title}</button>
            )})
          }
        </div>
  )
}

const Keyboard = ({
  createTransaction,
  dataTransaction,
  setDataTransaction,
}: {
    createTransaction: () => void;
  dataTransaction: ITransaction;
  setDataTransaction: React.Dispatch<React.SetStateAction<ITransaction>>;
}) => {
  const keyBoard = ["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0", "<"];





 



  const isReadyToSubmit = Number(dataTransaction.amount || 0) > 0 && dataTransaction.title !== "";
 

  const normalize = (value: string) => {
  if (!value || value === "." || value === "0." || value === "" || value === "0.0") {
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
    if (!value.includes(".") && int.length >= 4) return data;

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
 console.log(value);
    return { ...data, amount: value };
  });
};

const handleSubmit = () => {
  

  createTransaction();

};

const validateInput = (key: string) => {
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
            className="h-14 w-28 flex items-center justify-center bg-gray-200 rounded-lg text-lg font-semibold active:scale-95 transition"
          >
            {key === "<" ? "⌫" : key}
          </button>
        ))}
      </div>

      {/* ACTION */}
      <button
        disabled={!isReadyToSubmit}
        onClick={handleSubmit}
        className={`mt-2  h-10 w-full ${isReadyToSubmit ? "bg-blue-400" : "bg-gray-400"} text-white rounded-lg text-base font-semibold`}
      >
        Add Transaction
      </button>
    </div>
  );
};

const HeathersTransactions = ({ setShowModal ,setDataTransaction , dataTransaction , defaultTypeTransaction }: { defaultTypeTransaction: string, dataTransaction: ITransaction, setShowModal: React.Dispatch<React.SetStateAction<boolean>> , setDataTransaction: React.Dispatch<React.SetStateAction<ITransaction>> }) => {
  const selectorRef = useRef<HTMLSelectElement>(null);
  
  
  const addValue = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const value = e.target.value;
    const name = e.target.name;
    setDataTransaction((data) => ({...data, [name]: value}))
  }
  const canSelectMethod = defaultTypeTransaction === "spending"
  return(
    <div className="flex flex-col gap-4 justify-center relative  items-center w-94 mx-auto     rounded-2xl py-4 px-3 ">
        <div className="flex flex-row gap-2 items-center justify-center ">
          
        <label className={`px-2  ${!canSelectMethod ? "w-88 ml-3" : "w-54"} py-1 flex flex-row gap-2 items-center justify-center rounded-md bg-white text-gray-700    transition-all ease-in-out duration-300 capitalize `}>
          <input
            placeholder="Date"
            defaultValue={new Date().toISOString().split("T")[0]}
            type="date" name="date" onChange={addValue} ></input>
          </label>
         {canSelectMethod ? <label>
            <select   ref={selectorRef} defaultValue={dataTransaction.paymentMethod} title="category" name="paymentMethod" onChange={addValue} className="w-32  h-8 border rounded">
              {
              paymentMethodAvailable.map((method) => {
                let tilte = ""
                if (method === "credit_card_blue") {
                  tilte = "Card Blue"
                }else if (method === "credit_card_red") {
                  tilte = "Card Red"
                }
                
                else {
                  tilte = method
                }
                  return(
                    <option key={method} value={method}>{tilte}</option>
                  )
                })
              }
 
            </select>
          </label> : <div className="w-0 h-8"></div>}
     </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-2 py-1 w-full flex flex-row gap-2 items-center justify-center rounded-md bg-white text-gray-700    transition-all ease-in duration-300 capitalize ">
          <span>{ allIcons.note}</span>
           Title and Description
        </button>
       
      </div>
  )
}
