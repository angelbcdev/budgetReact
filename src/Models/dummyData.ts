export type TransactionType =
  | "spending"
  | "saving"
  | "credit_card_payment"
  | "income";

export const TRANSACTION_TYPE_META: Record<
  TransactionType,
  { label: string; fill: string }
> = {
  spending: { label: "Spending", fill: "#ef4444" },
  credit_card_payment: { label: "CC Payment", fill: "#a855f7" },
  saving: { label: "Saving", fill: "#3b82f6" },
  income: { label: "Income", fill: "#22c55e" },
};

export type SavingsMethod = "mortgage" | "savings" | "stocks" | "crypto";

export type PaymentMethod =
  | "checking"
  | "credit_card_blue"
  | "credit_card_red"
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
  | "savings"
  | "stocks"
  | "crypto"
  | "checking"
  | "credit_card_blue"
  | "credit_card_red"
  | "house";

export const typeTransactionAvailable: TransactionType[] = [
  "spending",
  "saving",
  "credit_card_payment",
];
export const fliterCategoryAvailable: Category[] = [
  "food",
  "transport",
  "house",
  "bills",
  "amazon",
  "drinks",
  "other",
];
export const savingsMethodAvailable: SavingsMethod[] = [
  "mortgage",
  "savings",
  "stocks",
  "crypto",
];

export const paymentMethodAvailable: PaymentMethod[] = [
  "mortgage",
  "credit_card_red",
  "credit_card_blue",
  "checking",
];

export const CATEGORY_META = {
  food: { icon: "🍔", bg: "bg-orange-100", fill: "#f97316" },
  transport: { icon: "🚗", bg: "bg-blue-100", fill: "#3b82f6" },
  drinks: { icon: "🍹", bg: "bg-pink-100", fill: "#ec4899" },
  bills: { icon: "💸", bg: "bg-yellow-100", fill: "#eab308" },
  amazon: { icon: "📦", bg: "bg-pink-100", fill: "#ec4899" },
  savings: { icon: "💰", bg: "bg-green-100", fill: "#22c55e" },
  credit_card_payment: { icon: "💳", bg: "bg-purple-100", fill: "#a855f7" },
  health: { icon: "💊", bg: "bg-green-100", fill: "#22c55e" },
  entertainment: { icon: "🎬", bg: "bg-purple-100", fill: "#a855f7" },
  utilities: { icon: "💡", bg: "bg-yellow-100", fill: "#eab308" },
  shopping: { icon: "🛍️", bg: "bg-pink-100", fill: "#ec4899" },
  other: { icon: "❓", bg: "bg-gray-100", fill: "#9ca3af" },
  mortgage: { icon: "🏠", bg: "bg-blue-100", fill: "#3b82f6" },
  stocks: { icon: "📉", bg: "bg-green-100", fill: "#22c55e" },
  credit_card_red: { icon: "💳", bg: "bg-red-100", fill: "#ef4444" },
  credit_card_blue: { icon: "💳", bg: "bg-blue-100", fill: "#3b82f6" },
  checking: { icon: "💵", bg: "bg-green-100", fill: "#22c55e" },
  crypto: { icon: "₿", bg: "bg-green-100", fill: "#22c55e" },
  house: { icon: "🏠", bg: "bg-blue-100", fill: "#3b82f6" },
  default: { icon: "💰", bg: "bg-gray-100", fill: "#9ca3af" },
};

export const TYPE_META = {
  spending: { label: "Spending", fill: "#ef4444" },
  credit_card_payment: { label: "CC Payment", fill: "#a855f7" },
  saving: { label: "Saving", fill: "#3b82f6" },
};

export const METHOD_META = {
  paycheck: { label: "Paycheck", fill: "#22c55e" },
  credit_card_blue: { label: "Credit Blue", fill: "#3b82f6" },
  credit_card_red: { label: "Credit Red", fill: "#ef4444" },
  checking: { label: "Checking", fill: "#eab308" },
};

export const subCateriesAvailable: Record<Category, Subcategory[]> = {
  food: [
    "restaurant",
    "delivery",
    "homemade",
    "sams_club",
    "bravo_market",
    "walmart",
  ],
  transport: ["gas", "car_repair", "uber"],
  drinks: ["beer", "rum", "whiskey"],
  bills: [
    "mortgage",
    "electricity",
    "internet",
    "car_insurance",
    "gas",
    "water",
  ],
  amazon: ["electronics", "household", "clothing", "books", "clothes", "games"],
  savings: [],
  credit_card_payment: [],
  other: ["send_money"],
  mortgage: [],
  stocks: [],
  credit_card_red: [],
  credit_card_blue: [],
  checking: [],
  crypto: ["bitcoin", "ethereum"],
  house: [
    "trash_tickets",
    "decoration",
    "furniture",
    "other",
    "utilities",
    "mortgage",
  ],
};

export type Subcategory =
  | "payment_card"

  // general
  | "books"
  | "clothes"
  | "games"
  | "car_insurance"

  // food
  | "restaurant"
  | "delivery"
  | "homemade"

  // transport
  | "gas"
  | "car_repair"
  | "uber"

  // drinks
  | "beer"
  | "rum"
  | "whiskey"

  // bills
  | "mortgage"
  | "electricity"
  | "internet"

  // amazon
  | "electronics"
  | "household"
  | "clothing"
  | "other_amazon"

  // savings
  | "mortgage_savings"
  | "stocks"

  // credit card payment
  | "blue_payment"
  | "red_payment"

  // other
  | "trash_tickets"
  | "decoration"
  | "furniture"
  | "utilities"
  | "bitcoin"
  | "ethereum"

  // house
  | "garbage"
  | "paint"
  | "water"
  | "house_gas"
  | "send_money"
  | "sams_club"
  | "bravo_market"
  | "walmart"
  | "other";
