import React, { useState } from "react";

import StockChart from "../components/StockChart";
import StockPricePicker from "../components/StockPricePicker";
import StockSelector from "../components/StockSelector";
import { PriceTypes } from "../types/common_types";

import "./StockAnalyzer.css";
import useFetchStocksData from "../hooks/useFetchStocksData";

const StockAnalyzer: React.FC = () => {
  const [selectedPriceType, setSelectedPriceType] =
    useState<PriceTypes>("Close"); // user selects type of price to chart, OHLC
  const [selectedStocks, setSelectedStocks] = useState<string[]>([]); // user selects stocks they want to chart

  // we have a 2 years limitation on free tier API, ideally, we want to make this pull a reasonable amount of data and cache it
  // so that we don't have to keep hitting the API. On daily bars, that is fine. If we are pulling bars at seconds interval, that is 31 mil data-points in a year
  // we want to optimize this to have a maximum of 1000 data points for performance reasons. Also, there is a chance an end user selects a point out of the current range
  // in the GUI, we want to refetch when that happens
  const dt = new Date();
  const max = dt.getTime();
  const min = dt.setFullYear(dt.getFullYear() - 2);
  const [dateRange, setDateRange] = useState<{
    min: number;
    max: number;
  }>({ min, max });

  const stocksData = useFetchStocksData(selectedStocks, min, max);

  return (
    <div className="stock-analyzer">
      <h1>Stock Analyzer Chart</h1>
      <StockSelector
        selectedStocks={selectedStocks}
        setSelectedStocks={setSelectedStocks}
      />
      <div className="stock-price-type-picker">
        <StockPricePicker
          selectedPriceType={selectedPriceType}
          setSelectedPriceType={setSelectedPriceType}
        />
      </div>
      <div className="stock-chart">
        <StockChart
          stocksData={stocksData}
          selectedPriceType={selectedPriceType}
          min={dateRange.min}
          max={dateRange.max}
        />
      </div>
    </div>
  );
};

export default StockAnalyzer;
