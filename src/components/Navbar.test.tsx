import React from "react";
import { render, screen } from "@testing-library/react";
import Navbar from "./Navbar";
import { BrowserRouter } from "react-router-dom";

test("renders home and stock analyzer link", () => {
  render(
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  );
  for (const search of [
    ["Home", "/"],
    ["Stock Analyzer", "/stock-analyzer"],
  ]) {
    const linkElement = screen.getByRole("link", { name: search[0] });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement.getAttribute("href")).toEqual(search[1]);
  }
});
