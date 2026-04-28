// ─── Enums ───────────────────────────────────────────────────────────────────

enum TransactionType {
  SAVING = "saving",
  SPENDING = "spending",
  CREDIT_CARD_PAYMENT = "credit_card_payment",
}

enum PaymentMethod {
  CREDIT_CARD_BLUE = "credit_card_blue",
  CREDIT_CARD_RED = "credit_card_red",
  CHECKING_ACCOUNT = "checking_account",
}

enum Category {
  FOOD = "food",
  TRANSPORT = "transport",
  DRINKS = "drinks",
  BILLS = "bills",
  AMAZON = "amazon",
  SAVINGS = "savings",
  OTHER = "other",
}

// ─── Subcategories ────────────────────────────────────────────────────────────

enum FoodSubcategory {
  RESTAURANT = "restaurant",
  DELIVERY = "delivery",
  HOMEMADE = "homemade",
}

enum TransportSubcategory {
  GAS = "gas",
  CAR_REPAIR = "car_repair",
  RIDESHARE = "rideshare",
}

enum DrinksSubcategory {
  BEER = "beer",
  RUM = "rum",
  WHISKEY = "whiskey",
}

enum BillsSubcategory {
  MORTGAGE = "mortgage",
  ELECTRICITY = "electricity",
  INTERNET = "internet",
}

enum SavingsSubcategory {
  MORTGAGE = "mortgage",
  STOCKS = "stocks",
}

// Union of all possible subcategories
type Subcategory =
  | FoodSubcategory
  | TransportSubcategory
  | DrinksSubcategory
  | BillsSubcategory
  | SavingsSubcategory
  | string; // fallback for Amazon & Other

// ─── Subcategory Map (Category → its valid subcategories) ─────────────────────

export const SUBCATEGORY_MAP: Record<Category, object> = {
  [Category.FOOD]: FoodSubcategory,
  [Category.TRANSPORT]: TransportSubcategory,
  [Category.DRINKS]: DrinksSubcategory,
  [Category.BILLS]: BillsSubcategory,
  [Category.SAVINGS]: SavingsSubcategory,
  [Category.AMAZON]: {}, // free text subcategory
  [Category.OTHER]: {}, // free text subcategory
};

// ─── Transaction Interface ─────────────────────────────────────────────────────

interface ITransaction {
  id: string;
  title: string;
  description: string;
  amount: number;
  date: Date;
  type: TransactionType;
  category: Category;
  subcategory: Subcategory;

  // Only relevant for SPENDING
  paymentMethod?: PaymentMethod;

  // Only relevant for CREDIT_CARD_PAYMENT — which card is being paid off
  creditCardTarget?: PaymentMethod;
}

// ─── Transaction Class ────────────────────────────────────────────────────────

export class Transaction implements ITransaction {
  id: string;
  title: string;
  description: string;
  amount: number;
  date: Date;
  type: TransactionType;
  category: Category;
  subcategory: Subcategory;
  paymentMethod?: PaymentMethod;
  creditCardTarget?: PaymentMethod;

  constructor(data: Omit<ITransaction, "id">) {
    this.validate(data);

    this.id = crypto.randomUUID();
    this.title = data.title;
    this.description = data.description;
    this.amount = data.amount;
    this.date = data.date ?? new Date();
    this.type = data.type;
    this.category = data.category;
    this.subcategory = data.subcategory;
    this.paymentMethod = data.paymentMethod;
    this.creditCardTarget = data.creditCardTarget;
  }

  private validate(data: Omit<ITransaction, "id">): void {
    if (data.amount <= 0) {
      throw new Error("Amount must be greater than zero.");
    }

    if (data.type === TransactionType.SPENDING && !data.paymentMethod) {
      throw new Error("Spending transactions require a payment method.");
    }

    if (
      data.type === TransactionType.CREDIT_CARD_PAYMENT &&
      !data.creditCardTarget
    ) {
      throw new Error(
        "Credit card payment must specify which card is being paid.",
      );
    }
  }

  // Serialize to a flat object — ready to send to Google Sheets
  toSheetRow(): Record<string, string | number> {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      amount: this.amount,
      date: this.date.toISOString(),
      type: this.type,
      category: this.category,
      subcategory: this.subcategory,
      paymentMethod: this.paymentMethod ?? "",
      creditCardTarget: this.creditCardTarget ?? "",
    };
  }
}
