import React from "react";
import { ToastContainer } from "react-toastify";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import StockSelector from "./StockSelector";

describe("StockSelector", () => {
  it("should render input and add button", () => {
    render(
      <>
        <StockSelector selectedStocks={[]} setSelectedStocks={() => {}} />
        <ToastContainer />
      </>
    );
    expect(
      screen.getByPlaceholderText("Enter stock symbol")
    ).toBeInTheDocument();
    expect(screen.getByText("Add Stock")).toBeInTheDocument();
  });

  it("should add a stock when add button is clicked", () => {
    const setSelectedStocks = jest.fn();
    render(
      <StockSelector
        selectedStocks={[]}
        setSelectedStocks={setSelectedStocks}
      />
    );

    fireEvent.change(screen.getByPlaceholderText("Enter stock symbol"), {
      target: { value: "AAPL" },
    });
    fireEvent.click(screen.getByText("Add Stock"));

    expect(setSelectedStocks).toHaveBeenCalledWith(["AAPL"]);
  });

  it("should not add more than 3 stocks and display a toast notification", async () => {
    const setSelectedStocks = jest.fn();
    render(
      <>
        <StockSelector
          selectedStocks={["AAPL", "GOOGL", "AMZN"]}
          setSelectedStocks={setSelectedStocks}
        />
        <ToastContainer />
      </>
    );

    fireEvent.change(screen.getByPlaceholderText("Enter stock symbol"), {
      target: { value: "MSFT" },
    });
    fireEvent.click(screen.getByText("Add Stock"));

    expect(setSelectedStocks).not.toHaveBeenCalled();
    expect(
      await screen.findByText(
        "Maximum number of stocks to be added to chart is 3. Please remove before adding again."
      )
    ).toBeInTheDocument();
  });

  it("should not add duplicate stocks", async () => {
    const setSelectedStocks = jest.fn();
    render(
      <>
        <StockSelector
          selectedStocks={["AAPL"]}
          setSelectedStocks={setSelectedStocks}
        />
        <ToastContainer />
      </>
    );

    fireEvent.change(screen.getByPlaceholderText("Enter stock symbol"), {
      target: { value: "AAPL" },
    });
    fireEvent.click(screen.getByText("Add Stock"));

    expect(setSelectedStocks).not.toHaveBeenCalled();
    expect(
      await screen.findByText(`AAPL has already been added to charts`)
    ).toBeInTheDocument();
  });

  it("should remove a stock when remove button is clicked", () => {
    const setSelectedStocks = jest.fn();
    render(
      <>
        <StockSelector
          selectedStocks={["AAPL"]}
          setSelectedStocks={setSelectedStocks}
        />
        <ToastContainer />
      </>
    );

    fireEvent.click(screen.getByText("❌"));

    expect(setSelectedStocks).toHaveBeenCalledWith([]);
  });
});
