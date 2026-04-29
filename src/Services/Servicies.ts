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
  sendSheetDataCategories({
    mainCategorie,
    newSubCategorie,
  }: {
    mainCategorie: TKEY_SERVICES;
    newSubCategorie: string;
  }): Promise<void>;
}

export class ServiciesLocal implements IServiciesDB {
  constructor() {}

  getSheetData(sheetName: TKEY_SERVICES): Promise<any> {
    return new Promise((resolve) => {
      resolve(JSON.parse(localStorage.getItem(sheetName) || "[]"));
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
  sendSheetDataCategories({
    mainCategorie,
    newSubCategorie,
  }: {
    mainCategorie: TKEY_SERVICES;
    newSubCategorie: string;
  }): Promise<void> {
    throw new Error("Method not implemented.");
  }
}

// export class GoogleSheetsServicies implements IServiciesDB {
//   allData: Transaction[] = [];
//   constructor() {
//     console.log("Servicies");
//   }

//   async getSheetData(sheetName: string) {
//     try {
//       const url = `${settings.url}?sheetName=${encodeURIComponent(sheetName)}`;

//       const response = await fetch(url);

//       if (!response.ok) throw new Error("Network response was not ok");

//       const data = await response.json();

//       return data;
//     } catch (error) {
//       console.error("Fetch error:", error);
//     }
//   }
//   async sendSheetDataTransaction({
//     sheetName,
//     transaction,
//   }: {
//     sheetName: string;
//     transaction: Transaction;
//   }) {
//     const payload = {
//       sheetName,
//       ...transaction, // ← this might be the problem
//     };

//     fetch(settings.url, {
//       method: "POST",

//       body: JSON.stringify(payload),
//     });
//   }
//   async sendSheetDataCategories({
//     mainCategorie,
//     newSubCategorie,
//   }: {
//     mainCategorie: string;
//     newSubCategorie: string;
//   }) {
//     const payload = {
//       sheetName: "subCategories",
//       category: mainCategorie,
//       subcategory: newSubCategorie, // ← this might be the problem
//     };

//     fetch(settings.url, {
//       method: "POST",

//       body: JSON.stringify(payload),
//     });
//   }
// }
