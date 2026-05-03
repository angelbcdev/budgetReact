import type { Transaction } from "../Models/DataTransactions";

// import { transactionsAll } from "../Models/dummyData";

export const settings = {
  id: import.meta?.env?.VITE_GOOGLE_ID ,
  url: import.meta?.env?.VITE_SHEET ,
  password: import.meta?.env?.VITE_PASSWORD  ,
  email: import.meta?.env?.VITE_EMAIL  ,
  isDev: import.meta?.env?.VITE_IS_DEV  ,
};

export async function getSheetData(sheetName: string) {
  try {
    const url = `${settings.url}?sheetName=${encodeURIComponent(sheetName)}`;

    const response = await fetch(url);

    if (!response.ok) throw new Error("Network response was not ok");

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

export const sendSheetData = async ({
  sheetName,
  transaction,
}: {
  sheetName: string;
  transaction: Transaction;
}) => {
  const payload = {
    sheetName,
    ...transaction, // ← this might be the problem
  };

  fetch(settings.url, {
    method: "POST",

    body: JSON.stringify(payload),
  });
};

export const sendSheetDataAll = async () => {
  const categorie = "Amazon";
  for (const t of ["Phone", "Laptop", "Tablet", "Camera", "Headphones"]) {
    const payload = {
      sheetName: "subCategories",
      category: categorie,
      subcategory: t, // ← this might be the problem
    };

    fetch(settings.url, {
      method: "POST",

      body: JSON.stringify(payload),
    });
  }
};
