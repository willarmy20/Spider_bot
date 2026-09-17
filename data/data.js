import { loadCandlesFromCSV } from "./csvLoader.js";
import { aggregateTo4H } from "./aggregate.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(
  __dirname,
  "historical",
  "nas100_1h.csv"
);

export const candles1H = loadCandlesFromCSV(filePath);
export const candles4H = aggregateTo4H(candles1H);



//export const candles1H = [
    //Historical 1H candles go here
//];

//export const candles4H = [
    //Historical 4H candles go here
//];