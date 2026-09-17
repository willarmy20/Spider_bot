import { candles1H, candles4H } from "./data/data.js";
import { runBacktest } from "./backtest/engine.js";
import { calculateStatistics } from "./backtest/statistics.js";
import { saveEquityCurve } from "./backtest/chart.js";
import { saveTradeReport } from "./backtest/report.js";


// =========================
// RUN BACKTEST
// =========================

const trades = runBacktest(
  candles4H,
  candles1H,
  2
);

const statistics =
  calculateStatistics(trades);


// =========================
// BASIC RESULTS
// =========================

console.log("BACKTEST RESULTS");
console.log("================");

console.log(
  "Total Trades:",
  statistics.totalTrades
);

console.log(
  "Wins:",
  statistics.wins
);

console.log(
  "Losses:",
  statistics.losses
);

console.log(
  "Win Rate:",
  statistics.winRate.toFixed(2) + "%"
);

console.log(
  "Total R:",
  statistics.totalR.toFixed(2)
);

console.log(
  "Average R:",
  statistics.averageR.toFixed(2)
);

console.log(
  "Profit Factor:",
  statistics.profitFactor.toFixed(2)
);

console.log(
  "Max Drawdown:",
  statistics.maxDrawdown.toFixed(2) + "R"
);

console.log(
  "Longest Losing Streak:",
  statistics.longestLosingStreak
);


// =========================
// MONTHLY PERFORMANCE
// =========================

console.log("\nMONTHLY PERFORMANCE");
console.log("===================");

console.table(
  statistics.monthlyPerformance.map(
    month => ({

      Month: month.month,

      Trades: month.trades,

      Wins: month.wins,

      Losses: month.losses,

      "Win Rate":
        month.winRate.toFixed(2) + "%",

      "Total R":
        month.totalR.toFixed(2)

    })
  )
);


// =========================
// LONG VS SHORT
// =========================

console.log("\nLONG VS SHORT");
console.log("=============");

console.table(
  statistics.directionPerformance.map(
    direction => ({

      Direction:
        direction.direction.toUpperCase(),

      Trades:
        direction.trades,

      Wins:
        direction.wins,

      Losses:
        direction.losses,

      "Win Rate":
        direction.winRate.toFixed(2) + "%",

      "Total R":
        direction.totalR.toFixed(2)

    })
  )
);


// =========================
// TRADE-BY-TRADE REPORT
// =========================

console.log("\nTRADE-BY-TRADE REPORT");
console.log("=====================");

console.table(
  statistics.tradeReport
);


// =========================
// SAVE EQUITY CURVE
// =========================

saveEquityCurve(
  statistics.equityCurve
);

// =========================
// SAVE TRADE REPORT
// =========================

saveTradeReport(
  statistics.tradeReport
);