import { generateSignal } from "../strategy/strategy.js";

export function runBacktest(candles4H, candles1H, riskReward = 2) {
  const trades = [];

  let i = 0;

  while (i < candles1H.length - 1) {

    const signal = generateSignal(
      candles4H,
      candles1H,
      i
    );

    if (!signal) {
      i++;
      continue;
    }

    // Enter at the next 1H candle open
    const entryCandle = candles1H[i + 1];

    const entry = entryCandle.open;
    const stop = signal.stop;

    // Make sure the trade has valid risk
    if (
      (signal.direction === "long" && entry <= stop) ||
      (signal.direction === "short" && entry >= stop)
    ) {
      i++;
      continue;
    }

    const risk = Math.abs(entry - stop);

    let target;

    if (signal.direction === "long") {
      target = entry + risk * riskReward;
    } else {
      target = entry - risk * riskReward;
    }

    let result = null;
    let exitPrice = null;
    let exitTime = null;
    let exitIndex = null;

    // Start checking from the entry candle
    for (let j = i + 1; j < candles1H.length; j++) {

      const candle = candles1H[j];

      if (signal.direction === "long") {

        // Conservative rule:
        // If both stop and target are hit,
        // assume STOP happened first.
        if (candle.low <= stop) {
          result = "loss";
          exitPrice = stop;
          exitTime = candle.time;
          exitIndex = j;
          break;
        }

        if (candle.high >= target) {
          result = "win";
          exitPrice = target;
          exitTime = candle.time;
          exitIndex = j;
          break;
        }

      } else {

        // Conservative rule:
        // If both stop and target are hit,
        // assume STOP happened first.
        if (candle.high >= stop) {
          result = "loss";
          exitPrice = stop;
          exitTime = candle.time;
          exitIndex = j;
          break;
        }

        if (candle.low <= target) {
          result = "win";
          exitPrice = target;
          exitTime = candle.time;
          exitIndex = j;
          break;
        }
      }
    }

    // Ignore trades that never reached stop or target
    if (!result) {
      break;
    }

    const R = result === "win"
      ? riskReward
      : -1;

    trades.push({
      direction: signal.direction,
      signalTime: signal.signalTime,
      entryTime: entryCandle.time,
      entry,
      stop,
      target,
      exitPrice,
      exitTime,
      result,
      R
    });

    // Don't allow another trade while this one was open
    i = exitIndex + 1;
  }

  return trades;
}