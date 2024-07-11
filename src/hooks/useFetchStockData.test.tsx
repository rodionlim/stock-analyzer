import { renderHook } from "@testing-library/react-hooks";

import useFetchStocksData from "./useFetchStocksData";
import { fetchStocksData } from "../utils/fetchStocksData";

jest.mock("../utils/fetchStocksData");

describe("useFetchStocksData", () => {
  beforeEach(() => {
    (fetchStocksData as unknown as jest.Mock).mockReset();
  });

  it("fetches and sets stocks data", async () => {
    (fetchStocksData as unknown as jest.Mock).mockResolvedValue({
      AAPL: [
        { date: "2022-07-10", Open: 100, High: 110, Low: 90, Close: 105 },
        { date: "2022-07-11", Open: 106, High: 115, Low: 95, Close: 110 },
      ],
      MSFT: [
        { date: "2022-07-10", Open: 200, High: 210, Low: 190, Close: 205 },
        { date: "2022-07-11", Open: 206, High: 215, Low: 195, Close: 210 },
      ],
    });
    const { result, waitForNextUpdate } = renderHook(() =>
      useFetchStocksData(["AAPL", "MSFT"], 100000, 200000)
    );
    await waitForNextUpdate();
    expect(result.current).toEqual({
      AAPL: [
        { date: "2022-07-10", Open: 100, High: 110, Low: 90, Close: 105 },
        { date: "2022-07-11", Open: 106, High: 115, Low: 95, Close: 110 },
      ],
      MSFT: [
        { date: "2022-07-10", Open: 200, High: 210, Low: 190, Close: 205 },
        { date: "2022-07-11", Open: 206, High: 215, Low: 195, Close: 210 },
      ],
    });
  });
});

it("handles error case properly when upstream API has issues", async () => {
  (fetchStocksData as unknown as jest.Mock).mockRejectedValue(
    new Error("API limit breached")
  );
  const { result, waitFor } = renderHook(() =>
    useFetchStocksData(["AAPL", "MSFT"], 100000, 200000)
  );
  expect(result.current).toMatchObject({});

  await waitFor(() => {
    expect(result.current).toMatchObject({});
  });
});
