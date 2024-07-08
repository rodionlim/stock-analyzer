import React from "react";
import { act, render, screen } from "@testing-library/react";
import App from "./App";

test('navigates to Stock Screener page when "Get Started" is clicked', async () => {
  render(<App />);
  const getStartedButton = screen.getByText(/Get Started/i);
  act(() => {
    getStartedButton.click();
  });
  expect(screen.getByText(/Stock Analyzer Chart/i)).toBeInTheDocument();
});
