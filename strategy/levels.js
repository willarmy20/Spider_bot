export function findSwingHigh(candles, index) {
    if (index < 2 || index >= candles.length - 2) {
      return false;
    }
  
    const current = candles[index];
  
    return (
      current.high > candles[index - 1].high &&
      current.high > candles[index - 2].high &&
      current.high > candles[index + 1].high &&
      current.high > candles[index + 2].high
    );
  }
  
  export function findSwingLow(candles, index) {
    if (index < 2 || index >= candles.length - 2) {
      return false;
    }
  
    const current = candles[index];
  
    return (
      current.low < candles[index - 1].low &&
      current.low < candles[index - 2].low &&
      current.low < candles[index + 1].low &&
      current.low < candles[index + 2].low
    );
  }
  
  export function findLevels(candles) {
    const levels = [];
  
    for (let i = 2; i < candles.length - 2; i++) {
      if (findSwingHigh(candles, i)) {
        levels.push({
          type: "resistance",
          price: candles[i].high.toFixed(2),
          time: candles[i].time,
          confirmedAt: candles[i + 2].time,
        });
      }
  
      if (findSwingLow(candles, i)) {
        levels.push({
          type: "support",
          price: candles[i].low.toFixed(2),
          time: candles[i].time,
          confirmedAt: candles[i + 2].time,
        });
      }
    }
  
    return levels;
  }