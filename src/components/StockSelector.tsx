import React, { useState } from "react";
import { toast } from "react-toastify";

import "./StockSelector.css";

interface StockSelectorProps {
  selectedStocks: string[];
  onStockChange: (stocks: string[]) => void;
}

const StockSelector: React.FC<StockSelectorProps> = ({
  selectedStocks,
  onStockChange,
}) => {
  const [stockInput, setStockInput] = useState("");

  const handleAddStock = () => {
    if (selectedStocks.length >= 3) {
      toast.error(
        "Maximum number of stocks to be added to chart is 3. Please remove before adding again."
      );
      return;
    }
    if (selectedStocks.includes(stockInput.toUpperCase())) {
      toast.warn("Stock has already been added to charts");
      return;
    }
    if (stockInput) {
      onStockChange([...selectedStocks, stockInput.toUpperCase()]);
      setStockInput("");
    }
  };

  const handleRemoveStock = (stock: string) => {
    onStockChange(selectedStocks.filter((s) => s !== stock));
  };

  return (
    <div>
      <input
        type="text"
        value={stockInput}
        onChange={(e) => setStockInput(e.target.value)}
        placeholder="Enter stock symbol"
      />
      <button onClick={handleAddStock}>Add Stock</button>
      <div className="stock-selector-container">
        {selectedStocks.map((stock) => (
          <div key={stock} className="stock-selector-item">
            <span>{stock}</span>
            <button
              onClick={() => handleRemoveStock(stock)}
              className="stock-selector-remove-button"
            >
              ❌
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StockSelector;
