import fs from "fs";

export function saveTradeReport(tradeReport) {

  if (!tradeReport || tradeReport.length === 0) {
    console.log("No trades to save.");
    return;
  }

  // CSV column headers
  const headers = [
    "Trade Number",
    "Direction",
    "Signal Time",
    "Entry Time",
    "Entry",
    "Stop",
    "Target",
    "Exit Time",
    "Exit Price",
    "Result",
    "R",
    "Duration Hours"
  ];

  // Convert each trade into a CSV row
  const rows = tradeReport.map(trade => [
    trade.tradeNumber,
    trade.direction,
    trade.signalTime,
    trade.entryTime,
    trade.entry,
    trade.stop,
    trade.target,
    trade.exitTime,
    trade.exitPrice,
    trade.result,
    trade.R,
    trade.durationHours
  ]);

  // Combine headers and rows
  const csv = [
    headers.join(","),
    ...rows.map(row => row.join(","))
  ].join("\n");

  // Save CSV file
  fs.writeFileSync(
    "trade-report.csv",
    csv
  );

  console.log(
    "\nTrade report saved to:"
  );

  console.log(
    "trade-report.csv"
  );
}