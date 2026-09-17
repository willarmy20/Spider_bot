export function bullishRejection(candle) {
    const body = Math.abs(
        candle.close - candle.open
    );
  
    const lowerWick =
      Math.min(candle.open, candle.close) -
      candle.low;
  
    return (
      candle.close > candle.open &&
      lowerWick > body
    );
  }
  
  export function bearishRejection(candle) {
    const body = Math.abs(
        candle.close - candle.open
    );
  
    const upperWick =
      candle.high -
      Math.max(candle.open, candle.close);
  
    return (
      candle.close < candle.open &&
      upperWick > body
    );
  }


  export function priceTouchesZone(
    candle,
    level,
    zoneSize
  ) {
    const zoneHigh =
      level.price + zoneSize;
  
    const zoneLow =
      level.price - zoneSize;
  
    return (
      candle.high >= zoneLow &&
      candle.low <= zoneHigh
    );
  }