export type TransactionType =
  | "spending"
  | "saving"
  | "credit_card_payment"
  | "income";

;

export type SavingsMethod = "mortgage" | "savings" | "stocks" | "crypto";


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

  export const allCategoryAvailable: Category[] = [
  "food"
  , "transport"
  , "drinks"
  , "bills"
  , "amazon"
  , "savings"
  , "credit_card_payment"
  , "other"
  , "mortgage"
  , "savings"
  , "stocks"
  , "crypto"
  , "checking"
  , "credit_card_blue"
  , "credit_card_red"
  , "house"
];

export type PaymentMethod =
  | "checking"
  | "credit_card_blue"
  | "credit_card_red"
  | "paycheck"
  | "mortgage";

export type TallTypeCategory =  Category |TransactionType  |PaymentMethod | SavingsMethod
interface TCategory_Meta {
  icon:string;
  bg:string
  label:string
}
const formatLabel = (key: string) =>
  key.replaceAll("_", " ").replace(/\b\w/g, c => c.toUpperCase());

const createMeta = (key: TallTypeCategory, icon: string, bg: string): TCategory_Meta => ({
  icon,
  bg,
  label: formatLabel(key),
});


export const CATEGORY_META: Record<TallTypeCategory, TCategory_Meta> = {
  checking: createMeta("checking", "💵", "#22c55e"),
  credit_card_red: createMeta("credit_card_red", "💳", "#ef4444"),
  credit_card_blue: createMeta("credit_card_blue", "💳", "#3b82f6"),
  paycheck: createMeta("paycheck", "💼", "#16a34a"),
 mortgage: createMeta("mortgage", "🏠", "#3b82f6"),

  food: createMeta("food", "🍔", "#f97316"),
  transport: createMeta("transport", "🚗", "#3b82f6"),
  drinks: createMeta("drinks", "🍹", "#ec4899"),
  bills: createMeta("bills", "💸", "#eab308"),
  amazon: createMeta("amazon", "📦", "#ec4899"),
  savings: createMeta("savings", "💰", "#22c55e"),
  credit_card_payment: createMeta("credit_card_payment", "💳", "#a855f7"),
 
  stocks: createMeta("stocks", "📉", "#22c55e"),
  
  crypto: createMeta("crypto", "₿", "#22c55e"),
  house: createMeta("house", "🏠", "#3b82f6"),
  other: createMeta("other", "❓", "#9ca3af"),
  spending: createMeta("spending", "💸", "#f97316"),
saving: createMeta("saving", "💰", "#22c55e"),
income: createMeta("income", "💵", "#16a34a"),


};


export function getCategoryMeta(category: TallTypeCategory):TCategory_Meta {
  if (CATEGORY_META[category]){
  return CATEGORY_META[category];
}else{
 return {icon:"?",
  bg:"",
  label:"no added"}
}
}



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

export const TRANSACTION_TYPE_META: Record<
  TransactionType,
  { label: string; fill: string }
> = {
  spending: { label: "Spending", fill: "#ef4444" },
  credit_card_payment: { label: "CC Payment", fill: "#a855f7" },
  saving: { label: "Saving", fill: "#3b82f6" },
  income: { label: "Income", fill: "#22c55e" },
}

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

  