import { categoryMeta, fliterCategoryAvailable, transactionsAll, type Transaction } from "../Models/dummyData";
import { useState ,useRef } from "react";
import { Layout } from "../UI/Layout";
import { allIcons } from "../UI/allIicons";


const AllTransactions = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");
  const inputRer = useRef(null)
  const minimunSearch = 3;
  const currentMonth = new Date().getMonth();
  const currentMonthName = new Date().toLocaleString("en-US", { month: "long" });
  const dataForTransactions = transactionsAll.map(t => {
    
    
    const [y, m, d] = t.date as string ? t.date?.split("-").map(Number) : [0, 0, 0];
  

  return {
    ...t,
    amount: Math.abs(t.amount),
    date: new Date(y, m - 1, d), // local time ✅
  };
}).filter(t => fliterCategoryAvailable.includes(t.category));

  const types = ["All", ...fliterCategoryAvailable];

  const filtered: Transaction[] = search.length < minimunSearch ?
    activeFilter === "All"
      ? dataForTransactions
      : dataForTransactions.filter((t) => t.category === activeFilter)
    : dataForTransactions.filter((t) => t.title.toLowerCase().includes(search.toLowerCase()) || t.description.toLowerCase().includes(search.toLowerCase()));

  const groups: Record<string, Transaction[]> = groupByDate(filtered , currentMonth);



  const resetSearch = () => {
    setSearch("");
    setActiveFilter("All");
    if (inputRer.current) {
      inputRer.current.value = "";
    inputRer.current.focus();
   }
  };

  return(
    <Layout>
      <div className="   mx-auto">
        <div className="sticky top-0  bg-white p-4 ">
    
          
            <div className="flex flex-row gap-4 pl-2 pt-4  relative  items-center  ">
              <h3 className="text-3xl font-bold ">Transactions</h3>
            <h6 className="text-3xl font-light text-gray-600 "> {currentMonthName}</h6>
      </div>
         

          <div className="flex gap-2 mt-4">
             <input
  ref={inputRer}
  onChange={(e) => setSearch(e.target.value)}
  type="text"
  placeholder="Search"
  className="bg-gray-50 border border-gray-300 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-78 p-2.5"
/>
            <button
              onClick={resetSearch}
              className={`${search.length < 1 ? "text-gray-400" : "text-red-400" }  `}>{allIcons.trashCan}</button> 
         </div>
        </div>


      {/* HEADER */}
      <div className="sticky w-92 mx-auto top-0 bg-[#f2f2f7]/80 backdrop-blur-xl border-b border-black/10 px-5 pt-2 pb-4">
        <div className="flex justify-between items-end">
          <h1 className="text-xl font-semibold text-gray-900">
            Categories
          </h1>

          <span className="bg-green-500 text-white text-xs font-semibold px-2 py-1 w-18 text-center rounded-full">
            {filtered.length} items
          </span>
        </div>

        {/* FILTER */}
        <div className="grid grid-cols-4 gap-2 mt-4">
          {types.map((t) => (
            <button
              key={t}
              onClick={() => { setActiveFilter(t); setSearch(""); inputRer.current.value = ""  }}
              className={`px-3 py-1 text-sm rounded-full border whitespace-nowrap transition overflow-hidden
                ${
                  activeFilter === t
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-white text-gray-700 border-gray-200"
                }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* SUMMARY */}
      {/* <div className="flex gap-2 px-5 mt-4">
        <div className="flex-1 bg-white rounded-xl p-3">
          <p className="text-xs text-gray-400 uppercase">Spent</p>
          <p className="text-lg font-semibold text-red-500">
            {formatAmount(spent)}
          </p>
        </div>

        <div className="flex-1 bg-white rounded-xl p-3">
          <p className="text-xs text-gray-400 uppercase">Earned</p>
          <p className="text-lg font-semibold text-green-500">
            {formatAmount(earned)}
          </p>
        </div>

        <div className="flex-1 bg-white rounded-xl p-3">
          <p className="text-xs text-gray-400 uppercase">Net</p>
          <p
            className={`text-lg font-semibold ${
              net < 0 ? "text-red-500" : "text-green-500"
            }`}
          >
            {formatAmount(net)}
          </p>
        </div>
      </div> */}

        <div className="h-110 w-97  overflow-scroll rounded-b-2xl mt-1   m-auto ">
            {/* LIST */}
      {Object.entries(groups).sort((a, b) => new Date(b[0]).getTime() - new Date(a[0]).getTime()) .map(([date, items]) => (
        <div key={date} className="mt-1 w-94">
          <h2 className="px-5 text-xs h-8  font-semibold text-gray-400 uppercase sticky top-0 bg-[#f2f2f7]/00 backdrop-blur-sm flex items-center  ">
            {date}
          </h2>

          <div className=" bg-white rounded-xl overflow-hidden divide-y divide-gray-100 ">
            {items.map((txn) => {
              const meta = categoryMeta[txn.category as keyof typeof categoryMeta] || {
                icon: "💳",
                bg: "bg-gray-100",
              };

              return (
                <div
                  key={txn.id}
                  className="flex items-center gap-3 p-4"
                  onClick={() => console.log(txn)}
                >
                  {/* ICON */}
                  <div
                    className={`w-10 h-10 flex items-center justify-center rounded-full ${meta.bg}`}
                  >
                    <span className="text-lg">{meta.icon}</span>
                  </div>

                  {/* TEXT */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {txn.title}
                    </p>

                    <p className="text-xs text-gray-500 truncate">
                      {txn.description}
                    </p>

                    <span className="inline-block mt-1 text-[11px] px-2 py-0.5 rounded bg-gray-100 text-gray-600">
                      {txn.subcategory.replaceAll("_", " ")}
                    </span>
                  </div>

                  {/* AMOUNT */}
                  <div className="text-right pb-6">
                    <p
                      className={`text-md font-semibold text-gray-800`}
                    >
                      {formatAmount(txn.amount)}
                    </p>

                    <p className="text-[11px] text-gray-400">
                      {paymentLabels[txn.paymentMethod as keyof typeof paymentLabels]}
                    </p>
                  </div>

                  {/* chevron */}
                  <span className="text-gray-300 text-lg">›</span>
                </div>
              );
            })}
          </div>
        </div>
      ))}
            </div>
    </div>
      
    </Layout>
    )
};

export default AllTransactions; 











const paymentLabels = {
  credit_card_red: "Visa •• Red",
  credit_card_blue: "Visa •• Blue",
  debit_card: "Debit Card",
  cash: "Cash",
  bank_transfer: "Bank Transfer",
};

function formatAmount(n : number) {
  const abs = Math.abs(n).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return  "$ " + abs;
}

function formatDate(d : Date | string) {
  return new Date(d).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function groupByDate(txns: Transaction[] , currentMonth: number) {
  const data = txns.reduce((acc, t) => {
    const key = formatDate(t.date);
    
      const month = new Date(t.date).getMonth();
      if (month !== currentMonth) return acc;
    
    if (!acc[key]) acc[key] = [];
    acc[key].push(t);
    return acc;
  }, {
     
  } as Record<string, Transaction[]>);

  return data;
}


// function groupByDate(txns) {
//   return txns.reduce((acc, t) => {
//     const key = formatDate(t.date); // already Date object
//     if (!acc[key]) acc[key] = [];
//     acc[key].push(t);
//     return acc;
//   }, {});
// }

