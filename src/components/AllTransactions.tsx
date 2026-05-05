import {
  CATEGORY_META,
  fliterCategoryAvailable,
  type PaymentMethod,
  type Subcategory,
} from "../Models/dummyData";
import { useState, useRef } from "react";
import { Layout } from "../UI/Layout";
import { allIcons } from "../UI/allIicons";
import { useBudgetContext } from "../provide/budget";
import type { Transaction } from "../Models/DataTransactions";
import SelectorContainer from "../UI/SelectorContainer";
import { BiToogleButton } from "../UI/DataShowListCategory";
import { VALID_ROUTES } from "../Routes/routes";
import { useNavigate } from "react-router";
import { SubCategoryCard } from "../UI/SubCategoryCard";

const extraFilters = ["mortgage", "Spend", "Earn", "Saved"];
const AllTransactions = () => {
  const { transactionsData } = useBudgetContext();
  const [activeFilter, setActiveFilter] = useState("All");

  const [search, setSearch] = useState("");
  const inputRer = useRef<HTMLInputElement>(null);
  const minimunSearch = 3;
  const currentMonth = new Date().getMonth();
  const currentMonthName = new Date().toLocaleString("en-US", {
    month: "long",
  });
  const [filterByMonth, setFilterByMonth] = useState(true);
  const navigate = useNavigate(); 
  const dataForTransactions = transactionsData; //.filter(t => fliterCategoryAvailable.includes(t.category));

  const makeFilter = (): Transaction[] => {
    if (search.length >= minimunSearch) {
      return dataForTransactions.filter(
        (t) =>
          t.title.toLowerCase().includes(search.toLowerCase()) ||
          t.description.toLowerCase().includes(search.toLowerCase()) ||
          t.category.toLowerCase().includes(search.toLowerCase()) ||
          t.subcategory
            .join(" ")
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          t.paymentMethod.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (activeFilter === "All") {
      return dataForTransactions;
    }
    if (!extraFilters.includes(activeFilter)) {
      return dataForTransactions.filter((t) => t.category === activeFilter);
    }
    if (activeFilter === "mortgage") {
      return dataForTransactions.filter((t) => t.category === "mortgage");
    }
    if (activeFilter === "Spend") {
      return dataForTransactions.filter((t) => t.type === "spending");
    }
    if (activeFilter === "Earn") {
      return dataForTransactions.filter((t) => t.paymentMethod === "paycheck");
    }
    if (activeFilter === "Saved") {
      return dataForTransactions.filter((t) => t.type === "saving");
    }

    return [];
  };

  const filtered = makeFilter();

  const groups: Record<string, Transaction[]> = groupByDate(
    filtered,
    currentMonth,
    filterByMonth,
  );

  const resetSearch = () => {
    setSearch("");
    // setActiveFilter("All");
    if (inputRer.current) {
      inputRer.current.value = "";
    }
  };

   const manualNavigation = (data: Transaction) => {
      navigate(VALID_ROUTES.Details ,{ state: { transaction: data } }) 
    }

  return (
    <Layout>
      <div className="   mx-auto">
        <div className="sticky top-0  bg-white p-4 ">
          <div className="flex flex-row gap-4 pl-2 pt-4  relative  items-center  ">
            <h3 className="text-3xl font-bold ">Transactions</h3>
            <h6 className="text-3xl font-light text-gray-600 ">
              {" "}
              {currentMonthName}
            </h6>
          </div>

          <div className="flex gap-2 mt-2  flex-row items-center justify-between w-90 mx-auto">
            <input
              ref={inputRer}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Search"
              className="bg-gray-50 border border-gray-300 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 p-2.5"
            />
            <button
              onClick={resetSearch}
              className={`${search.length < 1 ? "text-gray-400" : "text-red-400"}  bg-gray-700 size-10 rounded-full flex justify-center items-center `}
            >
              {allIcons.trashCan}
            </button>
          </div>
        </div>

        {/* HEADER */}
        <div className="sticky w-92 mx-auto top-0  backdrop-blur-xl border-b border-black/10 px-2 pt-2 pb-4">
          <div className="flex justify-between items-end">
            <h1 className="text-xl font-semibold text-gray-900">Categories</h1>

            <BiToogleButton
              data={[true, false]}
              title={["Month", "All"]}
              valueSort={filterByMonth}
              setSortToggle={setFilterByMonth}
            />
          </div>

          <SelectorContainer
            options={[
              "All",
              ...fliterCategoryAvailable.map((c) => c),
              ...extraFilters,
            ]}
            selecteOption={activeFilter}
            changeOtion={(t) => {
              setActiveFilter(t);
              setSearch("");
              if (inputRer.current) inputRer.current.value = "";
            }}
          />

          {/* FILTER */}
        </div>

        <div className="h-110 w-88   overflow-scroll rounded-b-2xl    mx-auto ">
          {/* LIST */}
          {Object.entries(groups)
            .sort((a, b) => {
              const parse = (str: string) => {
                const [month, day, year] = str.split(" ");
                return new Date(`${month} ${day}, ${year}`).getTime();
              };

              return parse(b[0]) - parse(a[0]); // 🔥 DESC (más reciente primero)
            })
            .map(([date, items]) => (
              <div key={date} className="mt-1 w-87  ">
                <h2 className="px-5 text-xs h-8  font-semibold text-gray-400 uppercase sticky top-0 bg-[#f2f2f7]/00 backdrop-blur-sm flex items-center  ">
                  {date}
                </h2>
                <section className="bg-white px-2 rounded-xl">
                  
                <div className="   overflow-hidden divide-y divide-gray-200 ">
                  {items.sort((a, b) => Date.parse(String(b.date)) - Date.parse(String(a.date))).map((txn) => {
                    const meta = CATEGORY_META[
                      txn.category as keyof typeof CATEGORY_META
                    ] || {
                      icon: "💳",
                      bg: "bg-gray-100",
                    };
                    const { color, sign } = getTxnAmountStyle(txn);

                    return (
                      <div
                        key={txn.id}
                        className="flex items-center gap-3 py-1 px-4"
                        onClick={() => {
                          manualNavigation(txn)
                    
                        }}
                      >
                        {/* ICON */}
                        <div
                        style={{backgroundColor:meta.bg + "30"}}
                          className={`w-10 h-10 flex items-center justify-center rounded-full bg-d bg- [$}d]`}
                        >
                          <span className="text-lg">{meta.icon}</span>
                        </div>

                        {/* TEXT */}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate w-44 capitalize  text-ellipsis">
                            {txn.title}
                          </p>

                          <p className="text-xs text-gray-500 truncate w-44  text-ellipsis">
                            {txn.description}
                          </p>
                          <div className="flex gap-1   p-px capitalize">
                            {txn.subcategory.map((subCategory:string , i) => {
                              if (subCategory != "" && i < 2) {
                               
                                return (
                                  <SubCategoryCard key={subCategory} subCategory={subCategory as Subcategory} showIcon={false} onClick={()=>{}}/>
                                );
                              }
                              if (subCategory != "" && i == 2) {
                                return (
                                  <span
                                    key={subCategory}
                                    className="inline-block h-4 text-[10px] px-2 py-0.5 rounded-md bg-gray-100 text-gray-600"
                                  >
                                    ...
                                  </span>
                                );
                              }
                              if (subCategory == "" || i >= 3) return null;
                            })}
                          </div>
                        </div>

                        {/* AMOUNT */}
                        <div className="text-right pb-6">
                          {
                            <p className={`text-md font-semibold ${color}`}>
                              {sign} {formatAmount(txn.amount)}
                            </p>
                          }

                          <p className="text-[11px] text-gray-400">
                            {
                              paymentLabels[
                                txn.paymentMethod as keyof typeof paymentLabels
                              ]
                            }
                          </p>
                        </div>

                        {/* chevron */}
                        <span className="text-gray-300 text-lg">›</span>
                      </div>
                    );
                  })}
                </div>

                  </section>
              </div>
            ))}
          <div className=" w-full h-20"></div>
        </div>
      </div>
    </Layout>
  );
};

export default AllTransactions;

function getTxnAmountStyle(txn: Transaction) {
  if (
    txn.paymentMethod === "paycheck" &&
    txn.type === "credit_card_payment" &&
    txn.category === "checking"
  ) {
    return { color: "text-green-600", sign: "+" };
  }

  if (txn.type === "saving") {
    return { color: "text-blue-600", sign: "" };
  }

  return { color: "text-red-600", sign: "-" };
}

const paymentLabels: Record<PaymentMethod, string> = {
  credit_card_red: "Card •• Red",
  credit_card_blue: "Card •• Blue",
  paycheck: "Paycheck",
  checking: "Checking",
  mortgage: "Mortgage Account",
  cards_payment: "Card payment",
  savings_account: "Savings DCU"
};

function formatAmount(n: number) {
  const abs = Math.abs(n).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return "$ " + abs;
}



function groupByDate(
  txns: Transaction[],
  currentMonth: number,
  filter: boolean = false,
): Record<string, Transaction[]> {
  return txns.reduce(
    (acc, t) => {
      // ✅ SAFE parsing (no timezone issues)
      const dateToString = new Date(t.date).toISOString().split("T")[0];
      
     


      const [_, month] = dateToString.split("-").map(Number);

      const monthIndex = month - 1; // JS months are 0-based

      // ✅ correct filter
      if (filter && monthIndex !== currentMonth) return acc;
     
 

      const key = dateToString;
     

      if (!acc[key]) acc[key] = [];
      acc[key].push(t);

      return acc;
    },
    {} as Record<string, Transaction[]>,
  );
}
