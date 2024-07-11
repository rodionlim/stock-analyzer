import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import { StocksDataRecords, TimeSpans } from "../types/common_types";
import { fetchStocksData } from "../utils/fetchStocksData";

const useFetchStocksData = (
  selectedStocks: string[],
  interval: TimeSpans = "day",
  multiplier: number = 1
) => {
  const [stockData, setStockData] = useState<StocksDataRecords>({});
  const cacheStock = async () => {
    if (selectedStocks.length === 0) return;

    // we have a 2 years limitation on free tier API, ideally, we want to make this pull a reasonable amount of data and cache it
    // so that we don't have to keep hitting the API. On daily bars, that is fine. If we are pulling bars at seconds interval, that is 31 mil data-points in a year
    // we want to optimize this to have a maximum of 1000 data points for performance reasons
    const dt = new Date();
    const end = dt.getTime();
    const start = dt.setFullYear(dt.getFullYear() - 2);

    try {
      const data = await fetchStocksData(
        selectedStocks,
        stockData,
        multiplier,
        interval,
        start,
        end
      );
      setStockData(data);
    } catch (err) {
      toast.error((err as Error).message);
    }
  };

  useEffect(() => {
    cacheStock();
  }, [selectedStocks, interval, multiplier]);

  return stockData;
};

export default useFetchStocksData;
