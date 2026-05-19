import { Layout } from "../UI/Layout";
import HeatherView from "../UI/HeatherView";
import { useState } from "react";

import {

  getSubCategoryFor,
  getSubCategoryMeta,


  type Subcategory,

} from "../Models/subCateriesAvailable";

import {
  fliterCategoryAvailable,

  type Category,
  type PaymentMethod,

  type TransactionType,
} from "../Models/dummyData";
import { Transaction } from "../Models/DataTransactions";
import { useBudgetContext } from "../provide/budget";
import { VALID_ROUTES } from "../Routes/routes";
import { MultipleAcctionButtons } from "./addNewTransactions/Keyboard";
import { SubCategoryCard } from "../UI/SubCategoryCard";
import { SelectDateGlobal } from "../UI/SelectDateGlobal";




interface IMultiTrnsaction {
  amount: string;
  category: Category | "";
  type: TransactionType | "";
  title: string | null;
  description: string;
  paymentMethod: PaymentMethod | "";
  subcategory: Subcategory[];
  isReaddy: boolean;
  id?: string;
  date?: string;
}

const emptyData: IMultiTrnsaction = {
  amount: "",
  title: "",
  id: "",
  description: "",
  category: "",
  type: "",
  isReaddy: false,
  paymentMethod: "",
  subcategory: [],
};

const MultiTransactions = () => {
  const { saveMultipleTransaction } = useBudgetContext();
  const minRow = 2;
  const [numberTransactions, setNumberTransactions] = useState(minRow);
  const [allNewsTransactions, setAllNewTransactions] = useState<
    IMultiTrnsaction[]
  >(Array.from({ length: minRow }, () => ({ ...emptyData })));
  const maxRow = 10;
  const [dateForRow, setDateForRow] = useState(new Date().toISOString().split("T")[0]);

  const handleRows = (action: "+" | "-") => {
    setAllNewTransactions((prev) => {
      if (action === "+" && prev.length < maxRow) {
        return [...prev, { ...emptyData }];
      }

      if (action === "-" && prev.length > minRow) {
        return prev.slice(0, -1);
      }

      return prev;
    });

    setNumberTransactions((prev) => {
      if (action === "+" && prev < maxRow) return prev + 1;
      if (action === "-" && prev > minRow) return prev - 1;
      return prev;
    });
  };

  const ressetAllRow = () => {
    setAllNewTransactions([]);
    setTimeout(() => {
      setAllNewTransactions(
        Array.from({ length: minRow }, () => ({ ...emptyData })),
      );
    }, 50);
  };

  const setAllBillatInce = () => {
    setAllNewTransactions([]);
    const data = getSubCategoryFor("bills");
    //

    const billsData = data
      .map((element) => {
        if (element != "mortgage" ) {
          return {
            amount: "",
            title: `${element}'s pay  `,
            id: "",
            description: `Bill ${dateForRow}`,
            category: "bills",
            type: "",
            isReaddy: false,
            paymentMethod:element == "cel_tmobil" ? "checking" : "credit_card_red",
            subcategory: [element],
          };
        }
      })
      .filter(Boolean);
    setAllNewTransactions(billsData as IMultiTrnsaction[]);
  };

  const createMultipleTransactions = () => {
    const dataTransactions = allNewsTransactions.map((data) => {
      const newData = {
        id: crypto.randomUUID(),
        date: new Date(dateForRow),
        title: data.title || "",
        description: data.description,
        amount: Number(data.amount),
        category: data.category as Category,
        type: "spending" as TransactionType,
        paymentMethod: data.paymentMethod as PaymentMethod,
        subcategory: data.subcategory,
      };

      return new Transaction(newData);
    });
    saveMultipleTransaction(dataTransactions, ressetAllRow);
  };

  const isReadyAllRow = allNewsTransactions.every((t) => t.isReaddy);
  return (
    <Layout>
      <HeatherView title="Multi Transactions" />
      <section className="pt-4 relative max-w-94 flex flex-col gap-4 justify-center  mx-auto  ">
        <section className="flex   rounded-md px-4 py-2 gap-2 h-20 justify-between bg-white relative  ">
          <p className="font-semibold text-xl">
            {numberTransactions}/{maxRow}{" "}
          </p>
          <label className="border rounded px-1 shadow-sm bg-white h-8 flex ">
            <SelectDateGlobal
              lastDate={dateForRow}
              addValue={(e:any) => setDateForRow(e.target.value)}
              className="text-gray-600"
            />
          </label>
          <div className="flex flex-col gap-2">
            <div className="border w-34 flex p-px rounded-md text-gray-600 gap-px bg-gray-400">
              <button
                onClick={() => handleRows("+")}
                className="w-1/2 bg-gray-100 rounded-l-sm"
              >
                {"+"}
              </button>

              <button
                onClick={() => handleRows("-")}
                className="w-1/2 bg-gray-100 rounded-r-sm"
              >
                {"-"}
              </button>
            </div>
            <div className="border w-34  flex p-px rounded-md text-gray-600 gap-px bg-gray-400 ">
              <button
                onClick={setAllBillatInce}
                className="w-1/2 bg-gray-100 rounded-l-sm"
              >
                Bills
              </button>
              <button
                onClick={ressetAllRow}
                className="w-1/2 bg-gray-100 rounded-r-sm"
              >
                Reset
              </button>
            </div>
          </div>
        </section>
        <section className="flex  flex-col   pb-10 gap-2 overflow-y-auto rounded-xl h-120  ">
          <div className="bg-white rounded-md px-4">
            {allNewsTransactions.map((dataRow, i) => (
              <RowNewTransactions
                key={i}
                dataRow={dataRow}
                positionInList={i}
                setAllNewTransactions={setAllNewTransactions}
              />
            ))}
          </div>
        </section>

        <div className="absolute bottom-5 left-3  gap-2 flex ">
          <MultipleAcctionButtons
            bt1={{ title: "<", path: VALID_ROUTES.Add }}
            bt2={{
              title: "Add Transactions",
              action: createMultipleTransactions,
              validator: isReadyAllRow,
            }}
          />
        </div>
      </section>
    </Layout>
  );
};

