import {
  CATEGORY_META,
  fliterCategoryAvailable,
  type PaymentMethod,
} from "../Models/dummyData";
import { useState, useRef } from "react";
import { Layout } from "../UI/Layout";
import { allIcons } from "../UI/allIicons";
import { useBudgetContext } from "../provide/budget";
import type { Transaction } from "../Models/DataTransactions";
import SelectorContainer from "../UI/SelectorContainer";
import { BiToogleButton } from "../UI/DataShowListCategory";
import { VALID_ROUTES } from "../Routes/routes";
import { useLocation, useNavigate } from "react-router";
import { SubCategoryCard } from "../UI/SubCategoryCard";

const extraFilters = [
  "Mortgage",
  "Spend",
  "Earn",
  "Saved",
  "Cards",
  "Blue Card",
  "Red Card",
  "C.Payment",
];

const AllTransactions = () => {
  const { transactionsData, subcategoriesData } = useBudgetContext();

     const location = useLocation();
  

  



  const [activeHeather, setActiveHeather] = useState(location?.state?.heather || "Summary");
  const [activeFilter, setActiveFilter] = useState(location?.state ?.filter || "All");

  const allSubCategoriesInUse = subcategoriesData.map((s) => s.title).sort((a, b) => a.localeCompare(b))
  const filterHeathers = {
    "Summary": ["All", "Spend", "Earn", "Saved"],
    "Categories": [...fliterCategoryAvailable.map((c) => c)],
    "Cards": ["Cards", "Blue Card", "Red Card", "C.Payment"],
    "Sub Cat": allSubCategoriesInUse,
  }
    
    
   
    
    

  const [search, setSearch] = useState("");
  const inputRer = useRef<HTMLInputElement>(null);

  const currentMonth = new Date().getMonth();
  const currentMonthName = new Date().toLocaleString("en-US", {
    month: "long",
  });
  const [filterByMonth, setFilterByMonth] = useState(true);
  const navigate = useNavigate();
  const dataForTransactions = transactionsData; //.filter(t => fliterCategoryAvailable.includes(t.category));

  const filtered = makeFilter({
    search,
    activeFilter,
    dataForTransactions,
    allSubCategoriesInUse
  });

  const groups: Record<string, Transaction[]> = groupByDate(
    filtered,
    currentMonth,
    filterByMonth,
  );

  const resetSearch = () => {
    setSearch("");
    setActiveFilter("All");
    setActiveHeather("Summary");
    if (inputRer.current) {
      inputRer.current.value = "";
    }
  };

  const manualNavigation = (data: Transaction) => {
    navigate(VALID_ROUTES.details, { state: { transaction: data } });
  };

  const hasFilterActive = search.length > 1 || activeFilter !== "All";
  const totalForFilter = filtered.reduce((acc, value) => {
    const data = new Date(value.date);
    if (filterByMonth && data.getMonth() !== currentMonth) return acc;
    return (acc += value.amount);
  }, 0);
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

          <div className="flex gap-2 mt-2  flex-row items-center justify-between w-90 sm:w-160 mx-auto">
            <input
              ref={inputRer}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Search"
              className="bg-gray-50 border border-gray-300 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 sm:w-140 p-2.5"
            />
            <button
              onClick={resetSearch}
              className={`${
                hasFilterActive
                  ? "text-white bg-red-500 border-white shadow"
                  : "text-gray-500 bg-gray-200 border-gray-500 "
              } border  size-10 rounded-full flex justify-center items-center `}
            >
              {allIcons.trashCan}
            </button>
          </div>
        </div>

        {/* HEADER */}
        <div className="sticky w-92 sm:w-160 mx-auto top-0  backdrop-blur-xl border-b border-black/10 px-2 pt-2 pb-1">
          <div className="flex justify-between items-end">
            <h1 className="text-xl font-semibold text-gray-900">Categories</h1>
   
            {hasFilterActive && (
              <p className="text-sm font-light pb-px ">
                TOTAL: {totalForFilter.toFixed(2)}
              </p>
            )}
            <BiToogleButton
              data={[true, false]}
              title={["Month", "All"]}
              valueSort={filterByMonth}
              setSortToggle={setFilterByMonth}
            />
          </div>
          {/* FILTER */}
          <div className="   rounded-md mt-2 flex flex-col gap-1 ">
            <div className="flex flex-row gap-2">
               {Object.keys(filterHeathers).map((filter) => {
              return (
                <section
                  className={`px-3 py-1 text-[14px]  font-semibold rounded-md cursor-pointer ${filter === activeHeather ? "bg-white text-blue-500" : "bg-gray-200 text-gray-600"}`}
                  onClick={() => { setActiveHeather(filter);  setActiveFilter(filterHeathers[filter as keyof typeof filterHeathers][0]);}}
                  key={filter}
                >
                  {filter}
                </section>
              );
            })}
            </div>
            <div className="max-h-20 overflow-scroll mx-auto rounded-md ">
            <SelectorContainer
              options={
                filterHeathers[activeHeather as keyof typeof filterHeathers] || []
                  
              }
              selecteOption={activeFilter}
              changeOtion={(t) => {
                setActiveFilter(t);
                setSearch("");
                if (inputRer.current) inputRer.current.value = "";
              }}
               
              />
              </div>
          </div>
        </div>

        <div className="h-110 w-88 sm:w-160   overflow-scroll rounded-b-2xl    mx-auto ">
          {/* LIST */}
          {Object.entries(groups)
            .sort((a, b) => b[0].localeCompare(a[0]))
            .map(([date, items]) => (
              <div key={date} className="mt-1  w-88 ">
                <h2 className="px-5 text-xs h-8 w-86  sm:w-160  font-semibold text-gray-400 uppercase sticky top-0 bg-[#f2f2f7]/00 backdrop-blur-sm flex items-center  ">
                  {date}
                </h2>
                <section className="bg-white px-2 rounded-xl sm:w-160">
                  <div className="   overflow-hidden divide-y divide-gray-200 ">
                    {items
                      .sort(
                        (a, b) =>
                          Date.parse(String(b.date)) -
                          Date.parse(String(a.date)),
                      )
                      .map((txn) => {
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
                              // console.log(txn);
                              manualNavigation(txn);
                            }}
                          >
                            {/* ICON */}
                            <div
                              style={{ backgroundColor: meta.bg + "30" }}
                              className={`w-10 h-10 flex items-center justify-center rounded-full bg-d bg- [$}d]`}
                            >
                              <span className="text-lg">{meta.icon}</span>
                            </div>

                            {/* TEXT */}
                            <div className="flex-1 min-w-0 flex flex-col ">
                              <p className="text-md font-medium text-gray-900 truncate w-44 h-6 capitalize  text-ellipsis">
                                {txn.title}{" "}
                                {txn.porcentage > 0 && (
                                  <span className="text-[10px] text-gray-400 h-4">
                                    {txn.amount / txn.porcentage} x{" "}
                                    {txn.porcentage.toFixed(2)}
                                  </span>
                                )}
                              </p>

                              <p className="text-xs text-gray-500 truncate w-44  text-ellipsis">
                                {txn.description}
                              </p>
                              <div className="flex gap-1   p-px capitalize">
                                {txn.subcategory.map(
                                  (subCategory: string, i) => {
                                    if (subCategory != "" && i < 2) {
                                      return (
                                        <SubCategoryCard
                                          key={subCategory}
                                          subCategory={subCategory}
                                          onClick={() => {}}
                                        />
                                      );
                                    }
                                    if (subCategory != "" && i == 2) {
                                      return (
                                        <span
                                          key={subCategory}
                                          className="   h-5 text-[10px] px-2 py-0.5 rounded-sm bg-gray-100 text-gray-600 border border-gray-300"
                                        >
                                          ...
                                        </span>
                                      );
                                    }
                                    if (subCategory == "" || i >= 3)
                                      return null;
                                  },
                                )}
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

const makeFilter = ({
  search,
  activeFilter,
  dataForTransactions,
  allSubCategoriesInUse,
}: {
  search: string;
  activeFilter: string;
    dataForTransactions: Transaction[];
  allSubCategoriesInUse: string[];
}): Transaction[] => {
  const minimunSearch = 3;

  if (search.length >= minimunSearch) {
    return dataForTransactions.filter(
      (t) =>
        t.title.toLowerCase().includes(search.toLowerCase()) ||
        t.description.toLowerCase().includes(search.toLowerCase()) ||
        t.category.toLowerCase().includes(search.toLowerCase()) ||
        t.subcategory.join(" ").toLowerCase().includes(search.toLowerCase()) ||
        t.paymentMethod.toLowerCase().includes(search.toLowerCase()),
    );
  }
 

  if (activeFilter === "All") {
    return dataForTransactions;
  }
  if (allSubCategoriesInUse.includes(activeFilter)) {
   
   
    return dataForTransactions.filter(
      (t) =>
        t.subcategory.includes(activeFilter) 
    );
  }
  if (!extraFilters.includes(activeFilter)) {
    return dataForTransactions.filter((t) => t.category === activeFilter);
  }
 
  if (activeFilter === "Spend") {
    return dataForTransactions.filter((t) => t.type === "spending" || t.category === "mortgage_payment");
  }
  if (activeFilter === "Earn") {
    return dataForTransactions.filter(
      (t) =>
        t.paymentMethod === "paycheck" ||
        t.type == "sell_crypto" ||
        t.type == "sell_stocks",
    );
  }
  if (activeFilter === "Saved") {
    return dataForTransactions.filter((t) => t.type === "saving");
  }
  if (activeFilter === "C.Payment") {
    return dataForTransactions.filter(
      (t) =>
        t.type === "credit_card_payment" &&
        t.category !== "mortgage_payment" &&
        t.category !== "checking",
    );
  }
  // """" ""

  
  



  if (activeFilter === "Cards") {
    return dataForTransactions.filter(
      (t) =>
        t.paymentMethod === "credit_card_red" ||
        t.paymentMethod === "credit_card_blue",
    );
  }
  if (activeFilter === "Red Card") {
    return dataForTransactions.filter(
      (t) => t.paymentMethod === "credit_card_red",
    );
  }
  if (activeFilter === "Blue Card") {
    return dataForTransactions.filter(
      (t) => t.paymentMethod === "credit_card_blue",
    );
  }

  return [];
};

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
  if (
    txn.type === "transaction_savings_to_mortgage" ||
    txn.type === "transaction_mortgage_to_savings"
  ) {
    return { color: "text-yellow-700", sign: "" };
  }
  if (
    txn.type === "sell_stocks" ||
    txn.type == "sell_crypto" ||
    txn.category === "sell_assets"
  ) {
    return { color: "text-[#3c9f03]", sign: "+" };
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
  savings_account: "Savings DCU",
  cash: "Cash",
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
