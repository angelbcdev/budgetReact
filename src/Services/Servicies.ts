import { Transaction } from "../Models/DataTransactions";

export const settings = {
  id: import.meta.env.VITE_GOOGLE_ID,
  url: import.meta.env.VITE_SHEET,
};

type TKEY_SERVICES = "transactions" | "CATEGORIES" | "Date";

export const KEY_SERVICES: { [key: string]: TKEY_SERVICES } = {
  TRANSACIONS: "transactions",
  CATEGORIES: "CATEGORIES",
  DATE:"Date"
};

//TODO all routes has to be inside of eache services 

export interface IServiciesDB {
  getSheetData(sheetName: TKEY_SERVICES): Promise<Transaction[]>;
  sendSheetDataTransaction({
    sheetName,
    transaction,
  }: {
    sheetName: TKEY_SERVICES;
    transaction: Transaction;
  }): Promise<boolean>;

  handleBackup(data?: Transaction[]): void;
  handleUpdate(data?: Transaction): void;
  handleDeleteOne(data?: Transaction): void;
  handleDelete({ sheetName }: { sheetName: TKEY_SERVICES }): Promise<boolean>;
}

export class ServiciesLocal implements IServiciesDB {
  constructor() {}


  handleUpdate(newTransaction: Transaction): void {
    this.getSheetData(KEY_SERVICES.TRANSACIONS).then(oldData =>{
      const old = oldData.filter(t => t.id != newTransaction.id)
      const newData = [...old , newTransaction] 
      localStorage.setItem(KEY_SERVICES.TRANSACIONS, JSON.stringify(newData));
    })
    
    
      
    
  }

    handleDeleteOne(newTransaction: Transaction): void {
    this.getSheetData(KEY_SERVICES.TRANSACIONS).then(oldData =>{
      const old = oldData.filter(t => t.id != newTransaction.id)
      const newData = [...old] 
      localStorage.setItem(KEY_SERVICES.TRANSACIONS, JSON.stringify(newData));
    })
    
    
      
    
  }
  handleDelete({ sheetName }: { sheetName: TKEY_SERVICES }): Promise<boolean> {
    return new Promise((resolve) => {resolve(true)})
    return new Promise((resolve) => {
      localStorage.removeItem(sheetName);
      resolve(true);
    });
  }

  getSheetData(sheetName: TKEY_SERVICES): Promise<Transaction[]> {
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
   
    if (!settings.url){
      console.log("Can't save now")
      return
    }
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
  handleUpdate(_: Transaction): void {
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
  handleDeleteOne(_: Transaction): void {
    throw new Error("Method not implemented.");
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
