import {
    findSwingHigh,
    findSwingLow,
  } from "./levels.js";
  
  import {
    bullishRejection,
    bearishRejection,
    priceTouchesZone,
  } from "./entries.js";
  
  const ZONE_SIZE = 5;
  
  export function generateSignal(
    candles4H,
    candles1H,
    index
  ) {
    const candle = candles1H[index];
  
    const levels = [];
  
    // Find only 4H levels that would have
    // been known by this point.
    for (
      let i = 2;
      i < candles4H.length - 2;
      i++
    ) {
      if (
        candles4H[i].time >= candle.time
      ) {
        break;
      }
  
      if (findSwingHigh(candles4H, i)) {
        levels.push({
          type: "resistance",
          price: candles4H[i].high,
          time: candles4H[i].time,
        });
      }
  
      if (findSwingLow(candles4H, i)) {
        levels.push({
          type: "support",
          price: candles4H[i].low,
          time: candles4H[i].time,
        });
      }
    }
  
    for (const level of levels) {
      if (
        !priceTouchesZone(
          candle,
          level,
          ZONE_SIZE
        )
      ) {
        continue;
      }
  
      // SHORT
      if (
        level.type === "resistance" &&
        bearishRejection(candle)
      ) {
        return {
          direction: "short",
          level,
          entry: null,
          stop: candle.high,
          signalTime: candle.time,
        };
      }
  
      // LONG
      if (
        level.type === "support" &&
        bullishRejection(candle)
      ) {
        return {
          direction: "long",
          level,
          entry: null,
          stop: candle.low,
          signalTime: candle.time,
        };
      }
    }
  
    return null;
  }