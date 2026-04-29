export type TransactionType =
  | "spending"
  | "saving"
  | "credit_card_payment"
  | "income";
export type SavingsMethod = "morgage" | "savings" | "stocks" | "crypto";

export type PaymentMethod =
  | "checking"
  | "credit_card_blue"
  | "credit_card_red"
  | "paycheck";

export type Category =
  | "food"
  | "transport"
  | "drinks"
  | "bills"
  | "amazon"
  | "savings"
  | "credit_card_payment"
  | "other"
  | "morgage"
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
  "morgage",
  "savings",
  "stocks",
  "crypto",
];

export const paymentMethodAvailable: PaymentMethod[] = [
  "credit_card_red",
  "credit_card_blue",
  "checking",
];
export const categoryMeta = {
  food: { icon: "🍔", bg: "bg-orange-100" },
  transport: { icon: "🚗", bg: "bg-blue-100" },
  drinks: { icon: "🍹", bg: "bg-pink-100" },
  bills: { icon: "💸", bg: "bg-yellow-100" },
  amazon: { icon: "🛍️", bg: "bg-pink-100" },
  savings: { icon: "💰", bg: "bg-green-100" },
  credit_card_payment: { icon: "💳", bg: "bg-purple-100" },
  health: { icon: "💊", bg: "bg-green-100" },
  entertainment: { icon: "🎬", bg: "bg-purple-100" },
  utilities: { icon: "💡", bg: "bg-yellow-100" },
  shopping: { icon: "🛍️", bg: "bg-pink-100" },
  other: { icon: "❓", bg: "bg-gray-100" },
  morgage: { icon: "🏠", bg: "bg-blue-100" },
  stocks: { icon: "📉", bg: "bg-green-100" },
  credit_card_red: { icon: "💳", bg: "bg-red-100" },
  credit_card_blue: { icon: "💳", bg: "bg-blue-100" },
  checking: { icon: "💵", bg: "bg-green-100" },
  crypto: { icon: "₿", bg: "bg-green-100" },
  house: { icon: "🏠", bg: "bg-blue-100" },
};

export const subCateriesAvailable: Record<Category, Subcategory[]> = {
  food: ["restaurant", "delivery", "homemade"],
  transport: ["gas", "car_repair", "uber"],
  drinks: ["beer", "rum", "whiskey"],
  bills: [
    "mortgage",
    "electricity",
    "internet",
    "car insurance",
    "hose's gas",
    "water",
  ],
  amazon: [
    "electronics",
    "household",
    "clothing",
    "other_amazon",
    "books",
    "clothes",
    "games",
  ],
  savings: [],
  credit_card_payment: [],
  other: ["send money"],
  morgage: [],
  stocks: [],
  credit_card_red: [],
  credit_card_blue: [],
  checking: [],
  crypto: ["bitcoin", "etherium"],
  house: ["trash tickets", "decoration", "forniture", "other", "utils"],
};

export type Subcategory =
  // general
  | "books"
  | "clothes"
  | "games"
  | "car insurance"
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
  | "trash tickets"
  | "decoration"
  | "forniture"
  | "utils"
  | "bitcoin"
  | "etherium"
  // house
  | "garbage"
  | "paint"
  | "furniture"
  | "other"
  | "water"
  | "hose's gas"
  | "send money"
  | "other";

// const dummyData: Transaction = {
//   id: "txn-001",
//   title: "Dinner at Carmine's",
//   description: "Italian restaurant with friends on Saturday night",
//   amount: -85.5,
//   date: "2026-01-03",
//   type: "spending",
//   category: "food",
//   subcategory: ["restaurant"],
//   paymentMethod: "credit_card_blue",
// };

