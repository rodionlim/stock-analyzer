import React from "react";
import { ToastContainer } from "react-toastify";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import StockSelector from "./StockSelector";

describe("StockSelector", () => {
  it("should render input and add button", () => {
    render(
      <>
        <StockSelector selectedStocks={[]} onStockChange={() => {}} />
        <ToastContainer />
      </>
    );
    expect(
      screen.getByPlaceholderText("Enter stock symbol")
    ).toBeInTheDocument();
    expect(screen.getByText("Add Stock")).toBeInTheDocument();
  });

  it("should add a stock when add button is clicked", () => {
    const onStockChange = jest.fn();
    render(<StockSelector selectedStocks={[]} onStockChange={onStockChange} />);

    fireEvent.change(screen.getByPlaceholderText("Enter stock symbol"), {
      target: { value: "AAPL" },
    });
    fireEvent.click(screen.getByText("Add Stock"));

    expect(onStockChange).toHaveBeenCalledWith(["AAPL"]);
  });

  it("should not add more than 3 stocks and display a toast notification", () => {
    const onStockChange = jest.fn();
    render(
      <>
        <StockSelector
          selectedStocks={["AAPL", "GOOGL", "AMZN"]}
          onStockChange={onStockChange}
        />
        <ToastContainer />
      </>
    );

    fireEvent.change(screen.getByPlaceholderText("Enter stock symbol"), {
      target: { value: "MSFT" },
    });
    fireEvent.click(screen.getByText("Add Stock"));

    expect(onStockChange).not.toHaveBeenCalled();
    expect(
      screen.getByText(
        "Maximum number of stocks to be added to chart is 3. Please remove before adding again."
      )
    ).toBeInTheDocument();
  });

  it("should not add duplicate stocks", () => {
    const onStockChange = jest.fn();
    render(
      <>
        <StockSelector
          selectedStocks={["AAPL"]}
          onStockChange={onStockChange}
        />
        <ToastContainer />
      </>
    );

    fireEvent.change(screen.getByPlaceholderText("Enter stock symbol"), {
      target: { value: "AAPL" },
    });
    fireEvent.click(screen.getByText("Add Stock"));

    expect(onStockChange).not.toHaveBeenCalled();
    expect(
      screen.getByText("Stock has already been added to charts")
    ).toBeInTheDocument();
  });

  it("should remove a stock when remove button is clicked", () => {
    const onStockChange = jest.fn();
    render(
      <>
        <StockSelector
          selectedStocks={["AAPL"]}
          onStockChange={onStockChange}
        />
        <ToastContainer />
      </>
    );

    fireEvent.click(screen.getByText("❌"));

    expect(onStockChange).toHaveBeenCalledWith([]);
  });
});
