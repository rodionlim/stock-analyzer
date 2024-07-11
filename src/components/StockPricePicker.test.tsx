import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import StockPricePicker from "../components/StockPricePicker";
import { PriceTypes } from "../types/common_types";

describe("StockPricePicker", () => {
  const setSelectedPriceType = jest.fn();

  const renderComponent = (selectedPriceType: PriceTypes) => {
    render(
      <StockPricePicker
        selectedPriceType={selectedPriceType}
        setSelectedPriceType={setSelectedPriceType}
      />
    );
  };

  it("renders correctly with the default selected price type", () => {
    renderComponent("Close");
    expect(screen.getByText("Open")).toBeInTheDocument();
    expect(screen.getByText("High")).toBeInTheDocument();
    expect(screen.getByText("Low")).toBeInTheDocument();
    expect(screen.getByText("Close")).toBeInTheDocument();
  });

  it("applies the selected class to the selected price type button", () => {
    renderComponent("High");
    expect(screen.getByText("High")).toHaveClass("selected");
    expect(screen.getByText("Open")).not.toHaveClass("selected");
    expect(screen.getByText("Low")).not.toHaveClass("selected");
    expect(screen.getByText("Close")).not.toHaveClass("selected");
  });

  it("calls setSelectedPriceType with 'Open' when the Open button is clicked", () => {
    renderComponent("Close");
    fireEvent.click(screen.getByText("Open"));
    expect(setSelectedPriceType).toHaveBeenCalledWith("Open");
  });

  it("calls setSelectedPriceType with 'High' when the High button is clicked", () => {
    renderComponent("Close");
    fireEvent.click(screen.getByText("High"));
    expect(setSelectedPriceType).toHaveBeenCalledWith("High");
  });

  it("calls setSelectedPriceType with 'Low' when the Low button is clicked", () => {
    renderComponent("Close");
    fireEvent.click(screen.getByText("Low"));
    expect(setSelectedPriceType).toHaveBeenCalledWith("Low");
  });

  it("calls setSelectedPriceType with 'Close' when the Close button is clicked", () => {
    renderComponent("Open");
    fireEvent.click(screen.getByText("Close"));
    expect(setSelectedPriceType).toHaveBeenCalledWith("Close");
  });
});