// export const transactionsAll: Transaction[] = [
//   // ─────────────────────────────────────────
//   // JANUARY 2026
//   // ─────────────────────────────────────────
//   {
//     id: "txn-001",
//     title: "Dinner at Carmine's",
//     description: "Italian restaurant with friends on Saturday night",
//     amount: -85.5,
//     date: "2026-01-03",
//     type: "spending",
//     category: "food",
//     subcategory: "restaurant",
//     paymentMethod: "credit_card_blue",
//   },
//   {
//     id: "txn-002",
//     title: "Uber Eats - Sushi",
//     description: "Sushi delivery on Friday night",
//     amount: -42.0,
//     date: "2026-01-07",
//     type: "spending",
//     category: "food",
//     subcategory: "delivery",
//     paymentMethod: "credit_card_blue",
//   },
//   {
//     id: "txn-003",
//     title: "Gas Station - Shell",
//     description: "Full tank, highway trip",
//     amount: -65.0,
//     date: "2026-01-09",
//     type: "spending",
//     category: "transport",
//     subcategory: "gas",
//     paymentMethod: "credit_card_red",
//   },
//   {
//     id: "txn-004",
//     title: "Supermarket Groceries",
//     description: "Weekly groceries for cooking at home",
//     amount: -120.3,
//     date: "2026-01-11",
//     type: "spending",
//     category: "food",
//     subcategory: "homemade",
//     paymentMethod: "credit_card_blue",
//   },
//   {
//     id: "txn-005",
//     title: "Amazon - Headphones",
//     description: "Sony WH-1000XM5 noise cancelling headphones",
//     amount: -279.99,
//     date: "2026-01-13",
//     type: "spending",
//     category: "amazon",
//     subcategory: "electronics",
//     paymentMethod: "credit_card_blue",
//   },
//   {
//     id: "txn-006",
//     title: "Electricity Bill",
//     description: "January electricity bill",
//     amount: -98.0,
//     date: "2026-01-15",
//     type: "spending",
//     category: "bills",
//     subcategory: "electricity",
//     paymentMethod: "checking",
//   },
//   {
//     id: "txn-007",
//     title: "Internet Bill",
//     description: "Monthly internet subscription",
//     amount: -59.99,
//     date: "2026-01-15",
//     type: "spending",
//     category: "bills",
//     subcategory: "internet",
//     paymentMethod: "checking",
//   },
//   {
//     id: "txn-008",
//     title: "Mortgage Payment",
//     description: "January mortgage payment",
//     amount: -1800.0,
//     date: "2026-01-01",
//     type: "spending",
//     category: "bills",
//     subcategory: "mortgage",
//     paymentMethod: "checking",
//   },
//   {
//     id: "txn-009",
//     title: "Savings - Stocks",
//     description: "Monthly contribution to stock portfolio",
//     amount: 500.0,
//     date: "2026-01-20",
//     type: "saving",
//     category: "savings",
//     subcategory: "stocks",
//     paymentMethod: "checking",
//   },
//   {
//     id: "txn-010",
//     title: "Savings - Mortgage Fund",
//     description: "Saving toward future mortgage payment",
//     amount: 300.0,
//     date: "2026-01-20",
//     type: "saving",
//     category: "savings",
//     subcategory: "mortgage_savings",
//     paymentMethod: "checking",
//   },
//   {
//     id: "txn-011",
//     title: "Beer - Local Bar",
//     description: "Beers with coworkers after work",
//     amount: -35.0,
//     date: "2026-01-22",
//     type: "spending",
//     category: "drinks",
//     subcategory: "beer",
//     paymentMethod: "credit_card_blue",
//   },
//   {
//     id: "txn-012",
//     title: "Uber - Airport",
//     description: "Ride to JFK airport",
//     amount: -48.0,
//     date: "2026-01-25",
//     type: "spending",
//     category: "transport",
//     subcategory: "uber",
//     paymentMethod: "credit_card_red",
//   },
//   {
//     id: "txn-013",
//     title: "Pay Credit Card Blue",
//     description: "Full payment of Credit Card Blue - January balance",
//     amount: -443.49,
//     date: "2026-01-31",
//     type: "credit_card_payment",
//     category: "credit_card_payment",
//     subcategory: "blue_payment",
//     paymentMethod: "checking",
//   },
//   {
//     id: "txn-014",
//     title: "Pay Credit Card Red",
//     description: "Full payment of Credit Card Red - January balance",
//     amount: -113.0,
//     date: "2026-01-31",
//     type: "credit_card_payment",
//     category: "credit_card_payment",
//     subcategory: "red_payment",
//     paymentMethod: "checking",
//   },

