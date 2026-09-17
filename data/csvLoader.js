import fs from "fs";
import { parse } from "csv-parse/sync";

export function loadCandlesFromCSV(filePath) {
  const file = fs.readFileSync(filePath, "utf8");

  const records = parse(file, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  });

  return records.map(row => ({
    time: new Date(row.datetime),
    open: Number(row.open),
    high: Number(row.high),
    low: Number(row.low),
    close: Number(row.close),
    volume: Number(row.volume),
  }));
}