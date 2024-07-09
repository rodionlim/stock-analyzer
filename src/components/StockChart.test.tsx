import StockChart, { StockChartProps } from "./StockChart";
import { render } from "@testing-library/react";

// Mock stock data
const mockStockData = {
  AAPL: [{ date: "2023-01-01", Open: 100, High: 104, Low: 99, Close: 100 }],
  MSFT: [{ date: "2023-01-01", Open: 200, High: 204, Low: 199, Close: 200 }],
};

describe("StockChart Component", () => {
  it("renders without crashing", () => {
    const mockProps: StockChartProps = {
      stockData: mockStockData,
      selectedPriceType: "Close",
    };
    render(<StockChart {...mockProps} />);
  });
});

// TODO(rl): find some way to unit test this without using enzyme (enzyme is deprecated and won't work with react 18)