//   // ─────────────────────────────────────────
//   // FEBRUARY 2026
//   // ─────────────────────────────────────────
//   {
//     id: "txn-015",
//     title: "Mortgage Payment",
//     description: "February mortgage payment",
//     amount: -1800.0,
//     date: "2026-02-01",
//     type: "spending",
//     category: "bills",
//     subcategory: "mortgage",
//     paymentMethod: "checking",
//   },
//   {
//     id: "txn-016",
//     title: "Valentine's Dinner",
//     description: "Romantic dinner at steakhouse",
//     amount: -145.0,
//     date: "2026-02-14",
//     type: "spending",
//     category: "food",
//     subcategory: "restaurant",
//     paymentMethod: "credit_card_blue",
//   },
//   {
//     id: "txn-017",
//     title: "Amazon - Household Items",
//     description: "Cleaning supplies and kitchen accessories",
//     amount: -67.45,
//     date: "2026-02-05",
//     type: "spending",
//     category: "amazon",
//     subcategory: "household",
//     paymentMethod: "credit_card_red",
//   },
//   {
//     id: "txn-018",
//     title: "Gas Station - BP",
//     description: "Mid-month fill up",
//     amount: -58.0,
//     date: "2026-02-10",
//     type: "spending",
//     category: "transport",
//     subcategory: "gas",
//     paymentMethod: "credit_card_red",
//   },
//   {
//     id: "txn-019",
//     title: "Car Repair - Tire Change",
//     description: "Two front tires replaced at Firestone",
//     amount: -320.0,
//     date: "2026-02-12",
//     type: "spending",
//     category: "transport",
//     subcategory: "car_repair",
//     paymentMethod: "credit_card_red",
//   },
//   {
//     id: "txn-020",
//     title: "Supermarket Groceries",
//     description: "Bi-weekly groceries",
//     amount: -95.6,
//     date: "2026-02-08",
//     type: "spending",
//     category: "food",
//     subcategory: "homemade",
//     paymentMethod: "credit_card_blue",
//   },
//   {
//     id: "txn-021",
//     title: "Electricity Bill",
//     description: "February electricity bill",
//     amount: -105.0,
//     date: "2026-02-15",
//     type: "spending",
//     category: "bills",
//     subcategory: "electricity",
//     paymentMethod: "checking",
//   },
//   {
//     id: "txn-022",
//     title: "Internet Bill",
//     description: "Monthly internet subscription",
//     amount: -59.99,
//     date: "2026-02-15",
//     type: "spending",
//     category: "bills",
//     subcategory: "internet",
//     paymentMethod: "checking",
//   },
//   {
//     id: "txn-023",
//     title: "Whiskey - Total Wine",
//     description: "Bottle of Maker's Mark",
//     amount: -42.0,
//     date: "2026-02-18",
//     type: "spending",
//     category: "drinks",
//     subcategory: "whiskey",
//     paymentMethod: "credit_card_blue",
//   },
//   {
//     id: "txn-024",
//     title: "DoorDash - Pizza",
//     description: "Friday night pizza delivery",
//     amount: -38.5,
//     date: "2026-02-20",
//     type: "spending",
//     category: "food",
//     subcategory: "delivery",
//     paymentMethod: "credit_card_blue",
//   },
//   {
//     id: "txn-025",
//     title: "Savings - Stocks",
//     description: "Monthly contribution to stock portfolio",
//     amount: 500.0,
//     date: "2026-02-20",
//     type: "saving",
//     category: "savings",
//     subcategory: "stocks",
//     paymentMethod: "checking",
//   },
//   {
//     id: "txn-026",
//     title: "Savings - Mortgage Fund",
//     description: "Saving toward future mortgage payment",
//     amount: 300.0,
//     date: "2026-02-20",
//     type: "saving",
//     category: "savings",
//     subcategory: "mortgage_savings",
//     paymentMethod: "checking",
//   },
//   {
//     id: "txn-027",
//     title: "Pay Credit Card Blue",
//     description: "Full payment of Credit Card Blue - February balance",
//     amount: -321.1,
//     date: "2026-02-28",
//     type: "credit_card_payment",
//     category: "credit_card_payment",
//     subcategory: "blue_payment",
//     paymentMethod: "checking",
//   },
//   {
//     id: "txn-028",
//     title: "Pay Credit Card Red",
//     description: "Full payment of Credit Card Red - February balance",
//     amount: -445.45,
//     date: "2026-02-28",
//     type: "credit_card_payment",
//     category: "credit_card_payment",
//     subcategory: "red_payment",
//     paymentMethod: "checking",
//   },

