import fs from "fs";

export function saveEquityCurve(equityCurve) {

  const labels = equityCurve.map(
    point => point.tradeNumber
  );

  const equity = equityCurve.map(
    point => point.equity
  );

  const html = `
<!DOCTYPE html>
<html>
<head>
  <title>Trading Bot Equity Curve</title>

  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

  <style>
    body {
      font-family: Arial, sans-serif;
      padding: 40px;
    }

    canvas {
      max-width: 1200px;
    }
  </style>
</head>

<body>

  <h1>Trading Bot Equity Curve</h1>

  <canvas id="equityChart"></canvas>

  <script>

    const labels = ${JSON.stringify(labels)};

    const equity = ${JSON.stringify(equity)};

    new Chart(
      document.getElementById("equityChart"),
      {
        type: "line",

        data: {
          labels: labels,

          datasets: [
            {
              label: "Equity (R)",

              data: equity,

              tension: 0.1,

              pointRadius: 0
            }
          ]
        },

        options: {

          responsive: true,

          scales: {

            x: {
              title: {
                display: true,
                text: "Trade Number"
              }
            },

            y: {
              title: {
                display: true,
                text: "R"
              }
            }

          }

        }

      }
    );

  </script>

</body>
</html>
`;

  fs.writeFileSync(
    "equity-curve.html",
    html
  );

  console.log(
    "\\nEquity curve saved to:"
  );

  console.log(
    "equity-curve.html"
  );
}