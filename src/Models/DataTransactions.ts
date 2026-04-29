import type {
  Category,
  Subcategory,
  TransactionType,
  PaymentMethod,
} from "./dummyData";

interface ITransaction {
  id: string;
  title: string;
  description: string;
  amount: number; // negative = expense, positive = income/saving
  date: Date | string; // ISO format
  type: TransactionType;
  category: Category;
  subcategory: Subcategory[];
  paymentMethod: PaymentMethod;
}

// ─── Transaction Class ────────────────────────────────────────────────────────

export class Transaction implements ITransaction {
  id: string;
  title: string;
  description: string;
  amount: number; // negative = expense, positive = income/saving
  date: Date | string; // ISO format
  type: TransactionType;
  category: Category;
  subcategory: Subcategory[];
  paymentMethod: PaymentMethod;

  constructor(data: ITransaction) {
    this.validate(data);

    if (typeof data.subcategory === "string") {
      const oldValue: string = data.subcategory;
      (data.subcategory as string[]) = oldValue.split(",");
    }

    this.id = data.id ?? crypto.randomUUID();
    this.title = data.title;
    this.description = data.description;
    this.amount = data.amount;
    this.date = data.date;
    this.type = data.type;
    this.category = data.category;
    this.subcategory = data.subcategory;
    this.paymentMethod = data.paymentMethod;
  }

  private validate(data: Omit<ITransaction, "id">): void {
    if (data.amount <= 0) {
      throw new Error("Amount must be greater than zero.");
    }
  }

  // Serialize to a flat object — ready to send to Google Sheets
  toSheetRow(): Record<string, string | number> {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      amount: this.amount,
      date: String(this.date),
      type: this.type,
      category: this.category,
      subcategory: this.subcategory.join(", "),
      paymentMethod: this.paymentMethod ?? "",
    };
  }
}