//   // ─────────────────────────────────────────
//   // MARCH 2026
//   // ─────────────────────────────────────────
//   {
//     id: "txn-029",
//     title: "Mortgage Payment",
//     description: "March mortgage payment",
//     amount: -1800.0,
//     date: "2026-03-01",
//     type: "spending",
//     category: "bills",
//     subcategory: "mortgage",
//     paymentMethod: "checking",
//   },
//   {
//     id: "txn-030",
//     title: "Sushi Restaurant",
//     description: "Lunch with colleagues",
//     amount: -55.0,
//     date: "2026-03-04",
//     type: "spending",
//     category: "food",
//     subcategory: "restaurant",
//     paymentMethod: "credit_card_blue",
//   },
//   {
//     id: "txn-031",
//     title: "Amazon - Clothing",
//     description: "Spring jacket and two shirts",
//     amount: -134.98,
//     date: "2026-03-06",
//     type: "spending",
//     category: "amazon",
//     subcategory: "clothing",
//     paymentMethod: "credit_card_blue",
//   },
//   {
//     id: "txn-032",
//     title: "Gas Station - Shell",
//     description: "Full tank",
//     amount: -62.0,
//     date: "2026-03-09",
//     type: "spending",
//     category: "transport",
//     subcategory: "gas",
//     paymentMethod: "credit_card_red",
//   },
//   {
//     id: "txn-033",
//     title: "Supermarket Groceries",
//     description: "Weekly groceries",
//     amount: -110.75,
//     date: "2026-03-14",
//     type: "spending",
//     category: "food",
//     subcategory: "homemade",
//     paymentMethod: "credit_card_blue",
//   },
//   {
//     id: "txn-034",
//     title: "Electricity Bill",
//     description: "March electricity bill",
//     amount: -89.0,
//     date: "2026-03-15",
//     type: "spending",
//     category: "bills",
//     subcategory: "electricity",
//     paymentMethod: "checking",
//   },
//   {
//     id: "txn-035",
//     title: "Internet Bill",
//     description: "Monthly internet subscription",
//     amount: -59.99,
//     date: "2026-03-15",
//     type: "spending",
//     category: "bills",
//     subcategory: "internet",
//     paymentMethod: "checking",
//   },
//   {
//     id: "txn-036",
//     title: "Rum - Total Wine",
//     description: "Bottle of Bacardi Gold",
//     amount: -28.0,
//     date: "2026-03-17",
//     type: "spending",
//     category: "drinks",
//     subcategory: "rum",
//     paymentMethod: "credit_card_blue",
//   },
//   {
//     id: "txn-037",
//     title: "Uber Eats - Burgers",
//     description: "Weekend delivery",
//     amount: -34.0,
//     date: "2026-03-22",
//     type: "spending",
//     category: "food",
//     subcategory: "delivery",
//     paymentMethod: "credit_card_blue",
//   },
//   {
//     id: "txn-038",
//     title: "Uber - Downtown",
//     description: "Night out ride",
//     amount: -22.5,
//     date: "2026-03-22",
//     type: "spending",
//     category: "transport",
//     subcategory: "uber",
//     paymentMethod: "credit_card_red",
//   },
//   {
//     id: "txn-039",
//     title: "Amazon - Other",
//     description: "Random home items, hard to categorize",
//     amount: -53.2,
//     date: "2026-03-24",
//     type: "spending",
//     category: "amazon",
//     subcategory: "other_amazon",
//     paymentMethod: "credit_card_red",
//   },
//   {
//     id: "txn-040",
//     title: "Savings - Stocks",
//     description: "Monthly contribution to stock portfolio",
//     amount: 500.0,
//     date: "2026-03-20",
//     type: "saving",
//     category: "savings",
//     subcategory: "stocks",
//     paymentMethod: "checking",
//   },
//   {
//     id: "txn-041",
//     title: "Savings - Mortgage Fund",
//     description: "Saving toward future mortgage payment",
//     amount: 300.0,
//     date: "2026-03-20",
//     type: "saving",
//     category: "savings",
//     subcategory: "mortgage_savings",
//     paymentMethod: "checking",
//   },
//   {
//     id: "txn-042",
//     title: "Pay Credit Card Blue",
//     description: "Full payment of Credit Card Blue - March balance",
//     amount: -412.73,
//     date: "2026-03-31",
//     type: "credit_card_payment",
//     category: "credit_card_payment",
//     subcategory: "blue_payment",
//     paymentMethod: "checking",
//   },
//   {
//     id: "txn-043",
//     title: "Pay Credit Card Red",
//     description: "Full payment of Credit Card Red - March balance",
//     amount: -137.7,
//     date: "2026-03-31",
//     type: "credit_card_payment",
//     category: "credit_card_payment",
//     subcategory: "red_payment",
//     paymentMethod: "checking",
//   },

