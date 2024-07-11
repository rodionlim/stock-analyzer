import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import { StocksDataRecords, TimeSpans } from "../types/common_types";
import { fetchStocksData } from "../utils/fetchStocksData";

const useFetchStocksData = (
  selectedStocks: string[],
  setSelectedStocks: React.Dispatch<React.SetStateAction<string[]>>,
  start: number,
  end: number,
  multiplier: number = 1,
  interval: TimeSpans = "day"
) => {
  const [stockData, setStockData] = useState<StocksDataRecords>({});
  const cacheStock = async () => {
    if (selectedStocks.length === 0) return;

    const prevSelectedStock = Object.keys(stockData);
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
      setSelectedStocks(prevSelectedStock); // if an error occurs, we remove it from the selection altogether
      toast.error((err as Error).message);
    }
  };

  useEffect(() => {
    cacheStock();
  }, [selectedStocks, interval, multiplier]);

  return stockData;
};

export default useFetchStocksData;
