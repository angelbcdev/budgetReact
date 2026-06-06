export type TKEY_GOALS =
  | "monthlyMortgage"
  | "monthlyBank"
  | "monthlyStocks"
  | "monthlyCrypto";

export type TKEY_MONTHS = Record<string, Record<TKEY_GOALS, number>>;

export const goalsDataDefault: Record<TKEY_GOALS, number> = {
  monthlyMortgage: 1400,
  monthlyBank: 300,
  monthlyStocks: 200,
  monthlyCrypto: 100,
};
