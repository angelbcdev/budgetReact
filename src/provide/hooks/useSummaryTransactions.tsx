import { useMemo } from "react";
import type { Category } from "../../Models/dummyData";
import type { Transaction } from "../../Models/DataTransactions";

// ─────────────────────────────────────────
// TYPES (adjust if you already have them)
// ─────────────────────────────────────────

export type TKEY_SUMMARY =
  | "savingsMortgage"
  | "savingsBank"
  | "savingsStocks"
  | "savingsCrypto"
  | "totalBalance"
  | "totalIncome"
  | "totalExpenses"
  | "totalCardRed"
  | "totalCardBlue"
  | "totalCheckingAccount";

export interface ISummaryHomeData {
  totalBalance: number;
  totalIncome: number;
  totalExpenses: number;
  totalCardRed: number;
  totalCardBlue: number;
  totalCheckingAccount: number;
  savingsMortgage: number;
  savingsBank: number;
  savingsStocks: number;
  savingsCrypto: number;
  databyCatefory: Record<Category, number>;
}

type MonthlySummary = Record<string, ISummaryHomeData>;

// ─────────────────────────────────────────
// HOOK
// ─────────────────────────────────────────

export const validateSavingDataToShow: TKEY_SUMMARY[] = [
  "savingsMortgage",
  "savingsBank",
  "savingsStocks",
  "savingsCrypto",
];

export function useSummary(transactions: Transaction[]) {
  // 🔹 create empty summary
  const createEmptySummary = (): ISummaryHomeData => ({
    totalBalance: 0,
    totalIncome: 0,
    totalExpenses: 0,
    totalCardRed: 0,
    totalCardBlue: 0,
    totalCheckingAccount: 0,
    savingsMortgage: 0,
    savingsBank: 0,
    savingsStocks: 0,
    savingsCrypto: 0,
    databyCatefory: {
      food: 0,
      transport: 0,
      drinks: 0,
      bills: 0,
      amazon: 0,
      savings: 0,
      credit_card_payment: 0,
      other: 0,
      mortgage: 0,
      stocks: 0,
      crypto: 0,
      checking: 0,
      credit_card_blue: 0,
      credit_card_red: 0,
      house: 0,
      mortgage_Payment: 0
    },
  });

  // 🔹 merge two summaries into one (suma campo a campo)
  const mergeSummaries = (
    a: ISummaryHomeData,
    b: ISummaryHomeData
  ): ISummaryHomeData => {
    const categories = Object.keys(a.databyCatefory) as Category[];
    const databyCatefory = {} as Record<Category, number>;
    categories.forEach((cat) => {
      databyCatefory[cat] = a.databyCatefory[cat] + b.databyCatefory[cat];
    });

    return {
      totalBalance:         a.totalBalance         + b.totalBalance,
      totalIncome:          a.totalIncome          + b.totalIncome,
      totalExpenses:        a.totalExpenses         + b.totalExpenses,
      totalCardRed:         a.totalCardRed          + b.totalCardRed,
      totalCardBlue:        a.totalCardBlue         + b.totalCardBlue,
      totalCheckingAccount: a.totalCheckingAccount  + b.totalCheckingAccount,
      savingsMortgage:       a.savingsMortgage        + b.savingsMortgage,
      savingsBank:          a.savingsBank           + b.savingsBank,
      savingsStocks:        a.savingsStocks         + b.savingsStocks,
      savingsCrypto:        a.savingsCrypto         + b.savingsCrypto,
      databyCatefory,
    };
  };

  // 🔹 apply transaction logic (your logic cleaned)
  const applyTransaction = (acc: ISummaryHomeData, t: Transaction) => {
    const amount = Math.abs(t.amount);

     if (acc.databyCatefory[t.category]) {
      acc.databyCatefory[t.category] = 0
    }

    // PAYCHECK
    if (
      t.type === "credit_card_payment" &&
      t.paymentMethod === "paycheck" &&
      t.category === "checking"
    ) {
      acc.totalBalance += amount;
      acc.totalCheckingAccount += amount;
      acc.totalIncome += amount;
      return;
    }
    // PAY CREDIT dataCards
    if (
      t.type == "credit_card_payment" &&
      t.paymentMethod == "cards_payment" &&
      (t.category == "credit_card_red" || t.category == "credit_card_blue")
    ) {
      if (t.category == "credit_card_blue") {
        acc.totalCardBlue -= amount;
      } else if (t.category == "credit_card_red") {
        acc.totalCardRed -= amount;
      }

      acc.totalBalance -= amount;
      return;
    }

    //PAY Mortgage
    if (t.type === "credit_card_payment" && t.paymentMethod === "mortgage") {
       acc.databyCatefory["mortgage_Payment"] += amount;
      acc.savingsMortgage -= amount;
      return;
    }
     //PAY with savings
    if (t.type === "spending" && t.paymentMethod === "savings_account") {
      acc.databyCatefory[t.category] += amount;
      acc.savingsBank -= amount;
      return;
    }
   

    // SAVINGS
    if (t.type === "saving") {
      acc.totalBalance -= amount;
      acc.databyCatefory[t.category] += amount;

      switch (t.category) {
        case "mortgage":
          acc.savingsMortgage += amount;
          break;
        case "savings":
          acc.savingsBank += amount;
          break;
        case "stocks":
          acc.savingsStocks += amount;
          break;
        case "crypto":
          acc.savingsCrypto += amount;
          break;
      }
      return;
    }

    // SPENDING mortgage_Payment
    if (t.type === "spending") {
      acc.totalExpenses += amount;
      acc.databyCatefory[t.category] += amount;

      switch (t.paymentMethod) {
       
        case "credit_card_blue":
          acc.totalCardBlue += amount;
          break;
        case "credit_card_red":
          acc.totalCardRed += amount;
          break;
        case "checking":
          acc.totalBalance -= amount;
          break;
      }
    }
  };

  // 🔹 build summaries (memoized)
  const { global, monthly } = useMemo(() => {
    const global = createEmptySummary();
    const monthly: MonthlySummary = {};

    transactions.forEach((t) => {
      const dateString = new Date(t.date).toISOString().split("T")[0];
      const [year, month] = dateString.split("-");
      const key = `${year}-${month}`; // "2026-04"

      if (!monthly[key]) {
        monthly[key] = createEmptySummary();
      }

      applyTransaction(global, t);
      applyTransaction(monthly[key], t);
    });

    return { global, monthly };
  }, [transactions]);

  // 🔹 current month helper
  const currentMonthKey = useMemo(() => {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, "0");
    return `${y}-${m}`;
  }, []);

  const currentMonth = monthly[currentMonthKey];

  // 🔹 sorted months (latest first)
  const sortedMonths = useMemo(() => {
    return Object.keys(monthly).sort((a, b) => b.localeCompare(a));
  }, [monthly]);

  const allMonthsData = useMemo(() => {
    return Object.keys(monthly);
  }, [monthly]);

  // 🔹 accumulated monthly (cada mes incluye el acumulado de todos los anteriores)
  const acumulateMonth = useMemo(() => {
    const sorted = Object.keys(monthly).sort((a, b) => a.localeCompare(b)); // asc: ene → dic
    const result: MonthlySummary = {};
    let runningTotal = createEmptySummary();

    sorted.forEach((key) => {
      runningTotal = mergeSummaries(runningTotal, monthly[key]);
      result[key] = { ...runningTotal };
    });

    return result;
  }, [monthly]);

  return {
    global,
    monthly,
    currentMonth,
    lastMonth: currentMonthKey,
    sortedMonths,
    allMonthsData,
    acumulateMonth,
  };
}