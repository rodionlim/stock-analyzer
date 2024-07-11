import axios from "axios";

import { StocksDataRecords, TimeSpans } from "../types/common_types";

export const fetchStocksData = async (
  selectedStocks: string[],
  cache: StocksDataRecords,
  multiplier: number, // aggregate bar multiplier to the timespan
  interval: TimeSpans, // aggregate bar timespan
  start: number, // earliest start time
  end: number // latest start time
) => {
  const newStocksData: StocksDataRecords = {};
  await Promise.all(
    selectedStocks.map(async (symbol) => {
      // even though we make multiplier and interval parameters, for purpose of this demo, we hard code it to a single day
      try {
        // very simplistic caching
        if (!cache[symbol]) {
          const response = await axios.get(
            `https://api.polygon.io/v2/aggs/ticker/${symbol}/range/${multiplier}/${interval}/${start}/${end}?apiKey=${process.env.REACT_APP_POLYGON_API_KEY}`,
            { timeout: 5000 }
          );
          console.log(
            `Fetch [${symbol}]. Received response from polygon`,
            response.data
          );
          const data = response.data;
          if (data.resultsCount > 0) {
            newStocksData[symbol] = data.results.map((entry: any) => ({
              date: entry.t,
              Open: entry.o,
              High: entry.h,
              Low: entry.l,
              Close: entry.c,
            }));
          } else {
            newStocksData[symbol] = [];
          }
        } else {
          console.log("cache hit", symbol);
          newStocksData[symbol] = cache[symbol];
        }
      } catch (e) {
        console.error(e);
        throw e;
      }
    })
  );
  return newStocksData;
};
