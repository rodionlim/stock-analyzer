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
  selectedStocks: string[];
  selectedPriceType: PriceTypes;
}

const StockChart: React.FC<StockChartProps> = ({
  stocksData,
  selectedStocks,
  selectedPriceType,
}) => {
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);
  const seriesData = Object.keys(stocksData)
    .filter((symbol) => selectedStocks.includes(symbol))
    .map((symbol) => ({
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
    title: {
      text: "Stock Analyzer (Prices)",
    },
    subtitle: {
      text: "Series compared by <em>percent</em>",
    },
    rangeSelector: {
      selected: 4,
      inputEnabled: true, // enable date picker
      verticalAlign: "bottom",
      x: 0,
      y: 0,
      floating: false,
      allButtonsEnabled: true,
    },
    xAxis: {
      type: "datetime",
    },
    yAxis: {
      title: {
        text: "Price %",
      },
      labels: {
        formatter: (x) => {
          const val = parseInt(x.value.toString());
          return (val > 0 ? " + " : "") + val.toString() + "%";
        },
      },
    },
    plotOptions: {
      series: {
        compare: "percent",
      },
    },
    tooltip: {
      pointFormat:
        '<span style="color:{series.color}">' +
        "{series.name}</span>: <b>{point.y}</b> " +
        "({point.change}%)<br/>",
      changeDecimals: 2,
      valueDecimals: 2,
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
