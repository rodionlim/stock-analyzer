# Stock Analyzer

To facilitate discretionary management, fund managers are often interested in not only looking at
prices of stocks today but what they have been previously to gain further insight into companies.

## Instructions

Node Version - v18.20.3
OS - Mac (Should be compatible with windows and linux as well)

Store your polygon API keys in a `.env` file with the following convention - `REACT_APP_POLYGON_API_KEY={YOUR_API_KEY}`
Start the application with either

1. `yarn start`
2. `yarn build && serve -s build` (Add serve with yarn global add serve if not present)

## Assumptions

1. There is only a single date picker within the chart itself, date selection is only allowed up to the latest 2 years (We can expand this, but it leads to additional complexity that should be handled at the API server layer instead, in this case, we are limited to the free tier of 5 calls of up to 2 years per minute)
2. Charting only graphs daily OHLC prices, other timespans like seconds, minutes, weekly, monthly etc. are not supported
3. Charting library used is HighCharts
4. Testing framework used is mainly `@testing-library/react`. Tests for all components other than the charting library is implemented. HighCharts require `enzyme` to be used

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

In general, tests should cover the following aspects:

- If a component renders with or without props
- How a component renders with state changes
- How a component reacts to user interactions

Launches the test runner in the interactive watch mode

### `yarn tst:cov`

Run tests with coverage

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!
