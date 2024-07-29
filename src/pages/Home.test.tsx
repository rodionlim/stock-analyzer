import React from "react";
import * as router from "react-router";
import { render, screen } from "@testing-library/react";
import Home from "./Home";
import { BrowserRouter } from "react-router-dom";

const navigate = jest.fn();

describe("Home", () => {
  beforeEach(() => {
    jest.spyOn(router, "useNavigate").mockImplementation(() => navigate);
  });

  it("renders home and stock analyzer link", () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    const headerElement = screen.getByText("Welcome to Stock Analyzer");
    expect(headerElement).toBeInTheDocument;
  });

  it('navigates to Stock Screener page when "Get Started" is clicked', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    const button = screen.getByText("Get Started");
    button.click();
    expect(navigate).toHaveBeenCalledWith("/stock-analyzer");
  });
});