const RowNewTransactions = ({
  positionInList,
  setAllNewTransactions,
  dataRow,
}: {
  dataRow: IMultiTrnsaction;
  positionInList: number;
  setAllNewTransactions: React.Dispatch<
    React.SetStateAction<IMultiTrnsaction[]>
  >;
}) => {
  const onChange = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;

    setAllNewTransactions((prev) => {
      const copy = [...prev];

      // ✅ apply change first
      const updatedRow = {
        ...copy[positionInList],
        [name]: value,
      };

      // ✅ validate using updated data
      const isReady =
        updatedRow.amount !== "" &&
        updatedRow.title !== "" &&
        updatedRow.category !== "" &&
        updatedRow.paymentMethod !== "";

      // ✅ store result
      copy[positionInList] = {
        ...updatedRow,
        isReaddy: isReady,
      };

      return copy;
    });
  };

  const updateSubCategories = (sc: Subcategory) => {
    setAllNewTransactions((prev) => {
      const copy = [...prev];

      const current = copy[positionInList];

      const alreadyExists = current.subcategory.includes(sc);

      const updatedSubcategories = alreadyExists
        ? current.subcategory.filter((s) => s !== sc) // remove
        : [...current.subcategory, sc]; // add

      copy[positionInList] = {
        ...current,
        subcategory: updatedSubcategories,
      };

      return copy;
    });
  };

  const payCardas = ["credit_card_red", "credit_card_blue"];
  return (
    <div className="border-b border-black/10  h- gap-3 w-full flex flex-col py-2 relative">
      <span
        className={`absolute -right-2 top-2 size-4 ${dataRow.isReaddy ? "bg-green-500" : "bg-red-500"} rounded-full `}
      ></span>

      <div className="flex  gap-2">
        <p className=" w-12 text-3xl font-bold text-center pt-3">
          {positionInList + 1}
        </p>
        <MyInputText
          onChange={onChange}
          name="title"
          defaulvalue={dataRow.title ?? ""}
        />
        <MyInputText
          onChange={onChange}
          name="description"
          defaulvalue={dataRow.description ?? ""}
        />
      </div>
      <div className="flex  gap-2">
        {/* <MySelector onChange={onChange} data={typeTransactionAvailable} title="Type" name="type"/>  */}
        <MySelector
          onChange={onChange}
          data={
            dataRow.category == "bills" ? [dataRow.paymentMethod] : payCardas
          }
          title={"pay "}
          name="paymentMethod"
        />
        <MySelector
          onChange={onChange}
          data={
            dataRow.category == "bills"
              ? ["bills"]
              : fliterCategoryAvailable.filter((c) => c !== "bills")
          }
          title="category"
          name="category"
        />
        <MyInputAmount onChange={onChange} />
      </div>
      <div className="flex flex-wrap   gap-2 text-[12px]">
        {getSubCategoryFor(dataRow.category as Category).map((subCategory) => {
          if (subCategory == "mortgage") return;
          const meta = getSubCategoryMeta(subCategory);

          if (!dataRow.subcategory.includes(subCategory)) {
            return (
              <span
                onClick={() => updateSubCategories(subCategory)}
                className={`  bg-gray-200 border border-gray-500 text-gray-500  opacity-60 px-4 rounded capitalize`}
                key={subCategory}
              >
                {meta.label}
              </span>
            );
          }

          return (
            <SubCategoryCard
              subCategory={subCategory}
              key={subCategory}
              onClick={() => updateSubCategories(subCategory)}
            />
          );
        })}
      </div>
    </div>
  );
};

