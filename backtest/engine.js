import { generateSignal } from "../strategy/strategy.js";

export function runBacktest(
  candles4H,
  candles1H,
  riskReward = 2
) {
  const trades = [];

  for (
    let i = 0;
    i < candles1H.length - 1;
    i++
  ) {
    const signal = generateSignal(
      candles4H,
      candles1H,
      i
    );

    if (!signal) {
      continue;
    }

    const entryCandle =
      candles1H[i + 1];

    const entry =
      entryCandle.open;

    const stop =
      signal.stop;

    const risk =
      Math.abs(entry - stop);

    if (risk === 0) {
      continue;
    }

    let target;

    if (signal.direction === "long") {
      target =
        entry + risk * riskReward;
    } else {
      target =
        entry - risk * riskReward;
    }

    let result = null;
    let exitPrice = null;
    let exitTime = null;

    for (
      let j = i + 1;
      j < candles1H.length;
      j++
    ) {
      const candle = candles1H[j];

      if (signal.direction === "long") {

        if (candle.low <= stop) {
          result = "loss";
          exitPrice = stop;
          exitTime = candle.time;
          break;
        }

        if (candle.high >= target) {
          result = "win";
          exitPrice = target;
          exitTime = candle.time;
          break;
        }

      } else {

        if (candle.high >= stop) {
          result = "loss";
          exitPrice = stop;
          exitTime = candle.time;
          break;
        }

        if (candle.low <= target) {
          result = "win";
          exitPrice = target;
          exitTime = candle.time;
          break;
        }
      }
    }

    if (!result) {
      continue;
    }

    const R =
      result === "win"
        ? riskReward
        : -1;

    trades.push({
      direction: signal.direction,
      signalTime: signal.signalTime,
      entry,
      stop,
      target,
      exitPrice,
      exitTime,
      result,
      R,
    });
  }

  return trades;
}