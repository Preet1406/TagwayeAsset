showChart_waterConsumptionForecast();
async function showChart_waterConsumptionForecast() {
  const ctx = document.getElementById("waterConsumptionForecast");
  const datapoints = await getData_waterConsumptionForecast();
  const waterConsumptionForecast = new Chart(ctx, {
    type: "bar",
    data: {
      labels: datapoints.xLabels_waterConsumptionForecast,
      datasets: [
        {
          label: "Water Consumption Forecast",
          data: datapoints.yLabels_waterConsumptionForecast,
          backgroundColor: "#ffcc33",
          borderWidth: 1,
        },
      ],
    },
    options: {
      plugins:{
        title: {
          display: true,
          text: "Next 7 days: Water Fow Rate Forecast(in L/sec)",
        },
        legend: {
          display: false,
        }
      },
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

async function getData_waterConsumptionForecast() {
  const xLabels_waterConsumptionForecast = [];
  const yLabels_waterConsumptionForecast = [];
  const response = await fetch("static/output/Chiller_waterconsumption_forecast.csv");
  const data = await response.text();
  const table = data.split("\n").slice(1);
  table.forEach((row) => {
    const column = row.split(",");
    const x = column[0];
    const y = column[1];
    xLabels_waterConsumptionForecast.push(x);
    yLabels_waterConsumptionForecast.push(parseFloat(y));
  });
  return {xLabels_waterConsumptionForecast, yLabels_waterConsumptionForecast};
}