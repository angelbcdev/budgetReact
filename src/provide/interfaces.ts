export type TKEY_GOALS =
  | "savingsMorgage"
  | "savingsBank"
  | "savingsStocks"
  | "savingsCrypto";

export type TKEY_MONTHS = Record<string, Record<TKEY_GOALS, number>>;

export const goalsDataDefault: Record<TKEY_GOALS, number> = {
  savingsMorgage: 1400,
  savingsBank: 300,
  savingsStocks: 200,
  savingsCrypto: 100,
};
