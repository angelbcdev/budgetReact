import type { Transaction } from "../../Models/DataTransactions";
import type { Category } from "../../Models/dummyData";

const extraFilters = [
  // "Mortgage",
  "Spend",
  "Earn",
  "Saved",
  "Cards",
  "Blue Card",
  "Red Card",
  "C.Payment",
];
export const makeFilter = ({
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
    return dataForTransactions.filter((t) =>
      t.subcategory.includes(activeFilter),
    );
  }
  if (!extraFilters.includes(activeFilter)) {
    return dataForTransactions.filter((t) => t.category === activeFilter);
  }

  if (activeFilter === "Spend") {
    return dataForTransactions.filter(
      (t) => t.type === "spending" || t.category === "mortgage_payment",
    );
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

export const nameMonths = {
  "01": "January",
  "02": "February",
  "03": "March",
  "04": "April",
  "05": "May",
  "06": "June",
  "07": "July",
  "08": "August",
  "09": "September",
  "10": "October",
  "11": "November",
  "12": "December",
};

export type ChartBar = {
  label: string;
  value: string;
};

type ChartDataByMonth = Record<string, ChartBar[]>;

const getMonthName = (month: number) =>
  nameMonths[String(month + 1).padStart(2, "0") as keyof typeof nameMonths];
export function createChartData({
  group,
  dataForTransactions,
  search,
  allSubCategoriesInUse,
  filterHeaders,
  filterMonth = false,
  currentMonth,
}: {
  group: "Summary" | "Categories" | "Cards" | "Sub Cat";
  dataForTransactions: Transaction[];
  search: string;
  allSubCategoriesInUse: string[];
  filterHeaders: {
    Summary: string[];
    Categories: Category[];
    Cards: string[];
    "Sub Cat": string[];
  };
  filterMonth: boolean;
  currentMonth: number;
}): ChartDataByMonth {
  const result: ChartDataByMonth = {};

  const months = filterMonth
    ? [currentMonth]
    : Array.from({ length: 12 }, (_, i) => i);

  months.forEach((month) => {
    const monthName = getMonthName(month);

    result[monthName] = filterHeaders[group].map((filter) => {
      const transactions = makeFilter({
        search,
        activeFilter: filter,
        dataForTransactions,
        allSubCategoriesInUse,
      }).filter((t) => {
        return new Date(t.date).getMonth() === month;
      });

      const total = transactions.reduce((sum, t) => sum + t.amount, 0);

      return {
        label: filter,
        value: total.toFixed(2),
      };
    });
  });

  return result;
}
