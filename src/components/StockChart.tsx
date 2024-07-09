import React, { useEffect, useRef } from "react";
import highchartsAccessibility from "highcharts/modules/accessibility";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";

import { PriceTypes, StockDataRecord } from "../types/common_types";

// init the module
if (typeof window !== `undefined`) {
  highchartsAccessibility(Highcharts);
}

export interface StockChartProps {
  stockData: StockDataRecord;
  selectedPriceType: PriceTypes;
}

const StockChart: React.FC<StockChartProps> = ({
  stockData,
  selectedPriceType,
}) => {
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

  const seriesData = Object.keys(stockData).map((symbol) => ({
    name: symbol,
    data: stockData[symbol].map((data) => [
      new Date(data.date).getTime(),
      data[selectedPriceType],
    ]) as [number, number][],
    type: "line",
  }));

  const options: Highcharts.Options = {
    chart: {
      backgroundColor: "rgba(0, 0, 0, 0)", // Transparent background
    },
    rangeSelector: {
      selected: 1,
      inputEnabled: true, // enable date picker
      verticalAlign: "bottom",
      x: 0,
      y: 0,
      floating: true,
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
  }, [stockData, selectedPriceType]);

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
