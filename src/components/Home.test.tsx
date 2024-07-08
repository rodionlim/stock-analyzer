import React, { act } from "react";
import { render, screen } from "@testing-library/react";
import Home from "./Home";
import { BrowserRouter } from "react-router-dom";

test("renders home and stock analyzer link", () => {
  render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );
  const headerElement = screen.getByText("Welcome to Stock Analyzer");
  expect(headerElement).toBeInTheDocument;
});
