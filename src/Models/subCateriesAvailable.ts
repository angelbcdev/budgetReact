import { createMeta, type Category, type TCategory_Meta } from "./dummyData";

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
    "cel_tmobil",
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
  mortgage_Payment: [],
};

export function getSubCategoryFor(cat: Category) {
  if (subCateriesAvailable[cat]) {
    return subCateriesAvailable[cat];
  } else {
    return [];
  }
}

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
  | "cel_tmobil"

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

export const SUBCATEGORY_META: Record<Subcategory, TCategory_Meta> = {
  payment_card: createMeta("payment_card", "💳", "#3b82f6"),

  books: createMeta("books", "📚", "#a855f7"),
  clothes: createMeta("clothes", "👕", "#ec4899"),
  games: createMeta("games", "🎮", "#f59e0b"),
  car_insurance: createMeta("car_insurance", "🚗", "#22c55e"),

  restaurant: createMeta("restaurant", "🍽️", "#ef4444"),
  delivery: createMeta("delivery", "🛵", "#f97316"),
  homemade: createMeta("homemade", "🏠", "#84cc16"),

  gas: createMeta("gas", "⛽", "#eab308"),
  car_repair: createMeta("car_repair", "🔧", "#6b7280"),
  uber: createMeta("uber", "🚕", "#000000"),

  beer: createMeta("beer", "🍺", "#fbbf24"),
  rum: createMeta("rum", "🥃", "#92400e"),
  whiskey: createMeta("whiskey", "🥃", "#78350f"),

  mortgage: createMeta("mortgage", "🏡", "#14b8a6"),
  electricity: createMeta("electricity", "⚡", "#facc15"),
  internet: createMeta("internet", "🌐", "#3b82f6"),
  cel_tmobil: createMeta("internet", "🌐", "#cc16cc"),

  electronics: createMeta("electronics", "📱", "#6366f1"),
  household: createMeta("household", "🧼", "#10b981"),
  clothing: createMeta("clothing", "🧥", "#ec4899"),
  other_amazon: createMeta("other_amazon", "📦", "#6b7280"),

  mortgage_savings: createMeta("mortgage_savings", "🏦", "#0ea5e9"),
  stocks: createMeta("stocks", "📈", "#22c55e"),

  blue_payment: createMeta("blue_payment", "💙", "#3b82f6"),
  red_payment: createMeta("red_payment", "❤️", "#ef4444"),

  trash_tickets: createMeta("trash_tickets", "🎟️", "#f43f5e"),
  decoration: createMeta("decoration", "🖼️", "#a855f7"),
  furniture: createMeta("furniture", "🪑", "#8b5cf6"),
  utilities: createMeta("utilities", "🧾", "#64748b"),
  bitcoin: createMeta("bitcoin", "₿", "#f7931a"),
  ethereum: createMeta("ethereum", "Ξ", "#627eea"),

  garbage: createMeta("garbage", "🗑️", "#6b7280"),
  paint: createMeta("paint", "🎨", "#f472b6"),
  water: createMeta("water", "🚰", "#38bdf8"),
  house_gas: createMeta("house_gas", "🔥", "#f97316"),
  send_money: createMeta("send_money", "💸", "#22c55e"),
  sams_club: createMeta("sams_club", "🏬", "#2563eb"),
  bravo_market: createMeta("bravo_market", "🛒", "#16a34a"),
  walmart: createMeta("walmart", "🏪", "#1d4ed8"),
  other: createMeta("other", "📌", "#9ca3af"),
};

export function getSubCategoryMeta(subcate: Subcategory): TCategory_Meta {
  if (SUBCATEGORY_META[subcate]) {
    return SUBCATEGORY_META[subcate];
  } else {
    return { icon: "?", bg: "#1d2a9b", label: "no added" };
  }
}

export const dummyData = [
  {
    title: "restaurant",
    icon: "🍽️",
    color: "#ef4444",
    category: ["food"],
  },
  {
    title: "delivery",
    icon: "🛵",
    color: "#f97316",
    category: ["food"],
  },
  {
    title: "homemade",
    icon: "🏠",
    color: "#84cc16",
    category: ["food"],
  },
  {
    title: "sams club",
    icon: "🏬",
    color: "#2563eb",
    category: ["food", "house", "other"],
  },
  {
    title: "bravo market",
    icon: "🛒",
    color: "#16a34a",
    category: ["food"],
  },
  {
    title: "walmart",
    icon: "🏪",
    color: "#1d4ed8",
    category: ["food", "house", "other"],
  },
  {
    title: "gas",
    icon: "⛽",
    color: "#eab308",
    category: ["transport"],
  },
  {
    title: "car repair",
    icon: "🔧",
    color: "#6b7280",
    category: ["transport"],
  },
  {
    title: "uber",
    icon: "🚕",
    color: "#000000",
    category: ["transport"],
  },
  {
    title: "beer",
    icon: "🍺",
    color: "#fbbf24",
    category: ["drinks"],
  },
  {
    title: "rum",
    icon: "🥃",
    color: "#92400e",
    category: ["drinks"],
  },
  {
    title: "whiskey",
    icon: "🥃",
    color: "#78350f",
    category: ["drinks"],
  },
  {
    title: "mortgage",
    icon: "🏡",
    color: "#14b8a6",
    category: ["house"],
  },
  {
    title: "electricity",
    icon: "⚡",
    color: "#ffc00a",
    category: ["bills"],
  },
  {
    title: "internet",
    icon: "🌐",
    color: "#3b82f6",
    category: ["bills"],
  },
  {
    title: "cel tmobil",
    icon: "🌐",
    color: "#cc16cc",
    category: ["bills"],
  },
  {
    title: "car insurance",
    icon: "🚗",
    color: "#22c55e",
    category: ["bills"],
  },
  {
    title: "water",
    icon: "🚰",
    color: "#38bdf8",
    category: ["bills"],
  },
  {
    title: "electronics",
    icon: "📱",
    color: "#6366f1",
    category: ["amazon", "other"],
  },
  {
    title: "house repairs",
    icon: "🧼",
    color: "#10b981",
    category: ["amazon", "house"],
  },
  {
    title: "clothing",
    icon: "🧥",
    color: "#ec4899",
    category: ["clothes", "amazon"],
  },
  {
    title: "books",
    icon: "📚",
    color: "#a855f7",
    category: ["amazon", "other"],
  },
  {
    title: "clothes",
    icon: "👕",
    color: "#ec4899",
    category: ["clothes", "amazon"],
  },
  {
    title: "games",
    icon: "🎮",
    color: "#f59e0b",
    category: ["amazon", "other"],
  },
  {
    title: "send money",
    icon: "💸",
    color: "#f43f5e",
    category: ["other"],
  },
  {
    title: "bitcoin",
    icon: "₿",
    color: "#f7931a",
    category: ["crypto"],
  },
  {
    title: "ethereum",
    icon: "Ξ",
    color: "#627eea",
    category: ["crypto"],
  },
  {
    title: "trash tickets",
    icon: "🎟️",
    color: "#22c55e ",
    category: ["house"],
  },
  {
    title: "decoration",
    icon: "🖼️",
    color: "#a855f7",
    category: ["house"],
  },
  {
    title: "furniture",
    icon: "🪑",
    color: "#8b5cf6",
    category: ["house", "amazon"],
  },
  {
    title: "utils ",
    icon: "📌",
    color: "#9ca3af",
    category: ["house", "amazon"],
  },
];
