import { createMeta, type TCategory_Meta } from "./baseData";

export type TransactionType =
  | "spending"
  | "saving"
  | "transaction_savings_to_mortgage"
  | "transaction_mortgage_to_savings"
  | "credit_card_payment"
  | "sell_stocks"
  | "sell_crypto"
  | "income";

const TransactionDetails = {
  spending: createMeta("spending", "🛒", "#ef4444"),
  saving: createMeta("saving", "💰", "#3b82f6"),
  transaction_savings_to_mortgage: createMeta(
    "transaction_savings_to_mortgage",
    "⬅️",
    "#14b8a6",
  ),
  transaction_mortgage_to_savings: createMeta(
    "transaction_mortgage_to_savings",
    "➡️",
    "#16a34a",
  ),
  sell_stocks: createMeta("sell_stocks", "📉", "#f59e0b"),
  sell_crypto: createMeta("sell_crypto", "🪙", "#f97316"),
  income: createMeta("income", "💸", "#16a34a"),
};

export type SavingsMethod =
  | "mortgage"
  | "savings"
  | "stocks"
  | "crypto"
  | "cash";

const SavingsMethodDetails = {
  mortgage: createMeta("mortgage", "🏠", "#14b8a6"),
  savings: createMeta("savings", "💰", "#22c55e"),
  stocks: createMeta("stocks", "📉", "#f59e0b"),
  crypto: createMeta("crypto", "🪙", "#f97316"),
  cash: createMeta("cash", "💵", "#16a34a"),
};

type TKEY_GOALS =
  | "savingsMortgage"
  | "savingsBank"
  | "savingsStocks"
  | "savingsCrypto";

const TKEY_GOALSDetails = {
  savingsMortgage: createMeta("savings Mortgage", "🏠", "#14b8a6"),
  savingsBank: createMeta("savings Bank", "🏦", "#22c55e"),
  savingsStocks: createMeta("savings Stocks", "📈", "#10b981"),
  savingsCrypto: createMeta("savings Crypto", "₿", "#f59e0b"),
};

export type PaymentMethod =
  | "checking"
  | "savings_account"
  | "credit_card_blue"
  | "credit_card_red"
  | "cards_payment"
  | "paycheck"
  | "cash"
  | "mortgage";

const PaymentMethodDetails = {
  savings_account: createMeta("savings_account", "💰", "#1ffffa"),
  cards_payment: createMeta("cards_payment", "💳", "#af06d1"),
  paycheck: createMeta("paycheck", "💼", "#16a34a"),
};

export type Category =
  | "food"
  | "transport"
  | "drinks"
  | "bills"
  | "amazon"
  | "savings"
  | "credit_card_payment"
  | "other"
  | "mortgage"
  | "mortgage_payment"
  | "moneyTransactions"
  | "savings"
  | "stocks"
  | "crypto"
  | "checking"
  | "credit_card_blue"
  | "credit_card_red"
  | "sell_assets"
  | "cash"
  | "house";

export const fliterCategoryAvailable: Category[] = [
  "food",
  "transport",
  "house",
  "bills",
  "amazon",
  "drinks",
  "other",
];

export const paymentMethodAvailable: PaymentMethod[] = [
  "mortgage",
  "credit_card_red",
  "credit_card_blue",
  "checking",
  "savings_account",
  "cash",
];

export const typeTransactionAvailable: TransactionType[] = [
  "spending",
  "saving",
  "credit_card_payment",
];

export const savingsMethodAvailable: SavingsMethod[] = [
  "mortgage",
  "savings",
  "stocks",
  "crypto",
  "cash",
];

const CategoryDetails = {
  food: createMeta("food", "🍔", "#f97316"),
  transport: createMeta("transport", "🚗", "#3b82f6"),
  drinks: createMeta("drinks", "🍹", "#ec4899"),
  bills: createMeta("bills", "💸", "#eab308"),
  amazon: createMeta("amazon", "📦", "#f59e0b"),
  savings: createMeta("savings", "💰", "#22c55e"),
  credit_card_payment: createMeta("credit_card_payment", "💳", "#8b5cf6"),
  other: createMeta("other", "📁", "#6b7280"),
  mortgage: createMeta("mortgage", "🏠", "#14b8a6"),
  mortgage_payment: createMeta("mortgage_payment", "🏡", "#0891b2"),
  moneyTransactions: createMeta("moneyTransactions", "💵", "#16a34a"),
  stocks: createMeta("stocks", "📈", "#10b981"),
  crypto: createMeta("crypto", "₿", "#f59e0b"),
  checking: createMeta("checking", "🏦", "#0ea5e9"),
  credit_card_blue: createMeta("credit_card_blue", "💙", "#2563eb"),
  credit_card_red: createMeta("credit_card_red", "❤️", "#dc2626"),
  sell_assets: createMeta("sell_assets", "💲", "#65a30d"),
  house: createMeta("house", "🏡", "#84cc16"),
};

export type TallTypeCategory =
  | Category
  | TransactionType
  | PaymentMethod
  | SavingsMethod
  | TKEY_GOALS
  | "ForStocksProfit"
  | "Cash"
  | "Balance";

// const All_Category

export const CATEGORY_META: Record<TallTypeCategory, TCategory_Meta> = {
  ...CategoryDetails,
  ...TransactionDetails,
  ...SavingsMethodDetails,
  ...PaymentMethodDetails,
  ...TKEY_GOALSDetails,
  ForStocksProfit: createMeta("For Stocks Profit", "📉", "#f59e0b"),
  Balance: createMeta("Balance", "💵", "#16a34a"),
  Cash: createMeta("Cash", "💵", "#16a34a"),
};

export function getCategoryMeta(category: TallTypeCategory): TCategory_Meta {
  if (CATEGORY_META[category as TallTypeCategory]) {
    return CATEGORY_META[category as TallTypeCategory];
  } else {
    return { icon: "?", bg: "#1d2a9b", label: category + " not found" };
  }
}
