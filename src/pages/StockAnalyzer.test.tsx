import { render, screen } from "@testing-library/react";
import StockAnalyzer from "./StockAnalyzer";

test('navigates to Stock Screener page when "Get Started" is clicked', async () => {
  render(<StockAnalyzer />);
  expect(screen.getByText(/Stock Analyzer Chart/i)).toBeInTheDocument();
});
