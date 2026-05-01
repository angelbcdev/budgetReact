import { Transaction } from "../Models/DataTransactions";

export const settings = {
  id: import.meta.env.VITE_GOOGLE_ID,
  url: import.meta.env.VITE_SHEET,
};

type TKEY_SERVICES = "transactions" | "CATEGORIES";

export const KEY_SERVICES: { [key: string]: TKEY_SERVICES } = {
  TRANSACIONS: "transactions",
  CATEGORIES: "CATEGORIES",
};

export interface IServiciesDB {
  getSheetData(sheetName: TKEY_SERVICES): Promise<Transaction[]>;
  sendSheetDataTransaction({
    sheetName,
    transaction,
  }: {
    sheetName: TKEY_SERVICES;
    transaction: Transaction;
  }): Promise<boolean>;
  // sendSheetDataCategories({
  //   mainCategorie,
  //   newSubCategorie,
  // }: {
  //   mainCategorie: TKEY_SERVICES;
  //   newSubCategorie: string;
  // }): Promise<void>;

  handleBackup(data?: Transaction[]): void;
  handleUpdate(id: string): void;
  handleDelete({ sheetName }: { sheetName: TKEY_SERVICES }): Promise<boolean>;
}

export class ServiciesLocal implements IServiciesDB {
  constructor() {}
  handleUpdate(id: string): void {
    throw new Error("Method not implemented.");
  }
  handleDelete({ sheetName }: { sheetName: TKEY_SERVICES }): Promise<boolean> {
    return new Promise((resolve) => {
      localStorage.removeItem(sheetName);
      resolve(true);
    });
  }

  getSheetData(sheetName: TKEY_SERVICES): Promise<any> {
    return new Promise((resolve) => {
      const data = JSON.parse(localStorage.getItem(sheetName) || "[]");
      resolve(data.map((f: any) => new Transaction(f)));
    });
  }
  async sendSheetDataTransaction({
    sheetName,
    transaction,
  }: {
    sheetName: TKEY_SERVICES;
    transaction: Transaction;
  }): Promise<boolean> {
    const prevData = await this.getSheetData(sheetName);
    const newData = [...prevData, transaction];

    return new Promise((resolve) => {
      localStorage.setItem(sheetName, JSON.stringify(newData));
      resolve(true);
    });
  }

  handleBackup(data?: Transaction[]): void {
    if (!data) return;
    const db = new GoogleSheetsServicies();
    data.map((f) => {
      db.sendSheetDataTransaction({
        sheetName: KEY_SERVICES.TRANSACIONS,
        transaction: f,
      });
    });
  }
}

export class GoogleSheetsServicies implements IServiciesDB {
  allData: Transaction[] = [];
  constructor() {}
  handleUpdate(id: string): void {
    throw new Error("Method not implemented.");
  }
  handleBackup(_: Transaction[]): void {
    return;
    throw new Error("Method not implemented.");
  }
  handleDelete(_: { sheetName: TKEY_SERVICES }): Promise<boolean> {
    return new Promise((resolve) => {
      resolve(false);
    });
  }

  async getSheetData(sheetName: string) {
    try {
      const url = `${settings.url}?sheetName=${encodeURIComponent(sheetName)}`;
      const response = await fetch(url);

      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();
      const dataToReturn = data.map((item: any) => new Transaction(item));

      return dataToReturn;
    } catch (error) {
      console.error("Fetch error:", error);
    }
  }
  async sendSheetDataTransaction({
    sheetName,
    transaction,
  }: {
    sheetName: string;
    transaction: Transaction;
  }) {
    console.log(transaction);
    const payload = {
      sheetName,
      ...transaction.toSheetRow(), // ← this might be the problem
    };

    const data = await fetch(settings.url, {
      method: "POST",

      body: JSON.stringify(payload),
    });
    if (!data.ok) return false;
    return true;
  }
  // async sendSheetDataCategories({
  //   mainCategorie,
  //   newSubCategorie,
  // }: {
  //   mainCategorie: string;
  //   newSubCategorie: string;
  // }) {
  //   const payload = {
  //     sheetName: "subCategories",
  //     category: mainCategorie,
  //     subcategory: newSubCategorie, // ← this might be the problem
  //   };

  //   fetch(settings.url, {
  //     method: "POST",

  //     body: JSON.stringify(payload),
  //   });
  // }
}
