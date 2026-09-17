export function aggregateTo4H(candles) {
    const candles4H = [];
  
    for (let i = 0; i < candles.length; i += 4) {
      const group = candles.slice(i, i + 4);
  
      if (group.length < 4) continue;
  
      candles4H.push({
        time: group[0].time,
        open: group[0].open,
        high: Math.max(...group.map(candle => candle.high)),
        low: Math.min(...group.map(candle => candle.low)),
        close: group[group.length - 1].close,
        volume: group.reduce(
          (total, candle) => total + candle.volume,
          0
        ),
      });
    }
  
    return candles4H;
  }