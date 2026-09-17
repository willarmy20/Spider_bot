import { candles4H } from "./data/data.js";
import { findLevels } from "./strategy/levels.js";

const levels = findLevels(candles4H);

console.log("NUMBER OF 4H CANDLES:");
console.log(candles4H.length);

console.log("NUMBER OF LEVELS:");
console.log(levels.length);

console.log("FIRST 10 LEVELS:");
console.table(levels.slice(0, 10));

console.log("LAST 10 LEVELS:");
console.table(levels.slice(-10));

// import { candles1H, candles4H } from "./data/data.js";

// import { runBacktest } from "./backtest/engine.js";

// import { calculateStatistics } from "./backtest/statistics.js";

// import { getMarketData } from "./data/alphaVantage.js";

// const trades = runBacktest(
//   candles4H,
//   candles1H,
//   2
// );

// const statistics = calculateStatistics(trades);
// const data = await getMarketData();

// console.log(data);

// console.log("TRADES");
// console.table(trades);

// console.log("STATISTICS");
// console.table(statistics);
