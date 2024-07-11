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

// lowest form of aggregation is currently set to date, needs to go to a smaller denomination and aggregate upwards in future (Better to shift this to an api server)s
export type StocksDataRecords = {
  [symbol: string]: {
    date: string | number;
    Open: number;
    High: number;
    Low: number;
    Close: number;
  }[];
};