//   // ─────────────────────────────────────────
//   // APRIL 2026
//   // ─────────────────────────────────────────
//   {
//     id: "txn-044",
//     title: "Mortgage Payment",
//     description: "April mortgage payment",
//     amount: -1800.0,
//     date: "2026-04-01",
//     type: "spending",
//     category: "bills",
//     subcategory: "mortgage",
//     paymentMethod: "checking",
//   },
//   {
//     id: "txn-045",
//     title: "Gas Station - BP",
//     description: "Full tank",
//     amount: -60.0,
//     date: "2026-04-03",
//     type: "spending",
//     category: "transport",
//     subcategory: "gas",
//     paymentMethod: "credit_card_red",
//   },
//   {
//     id: "txn-046",
//     title: "Brunch - Egg Shop",
//     description: "Sunday brunch with family",
//     amount: -78.0,
//     date: "2026-04-06",
//     type: "spending",
//     category: "food",
//     subcategory: "restaurant",
//     paymentMethod: "credit_card_blue",
//   },
//   {
//     id: "txn-047",
//     title: "Amazon - Electronics",
//     description: "Smart plug and USB hub",
//     amount: -45.99,
//     date: "2026-04-08",
//     type: "spending",
//     category: "amazon",
//     subcategory: "electronics",
//     paymentMethod: "credit_card_blue",
//   },
//   {
//     id: "txn-048",
//     title: "Supermarket Groceries",
//     description: "Weekly groceries",
//     amount: -102.4,
//     date: "2026-04-10",
//     type: "spending",
//     category: "food",
//     subcategory: "homemade",
//     paymentMethod: "credit_card_blue",
//   },
//   {
//     id: "txn-049",
//     title: "Electricity Bill",
//     description: "April electricity bill",
//     amount: -92.0,
//     date: "2026-04-15",
//     type: "spending",
//     category: "bills",
//     subcategory: "electricity",
//     paymentMethod: "checking",
//   },
//   {
//     id: "txn-050",
//     title: "Internet Bill",
//     description: "Monthly internet subscription",
//     amount: -59.99,
//     date: "2026-04-15",
//     type: "spending",
//     category: "bills",
//     subcategory: "internet",
//     paymentMethod: "checking",
//   },
//   {
//     id: "txn-051",
//     title: "Beer - Craft Brewery",
//     description: "Tasting flight at local brewery",
//     amount: -40.0,
//     date: "2026-04-18",
//     type: "spending",
//     category: "drinks",
//     subcategory: "beer",
//     paymentMethod: "credit_card_blue",
//   },
//   {
//     id: "txn-052",
//     title: "Car Repair - Oil Change",
//     description: "Routine oil change and filter replacement",
//     amount: -85.0,
//     date: "2026-04-19",
//     type: "spending",
//     category: "transport",
//     subcategory: "car_repair",
//     paymentMethod: "credit_card_red",
//   },
//   {
//     id: "txn-053",
//     title: "Grubhub - Thai Food",
//     description: "Thai delivery on weeknight",
//     amount: -36.5,
//     date: "2026-04-21",
//     type: "spending",
//     category: "food",
//     subcategory: "delivery",
//     paymentMethod: "credit_card_blue",
//   },
//   {
//     id: "txn-054",
//     title: "Amazon - Household",
//     description: "Paper towels, detergent, and candles",
//     amount: -58.3,
//     date: "2026-04-22",
//     type: "spending",
//     category: "amazon",
//     subcategory: "household",
//     paymentMethod: "credit_card_red",
//   },
//   {
//     id: "txn-055",
//     title: "Savings - Stocks",
//     description: "Monthly contribution to stock portfolio",
//     amount: 500.0,
//     date: "2026-04-20",
//     type: "saving",
//     category: "savings",
//     subcategory: "stocks",
//     paymentMethod: "checking",
//   },
//   {
//     id: "txn-056",
//     title: "Savings - Mortgage Fund",
//     description: "Saving toward future mortgage payment",
//     amount: 300.0,
//     date: "2026-04-20",
//     type: "saving",
//     category: "savings",
//     subcategory: "mortgage_savings",
//     paymentMethod: "checking",
//   },
//   {
//     id: "txn-057",
//     title: "Pay Credit Card Blue",
//     description: "Full payment of Credit Card Blue - April balance",
//     amount: -378.79,
//     date: "2026-04-30",
//     type: "credit_card_payment",
//     category: "credit_card_payment",
//     subcategory: "blue_payment",
//     paymentMethod: "checking",
//   },
//   {
//     id: "txn-058",
//     title: "Pay Credit Card Red",
//     description: "Full payment of Credit Card Red - April balance",
//     amount: -203.29,
//     date: "2026-04-30",
//     type: "credit_card_payment",
//     category: "credit_card_payment",
//     subcategory: "red_payment",
//     paymentMethod: "checking",
//   },
// ];
