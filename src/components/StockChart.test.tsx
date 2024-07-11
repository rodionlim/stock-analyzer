import StockChart, { StockChartProps } from "./StockChart";
import { render } from "@testing-library/react";

// Mock stock data
const mockStocksData = {
  AAPL: [{ date: "2023-01-01", Open: 100, High: 104, Low: 99, Close: 100 }],
  MSFT: [{ date: "2023-01-01", Open: 200, High: 204, Low: 199, Close: 200 }],
};

describe("StockChart Component", () => {
  it("renders without crashing", () => {
    const mockProps: StockChartProps = {
      stocksData: mockStocksData,
      selectedStocks: Object.keys(mockStocksData),
      selectedPriceType: "Close",
    };
    render(<StockChart {...mockProps} />);
  });

  it("removing single stock from selectedStocks should remove the points from the chart", () => {
    // TODO(rl): this test isn't testing properly, to switch to enzyme to test the behaviour
    const mockProps: StockChartProps = {
      stocksData: mockStocksData,
      selectedStocks: [],
      selectedPriceType: "Close",
    };
    render(<StockChart {...mockProps} />);
  });
});

// TODO(rl): probably should unit test this using enzyme (enzyme is deprecated and won't work with react 18)
