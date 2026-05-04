import { settings } from "../api";
import { Transaction } from "../Models/DataTransactions";

type TKEY_SERVICES = "transactions" | "CATEGORIES" | "Date";

const KEY_SERVICES: { [key: string]: TKEY_SERVICES } = {
  TRANSACIONS: "transactions",
  CATEGORIES: "CATEGORIES",
  DATE: "Date",
};

export interface IServiciesDB {
  getSheetData(): Promise<Transaction[]>;
  sendSheetDataTransaction({
    transaction,
  }: {
    transaction: Transaction;
  }): Promise<boolean>;

  handleBackup(data: Transaction[]): void;
  handleUpdate(data: Transaction[]): void;
  handleDeleteOne(data: Transaction[]): void;
  handleDelete(): Promise<boolean>;
}

export class ServiciesLocal implements IServiciesDB {
  constructor() {}

  handleUpdate(data: Transaction[]): void {
    localStorage.setItem(KEY_SERVICES.TRANSACIONS, JSON.stringify(data));
  }

  handleDeleteOne(data: Transaction[]): void {
    localStorage.setItem(KEY_SERVICES.TRANSACIONS, JSON.stringify(data));
  }
  handleDelete(): Promise<boolean> {
    return new Promise((resolve) => {
      resolve(true);
    });
    return new Promise((resolve) => {
      localStorage.removeItem(KEY_SERVICES.TRANSACIONS);
      resolve(true);
    });
  }

  getSheetData(): Promise<Transaction[]> {
    return new Promise((resolve) => {
      const data = JSON.parse(
        localStorage.getItem(KEY_SERVICES.TRANSACIONS) || "[]",
      );
      resolve(data.map((f: any) => new Transaction(f)));
    });
  }
  async sendSheetDataTransaction({
    transaction,
  }: {
    transaction: Transaction;
  }): Promise<boolean> {
    const prevData = await this.getSheetData();
    const newData = [...prevData, transaction];

    return new Promise((resolve) => {
      localStorage.setItem(KEY_SERVICES.TRANSACIONS, JSON.stringify(newData));
      resolve(true);
    });
  }

  handleBackup(data: Transaction[]): void {
    localStorage.setItem(KEY_SERVICES.TRANSACIONS, JSON.stringify(data));
    const db = new GoogleSheetsServicies();
    db.handleBackup(data);
  }
}

export class GoogleSheetsServicies implements IServiciesDB {
  allData: Transaction[] = [];
  constructor() {}
  handleUpdate(data: Transaction[]): void {
    this.handleBackup(data);
  }
  async handleBackup(data?: Transaction[]): Promise<void> {
    console.log(data);
    if (!data) return;
    const payload = {
      sheetName: KEY_SERVICES.TRANSACIONS,
      data: data.map((t) => t.toSheetRow()), // 👈 clave aquí
    };

    const response = await fetch(settings.url, {
      method: "POST",

      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.error("Failed to sync transactions");
    }

    const result = await response.json();
    return new Promise((resolve) => {
      resolve(result);
    });
  }
  handleDelete(): Promise<boolean> {
    return new Promise((resolve) => {
      resolve(false);
    });
  }
  handleDeleteOne(data: Transaction[]): void {
    this.handleBackup(data);
  }

  async getSheetData() {
    try {
      const url = `${settings.url}?sheetName=${encodeURIComponent(
        KEY_SERVICES.TRANSACIONS,
      )}`;
      const response = await fetch(url);

      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();
      const dataToReturn = data.map((item: any) => new Transaction(item));

      return dataToReturn;
    } catch (error) {
      console.error("Fetch error:", error);
    }
  }
  async sendSheetDataTransaction(_: { transaction: Transaction }) {
    return true;
  }
}
