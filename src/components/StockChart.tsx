import React, { useEffect, useRef } from "react";
import highchartsAccessibility from "highcharts/modules/accessibility";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";

import { PriceTypes, StocksDataRecords } from "../types/common_types";

// init the module
if (typeof window !== `undefined`) {
  highchartsAccessibility(Highcharts);
}

export interface StockChartProps {
  stocksData: StocksDataRecords;
  selectedPriceType: PriceTypes;
  min: number;
  max: number;
}

// TODO(rl): add a set dateRange over here
const StockChart: React.FC<StockChartProps> = ({
  stocksData,
  selectedPriceType,
  min,
  max,
}) => {
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);
  const seriesData = Object.keys(stocksData).map((symbol) => ({
    name: symbol,
    data: stocksData[symbol].map((data) => [
      new Date(data.date).getTime(),
      data[selectedPriceType],
    ]) as [number, number][],
    type: "line",
  }));

  const options: Highcharts.Options = {
    chart: {
      backgroundColor: "rgba(0, 0, 0, 0)", // Transparent background
    },
    legend: {
      enabled: true,
    },
    rangeSelector: {
      selected: 1,
      inputEnabled: true, // enable date picker
      verticalAlign: "bottom",
      x: 0,
      y: 0,
      floating: false,
    },
    title: {
      text: "Stock Prices",
    },
    xAxis: {
      type: "datetime",
    },
    yAxis: {
      title: {
        text: "Price",
      },
    },
    series: seriesData as Highcharts.SeriesOptionsType[],
  };

  useEffect(() => {
    if (chartComponentRef.current) {
      chartComponentRef.current.chart.update({
        series: seriesData as Highcharts.SeriesOptionsType[],
      });
    }
  }, [seriesData, stocksData, selectedPriceType]);

  useEffect(() => {
    if (chartComponentRef.current) {
      const chart = chartComponentRef.current.chart;
      const xAxis = chart.xAxis[0];
      const selectedMin = xAxis.getExtremes().min;
      const selectedMax = xAxis.getExtremes().max;

      if (selectedMin && selectedMin < min) {
        // TODO(rl): do something (extend the actual min used for fetching stock data)
        console.log("user selected a range that is not yet cached");
        // setDateRange({ selectedMin, max });
      }

      if (selectedMax && selectedMax > max) {
        // TODO(rl): do something (extend the actual min used for fetching stock data)
        console.log("user selected a range that is not yet cached");
        // setDateRange({ min, selectedMax });
      }
    }
  }, [stocksData, selectedPriceType, min, max]);

  return (
    <HighchartsReact
      highcharts={Highcharts}
      constructorType={"stockChart"}
      options={options}
      ref={chartComponentRef}
    />
  );
};

export default StockChart;
