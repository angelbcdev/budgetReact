import type { Category, TransactionType, PaymentMethod } from "./dummyData";

interface ITransaction {
  id: string;
  title: string;
  description: string;
  amount: number; // negative = expense, positive = income/saving
  date: Date | string; // ISO format
  type: TransactionType;
  category: Category;
  subcategory: string[];
  paymentMethod: PaymentMethod;
  porcentage: number;
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
  subcategory: string[];
  paymentMethod: PaymentMethod;
  porcentage: number;

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
    this.porcentage = Number(data.porcentage || 0);
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
      title: this.title.toLocaleLowerCase(),
      description: this.description.toLocaleLowerCase(),
      amount: this.amount,
      date: new Date(this.date).toISOString().split("T")[0],
      type: this.type,
      category: this.category.toLocaleLowerCase(),
      subcategory: this.subcategory.map((s) => s.toLocaleLowerCase()).join(","),
      paymentMethod: this.paymentMethod,
      porcentage: String(this?.porcentage),
    };
  }
}
