export function calculateStatistics(trades) {
  if (trades.length === 0) {
    return null;
  }

  const wins = trades.filter(
    trade => trade.result === "win"
  );

  const losses = trades.filter(
    trade => trade.result === "loss"
  );

  // =========================
  // R PERFORMANCE
  // =========================

  const totalR = trades.reduce(
    (sum, trade) => sum + trade.R,
    0
  );

  const winRate =
    (wins.length / trades.length) * 100;

  const averageR =
    totalR / trades.length;

  const grossProfit = wins.reduce(
    (sum, trade) => sum + trade.R,
    0
  );

  const grossLoss = Math.abs(
    losses.reduce(
      (sum, trade) => sum + trade.R,
      0
    )
  );

  const profitFactor =
    grossLoss === 0
      ? Infinity
      : grossProfit / grossLoss;


  // =========================
  // EQUITY CURVE
  // =========================

  let equity = 0;
  let peakEquity = 0;
  let maxDrawdown = 0;

  const equityCurve = [];

  for (const trade of trades) {

    equity += trade.R;

    if (equity > peakEquity) {
      peakEquity = equity;
    }

    const drawdown =
      peakEquity - equity;

    if (drawdown > maxDrawdown) {
      maxDrawdown = drawdown;
    }

    equityCurve.push({
      tradeNumber: equityCurve.length + 1,
      equity,
      drawdown
    });
  }


  // =========================
  // LOSING STREAK
  // =========================

  let currentLosingStreak = 0;
  let longestLosingStreak = 0;

  for (const trade of trades) {

    if (trade.result === "loss") {

      currentLosingStreak++;

      if (
        currentLosingStreak >
        longestLosingStreak
      ) {
        longestLosingStreak =
          currentLosingStreak;
      }

    } else {

      currentLosingStreak = 0;

    }
  }


  // =========================
  // MONTHLY PERFORMANCE
  // =========================

  const monthly = {};

  for (const trade of trades) {

    const date = new Date(trade.entryTime);

    const year = date.getUTCFullYear();

    const month = String(
      date.getUTCMonth() + 1
    ).padStart(2, "0");

    const key = `${year}-${month}`;

    if (!monthly[key]) {
      monthly[key] = {
        month: key,
        trades: 0,
        wins: 0,
        losses: 0,
        totalR: 0
      };
    }

    monthly[key].trades++;

    monthly[key].totalR += trade.R;

    if (trade.result === "win") {
      monthly[key].wins++;
    } else {
      monthly[key].losses++;
    }
  }

  const monthlyPerformance =
    Object.values(monthly).map(month => ({
      ...month,

      winRate:
        (month.wins / month.trades) * 100
    }));


  // =========================
  // LONG VS SHORT
  // =========================

  const directions = {
    long: {
      direction: "long",
      trades: 0,
      wins: 0,
      losses: 0,
      totalR: 0
    },

    short: {
      direction: "short",
      trades: 0,
      wins: 0,
      losses: 0,
      totalR: 0
    }
  };

  for (const trade of trades) {

    const stats =
      directions[trade.direction];

    if (!stats) {
      continue;
    }

    stats.trades++;

    stats.totalR += trade.R;

    if (trade.result === "win") {
      stats.wins++;
    } else {
      stats.losses++;
    }
  }

  const directionPerformance =
    Object.values(directions).map(direction => ({
      ...direction,

      winRate:
        direction.trades === 0
          ? 0
          : (direction.wins / direction.trades) * 100
    }));


  // =========================
  // TRADE-BY-TRADE REPORT
  // =========================

  const tradeReport = trades.map(
    (trade, index) => {

      const signalDate =
        new Date(trade.signalTime);

      const entryDate =
        new Date(trade.entryTime);

      const exitDate =
        new Date(trade.exitTime);

      const durationHours =
        (
          exitDate.getTime() -
          entryDate.getTime()
        ) / (1000 * 60 * 60);

      return {

        tradeNumber: index + 1,

        direction:
          trade.direction.toUpperCase(),

        signalTime:
          signalDate.toISOString(),

        entryTime:
          entryDate.toISOString(),

        entry:
          Number(trade.entry.toFixed(2)),

        stop:
          Number(trade.stop.toFixed(2)),

        target:
          Number(trade.target.toFixed(2)),

        exitTime:
          exitDate.toISOString(),

        exitPrice:
          Number(trade.exitPrice.toFixed(2)),

        result:
          trade.result.toUpperCase(),

        R:
          Number(trade.R.toFixed(2)),

        durationHours:
          Number(durationHours.toFixed(2))
      };
    }
  );


  // =========================
  // RETURN RESULTS
  // =========================

  return {

    totalTrades: trades.length,
    wins: wins.length,
    losses: losses.length,

    winRate,
    totalR,
    averageR,
    profitFactor,

    maxDrawdown,
    longestLosingStreak,

    equityCurve,

    monthlyPerformance,

    directionPerformance,

    tradeReport
  };
}