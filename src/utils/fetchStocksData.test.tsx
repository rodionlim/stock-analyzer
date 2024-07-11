import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { fetchStocksData } from "./fetchStocksData";
import { StocksDataRecords, TimeSpans } from "../types/common_types";

const mock = new MockAdapter(axios);
const baseURL = "https://api.polygon.io/v2/aggs/ticker";

describe("fetchStocksData", () => {
  const originalEnv = process.env;
  beforeEach(() => {
    process.env = {
      ...originalEnv,
      REACT_APP_POLYGON_API_KEY: "TEMPKEY",
    };
  });
  afterEach(() => {
    mock.reset();
  });

  it("fetches stock data successfully", async () => {
    const mockPayload = {
      results: [
        { t: 1625884800000, o: 100, h: 110, l: 90, c: 105 },
        { t: 1625971200000, o: 106, h: 115, l: 95, c: 110 },
      ],
      resultsCount: 2,
    };
    const expectedOutput = {
      AAPL: [
        { date: 1625884800000, Open: 100, High: 110, Low: 90, Close: 105 },
        { date: 1625971200000, Open: 106, High: 115, Low: 95, Close: 110 },
      ],
    };

    mock
      .onGet(
        `${baseURL}/AAPL/range/1/day/1577836800000/1609459200000?apiKey=TEMPKEY`
      )
      .reply(200, mockPayload);

    const selectedStocks = ["AAPL"];
    const cache: StocksDataRecords = {};
    const multiplier = 1;
    const interval: TimeSpans = "day";
    const start = 1577836800000;
    const end = 1609459200000;

    const result = await fetchStocksData(
      selectedStocks,
      cache,
      multiplier,
      interval,
      start,
      end
    );

    expect(result).toEqual(expectedOutput);
  });

  it("uses cached data if available", async () => {
    const selectedStocks = ["AAPL"];
    const cache: StocksDataRecords = {
      AAPL: [
        { date: 1625884800000, Open: 100, High: 110, Low: 90, Close: 105 },
        { date: 1625971200000, Open: 106, High: 115, Low: 95, Close: 110 },
      ],
    };
    const multiplier = 1;
    const interval: TimeSpans = "day";
    const start = 1577836800000;
    const end = 1609459200000;

    const result = await fetchStocksData(
      selectedStocks,
      cache,
      multiplier,
      interval,
      start,
      end
    );

    expect(result).toEqual(cache);
    expect(mock.history.get.length).toBe(0); // Ensure no API call was made
  });

  it("throws an error if API request fails", async () => {
    mock
      .onGet(
        `${baseURL}/AAPL/range/1/day/1577836800000/1609459200000?apiKey=TEMPKEY`
      )
      .reply(500);

    const selectedStocks = ["AAPL"];
    const cache: StocksDataRecords = {};
    const multiplier = 1;
    const interval: TimeSpans = "day";
    const start = 1577836800000;
    const end = 1609459200000;

    await expect(
      fetchStocksData(selectedStocks, cache, multiplier, interval, start, end)
    ).rejects.toThrow();
  });
});
