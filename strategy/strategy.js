import { findLevels } from "./levels.js";

import {
  bullishRejection,
  bearishRejection,
  priceTouchesZone
} from "./entries.js";

const ZONE_SIZE = 5;

export function generateSignal(candles4H, candles1H, index) {
  const candle = candles1H[index];

  // Get all confirmed 4H support/resistance levels
  const levels = findLevels(candles4H);

  for (const level of levels) {

    // Don't use a level until the 4H swing is confirmed
    if (candle.time <= level.confirmedAt) {
      continue;
    }

    // Price must touch the support/resistance zone
    if (!priceTouchesZone(candle, level, ZONE_SIZE)) {
      continue;
    }

    // Resistance + bearish rejection = SHORT
    if (
      level.type === "resistance" &&
      bearishRejection(candle)
    ) {
      return {
        direction: "short",
        level,
        entry: null,
        stop: candle.high,
        signalTime: candle.time
      };
    }

    // Support + bullish rejection = LONG
    if (
      level.type === "support" &&
      bullishRejection(candle)
    ) {
      return {
        direction: "long",
        level,
        entry: null,
        stop: candle.low,
        signalTime: candle.time
      };
    }
  }

  return null;
}