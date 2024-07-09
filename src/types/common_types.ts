export {};

export type PriceTypes = "Open" | "High" | "Low" | "Close";

export type StockDataRecord = {
  [symbol: string]: {
    date: string;
    Open: number;
    High: number;
    Low: number;
    Close: number;
  }[];
};
