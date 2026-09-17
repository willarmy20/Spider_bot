export function calculateStatistics(
    trades
  ) {
    if (trades.length === 0) {
      return null;
    }
  
    const wins = trades.filter(
      trade => trade.result === "win"
    );
  
    const losses = trades.filter(
      trade => trade.result === "loss"
    );
  
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
  
    return {
      totalTrades: trades.length,
      wins: wins.length,
      losses: losses.length,
      winRate,
      totalR,
      averageR,
      profitFactor,
    };
  }