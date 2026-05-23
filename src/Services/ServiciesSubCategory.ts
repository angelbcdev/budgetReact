import { settings } from "../api";
import { SubCategory } from "../components/SubCategoryEddit";
import { KEY_SERVICES } from "./Servicies";

export interface IServiciesDBSubCategories {
  getSheetData(): Promise<SubCategory[]>;
  sendSheetDataTransaction(data: SubCategory[]): Promise<boolean>;

  handleBackup(data: SubCategory[]): Promise<void>;
  handleUpdate(data: SubCategory[]): Promise<void>;
  handleDeleteOne(data: SubCategory[]): Promise<void>;
  handleDelete(): Promise<boolean>;
}


export class ServiciesLocalSubCategories implements IServiciesDBSubCategories {
  constructor() {}

  handleUpdate(data: SubCategory[]): Promise<void> {
    localStorage.setItem(KEY_SERVICES.SUBCATEGORIES, JSON.stringify(data));

    return new Promise((resolve) => {
      resolve();
    });
  }

  handleDeleteOne(data: SubCategory[]): Promise<void> {
    localStorage.setItem(KEY_SERVICES.SUBCATEGORIES, JSON.stringify(data));

    return new Promise((resolve) => {
      resolve();
    });
  }
  handleDelete(): Promise<boolean> {
    return new Promise((resolve) => {
      resolve(true);
    });
    return new Promise((resolve) => {
      localStorage.removeItem(KEY_SERVICES.SUBCATEGORIES);
      resolve(true);
    });
  }

  getSheetData(): Promise<SubCategory[]> {
    return new Promise((resolve) => {
      const data = JSON.parse(
        localStorage.getItem(KEY_SERVICES.SUBCATEGORIES) || "[]",
      );
      resolve(data.map((f: any) => new SubCategory(f)));
    });
  }
  async sendSheetDataTransaction(data: SubCategory[]): Promise<boolean> {
    return new Promise((resolve) => {
      localStorage.setItem(KEY_SERVICES.SUBCATEGORIES, JSON.stringify(data));
      resolve(true);
    });
  }

  handleBackup(data: SubCategory[]): Promise<void> {
    localStorage.setItem(KEY_SERVICES.SUBCATEGORIES, JSON.stringify(data));
    const db = new GoogleSheetsServiciesSubCategories();
    db.handleBackup(data);
    return new Promise((resolve) => {
      resolve();
    });
  }
}

export class GoogleSheetsServiciesSubCategories implements IServiciesDBSubCategories {
  constructor() {}
  handleUpdate(data: SubCategory[]): Promise<void> {
    this.handleBackup(data);
    return new Promise((resolve) => {
      resolve();
    });
  }
  async handleBackup(data?: SubCategory[]): Promise<void> {
    if (!data) return;
    const payload = {
      sheetName: KEY_SERVICES.SUBCATEGORIES,
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
  handleDeleteOne(data: SubCategory[]): Promise<void> {
    this.handleBackup(data);
    return new Promise((resolve) => {
      resolve();
    });
  }

  async getSheetData() {
    try {
      const url = `${settings.url}?sheetName=${encodeURIComponent(
        KEY_SERVICES.SUBCATEGORIES,
      )}`;
      const response = await fetch(url);

      // if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();
      const dataToReturn = data.map((item: any) => new SubCategory(item));

      return dataToReturn;
    } catch (error) {
      console.error("Fetch error:", error);
    }
  }
  async sendSheetDataTransaction(data: SubCategory[]) {
    this.handleBackup(data);
    return true;
  }
}
