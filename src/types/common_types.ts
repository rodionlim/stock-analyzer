export {};

export type PriceTypes = "Open" | "High" | "Low" | "Close";

export type TimeSpans =
  | "second"
  | "minute"
  | "hour"
  | "day"
  | "week"
  | "month"
  | "quarter"
  | "year";

export type StocksDataRecords = {
  [symbol: string]: {
    date: string | number;
    Open: number;
    High: number;
    Low: number;
    Close: number;
  }[];
};
