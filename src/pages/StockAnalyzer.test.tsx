import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import StockAnalyzer from "./StockAnalyzer";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";

const mock = new MockAdapter(axios);
const mockResponse = {
  results: [
    { t: "2022-07-10", o: 100, h: 110, l: 90, c: 105 },
    { t: "2022-07-11", o: 106, h: 115, l: 95, c: 110 },
  ],
};

describe("StockAnalyzer", () => {
  it('navigates to Stock Screener page when "Get Started" is clicked', () => {
    render(<StockAnalyzer />);
    expect(screen.getByText(/Stock Analyzer Chart/i)).toBeInTheDocument();
    expect(screen.queryByText(/Open/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/High/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Low/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Close/i)).not.toBeInTheDocument();
  });

  it("displays stock picker and chart when stocks have been added", async () => {
    render(<StockAnalyzer />);
    const stockInput = screen.getByPlaceholderText(/Enter stock symbol/i);
    fireEvent.change(stockInput, { target: { value: "AAPL" } });

    const addButton = screen.getByText("Add Stock");
    addButton.click();

    mock.onGet(new RegExp("https://api.polygon.io/*")).reply(200, mockResponse);

    await waitFor(() => {
      expect(screen.getAllByText(/AAPL/i)[0]).toBeInTheDocument();
      expect(screen.getAllByText(/Open/i)[0]).toBeInTheDocument();
      expect(screen.getAllByText(/High/i)[0]).toBeInTheDocument();
      expect(screen.getAllByText(/Low/i)[0]).toBeInTheDocument();
      expect(screen.getAllByText(/Close/i)[0]).toBeInTheDocument();
    });
  });
});
