import React from "react";

import { PriceTypes } from "../types/common_types";

import "./StockPricePicker.css";

interface StockPricePickerProps {
  selectedPriceType: PriceTypes;
  setSelectedPriceType: React.Dispatch<React.SetStateAction<PriceTypes>>;
}

const StockPricePicker: React.FC<StockPricePickerProps> = ({
  selectedPriceType,
  setSelectedPriceType,
}) => {
  const handlePriceTypeSelect = (type: PriceTypes) => {
    setSelectedPriceType(type);
  };

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