const MyInputAmount = ({ onChange }: { onChange: (e: any) => void }) => {
  return (
    <section className="flex flex-col gap-1  relative group">
      <span
        className=" 2 text-sm transition-all duration-200  
          pointer-events-none text-gray-500
          group-focus-within:-top-px  group-focus-within:text-blue-500 group-focus-within:bg-white"
      >
        Amount
      </span>
      <input
        name="amount"
        onChange={onChange}
        className="border border-gray-400 w-27 px-2 rounded  "
        placeholder="$10,000.00"
        type="number"
      />
    </section>
  );
};

const MySelector = ({
  title,
  name,
  data,
  onChange,
}: {
  title: string;
  name: string;
  data: string[];
  onChange: (e: any) => void;
}) => {
  const [value, setValue] = useState("");

  return (
    <section className="flex flex-col gap-1  relative group">
      <span
        className=" 2 text-sm transition-all duration-200  
        pointer-events-none text-gray-500
        
        group-focus-within:-top-px  group-focus-within:text-blue-500 group-focus-within:bg-white"
      >
        {title}
      </span>

      <select
        name={name}
        defaultValue={"hello"}
        value={value}
        onChange={(e) => {
          onChange(e);
          setValue(e.target.value);
        }}
        className="border border-gray-300 w-26 px-1 rounded"
      >
        {data.map((selectOption, i) => {
          let title = selectOption;

          if (title == "credit_card_red") {
            title = "Red Card";
          }
          if (title == "credit_card_blue") {
            title = "Blue Card";
          }
          return (
            <>
              {data.length > 1 && i == 0 && (
                <option key={crypto.randomUUID()}></option>
              )}
              <option key={crypto.randomUUID()} value={selectOption}>
                {title}
              </option>
            </>
          );
        })}
      </select>
    </section>
  );
};

const MyInputText = ({
  name,
  onChange,
  defaulvalue,
}: {
  name: string;
  onChange: (e: any) => void;
  defaulvalue: string;
}) => {
  return (
    <label className="flex flex-col gap-1  relative group">
      <span
        className=" left-2 text-sm transition-all duration-200  
            pointer-events-none text-gray-500
            
            group-focus-within:-top-px text-xs group-focus-within:text-blue-500 group-focus-within:bg-white"
      >
        {name}
      </span>
      <input
        defaultValue={defaulvalue}
        name={name}
        onChange={(e) => onChange(e)}
        className="border-gray-300 border rounded-sm h-6 w-34 bg-transparent px-2 py-1 outline-none focus:border-blue-500"
        type="text"
      />
    </label>
  );
};

export default MultiTransactions;
