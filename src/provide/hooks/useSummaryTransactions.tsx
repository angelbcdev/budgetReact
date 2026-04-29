import { useMemo } from "react";
import type { Category } from "../../Models/dummyData";
import type { Transaction } from "../../Models/DataTransactions";

// ─────────────────────────────────────────
// TYPES (adjust if you already have them)
// ─────────────────────────────────────────

export type TKEY_SUMMARY =
  | "savingsMorgage"
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
  savingsMorgage: number;
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
  "savingsMorgage",
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
    savingsMorgage: 0,
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
      morgage: 0,
      stocks: 0,
      crypto: 0,
      checking: 0,
      credit_card_blue: 0,
      credit_card_red: 0,
      house: 0,
    },
  });

  // 🔹 apply transaction logic (your logic cleaned)
  const applyTransaction = (acc: ISummaryHomeData, t: Transaction) => {
    const amount = Math.abs(t.amount);

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
      t.paymentMethod == "paycheck" &&
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

    //PAY Morgage
    if (t.type === "spending" && t.paymentMethod === "morgage") {
      acc.savingsMorgage -= amount;

      return;
    }

    // SAVINGS
    if (t.type === "saving") {
      acc.totalBalance -= amount;
      acc.databyCatefory[t.category] += amount;

      switch (t.category) {
        case "morgage":
          acc.savingsMorgage += amount;
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

    // SPENDING
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

  return {
    global,
    monthly,
    currentMonth,
    lastMonth: currentMonthKey,
    sortedMonths,
    allMonthsData,
  };
}
