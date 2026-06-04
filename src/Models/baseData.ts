export type TransactionType =
  | "spending"
  | "saving"
  | "transaction_savings_to_mortgage"
  | "transaction_mortgage_to_savings"
  | "credit_card_payment"
  | "sell_stocks"
  | "sell_crypto"
  | "income";

export type SavingsMethod =
  | "mortgage"
  | "savings"
  | "stocks"
  | "crypto"
  | "cash";

type TKEY_GOALS =
  | "savingsMortgage"
  | "savingsBank"
  | "savingsStocks"
  | "savingsCrypto";

export type PaymentMethod =
  | "checking"
  | "savings_account"
  | "credit_card_blue"
  | "credit_card_red"
  | "cards_payment"
  | "paycheck"
  | "mortgage";

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
  | "house";

type AllItems =
  | Category
  | TransactionType
  | SavingsMethod
  | PaymentMethod
  | TKEY_GOALS;

class DataDetails {
  id = crypto.randomUUID();
  title: string;
  icon: string;
  color: string;
  name_to_show: string;

  constructor({
    title,
    icon,
    color,
    nameToShow,
  }: {
    title: string;
    icon: string;
    color: string;
    nameToShow: string;
  }) {
    this.title = title;
    this.icon = icon;
    this.color = color;
    this.name_to_show = nameToShow;
  }
}

const item = (title: string, icon: string, color: string, nameToShow: string) =>
  new DataDetails({
    title,
    icon,
    color,
    nameToShow,
  });

const All_Category: Record<AllItems, DataDetails> = {
  // Category
  food: item("food", "🍔", "#f97316", "Food"),
  transport: item("transport", "🚗", "#3b82f6", "Transport"),
  drinks: item("drinks", "🍹", "#ec4899", "Drinks"),
  bills: item("bills", "💸", "#eab308", "Bills"),
  amazon: item("amazon", "📦", "#f59e0b", "Amazon"),
  savings: item("savings", "💰", "#22c55e", "Savings"),
  credit_card_payment: item(
    "credit_card_payment",
    "💳",
    "#8b5cf6",
    "Credit Card Payment",
  ),
  other: item("other", "📁", "#6b7280", "Other"),
  mortgage: item("mortgage", "🏠", "#14b8a6", "Mortgage"),
  mortgage_payment: item(
    "mortgage_payment",
    "🏡",
    "#0891b2",
    "Mortgage Payment",
  ),
  moneyTransactions: item(
    "moneyTransactions",
    "💵",
    "#16a34a",
    "Money Transactions",
  ),
  stocks: item("stocks", "📈", "#10b981", "Stocks"),
  crypto: item("crypto", "₿", "#f59e0b", "Crypto"),
  checking: item("checking", "🏦", "#0ea5e9", "Checking"),
  credit_card_blue: item(
    "credit_card_blue",
    "💙",
    "#2563eb",
    "Blue Credit Card",
  ),
  credit_card_red: item("credit_card_red", "❤️", "#dc2626", "Red Credit Card"),
  sell_assets: item("sell_assets", "💲", "#65a30d", "Sell Assets"),
  house: item("house", "🏡", "#84cc16", "House"),

  // TransactionType
  spending: item("spending", "🛒", "#ef4444", "Spending"),
  saving: item("saving", "💰", "#22c55e", "Saving"),
  transaction_savings_to_mortgage: item(
    "transaction_savings_to_mortgage",
    "➡️",
    "#0ea5e9",
    "Savings → Mortgage",
  ),
  transaction_mortgage_to_savings: item(
    "transaction_mortgage_to_savings",
    "⬅️",
    "#14b8a6",
    "Mortgage → Savings",
  ),
  sell_stocks: item("sell_stocks", "📉", "#f59e0b", "Sell Stocks"),
  sell_crypto: item("sell_crypto", "🪙", "#f97316", "Sell Crypto"),
  income: item("income", "💵", "#16a34a", "Income"),

  // SavingsMethod
  cash: item("cash", "💵", "#22c55e", "Cash"),

  // PaymentMethod
  savings_account: item("savings_account", "💰", "#1ffffa", "Savings Account"),
  cards_payment: item("cards_payment", "💳", "#af06d1", "Cards Payment"),
  paycheck: item("paycheck", "💼", "#16a34a", "Paycheck"),

  // TKEY_GOALS
  savingsMortgage: item("savingsMortgage", "🏠", "#14b8a6", "Mortgage Goal"),
  savingsBank: item("savingsBank", "🏦", "#22c55e", "Bank Savings Goal"),
  savingsStocks: item("savingsStocks", "📈", "#10b981", "Stocks Goal"),
  savingsCrypto: item("savingsCrypto", "₿", "#f59e0b", "Crypto Goal"),
};

export const allCategoryAvailable2: DataDetails[] = [
  All_Category["food"],
  All_Category["transport"],
  All_Category["drinks"],
  All_Category["bills"],
  All_Category["amazon"],
  All_Category["savings"],
  All_Category["credit_card_payment"],
  All_Category["other"],
  All_Category["mortgage"],
  All_Category["stocks"],
  All_Category["crypto"],
  All_Category["checking"],
  All_Category["credit_card_blue"],
  All_Category["credit_card_red"],
  All_Category["house"],
];

export const typeTransactionAvailable: DataDetails[] = [
  All_Category["spending"],
  All_Category["saving"],
  All_Category["credit_card_payment"],
];

export const fliterCategoryAvailable: DataDetails[] = [
  All_Category["food"],
  All_Category["transport"],
  All_Category["house"],
  All_Category["bills"],
  All_Category["amazon"],
  All_Category["drinks"],
  All_Category["other"],
];

export const savingsMethodAvailable: DataDetails[] = [
  All_Category["mortgage"],
  All_Category["savings"],
  All_Category["stocks"],
  All_Category["crypto"],
];

export const paymentMethodAvailable: DataDetails[] = [
  All_Category["mortgage"],
  All_Category["credit_card_red"],
  All_Category["credit_card_blue"],
  All_Category["checking"],
  All_Category["savings_account"],
];
