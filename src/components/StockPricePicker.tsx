import React from "react";

import { PriceTypes } from "../types/common_types";

import "./StockPricePicker.css";

interface StockPricePickerProps {
  selectedPriceType: PriceTypes;
  handlePriceTypeSelect: (priceType: PriceTypes) => void;
}

const StockPricePicker: React.FC<StockPricePickerProps> = ({
  selectedPriceType,
  handlePriceTypeSelect,
}) => {
  return (
    <>
      <button
        className={`stock-price-type-option ${
          selectedPriceType === "Open" ? "selected" : ""
        }`}
        onClick={() => handlePriceTypeSelect("Open")}
      >
        Open
      </button>
      <button
        className={`stock-price-type-option ${
          selectedPriceType === "High" ? "selected" : ""
        }`}
        onClick={() => handlePriceTypeSelect("High")}
      >
        High
      </button>
      <button
        className={`stock-price-type-option ${
          selectedPriceType === "Low" ? "selected" : ""
        }`}
        onClick={() => handlePriceTypeSelect("Low")}
      >
        Low
      </button>
      <button
        className={`stock-price-type-option ${
          selectedPriceType === "Close" ? "selected" : ""
        }`}
        onClick={() => handlePriceTypeSelect("Close")}
      >
        Close
      </button>
    </>
  );
};

export default StockPricePicker;
