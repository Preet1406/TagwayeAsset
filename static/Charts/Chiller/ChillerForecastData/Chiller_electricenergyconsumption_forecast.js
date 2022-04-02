showChart_electricEnergyConsumption();
async function showChart_electricEnergyConsumption() {
  const ctx = document.getElementById("electricEnergyConsumption");
  const datapoints = await getData_electricEnergyConsumption();
  const electricEnergyConsumption = new Chart(ctx, {
    type: "bar",
    data: {
      labels: datapoints.xLabels_electricEnergyConsumption,
      datasets: [
        {
          label: "Electrical Energy Consumption (in KWh)",
          data: datapoints.yLabels_values,
          backgroundColor: "#00ccff",
          borderWidth: 1,
        },
        {
            label: "Cost (in rupees)",
            data: datapoints.yLabels_cost,
            backgroundColor: "#666666",        
            borderWidth: 1,
          },
      ],
    },
    options: {
      plugins:{
        title: {
          display: true,
          text: "Chiller Electric Consumption Forecast",
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

async function getData_electricEnergyConsumption() {
  const xLabels_electricEnergyConsumption = [];
  const yLabels_values = [];
  const yLabels_cost = [];
  const response = await fetch("static/output/Chiller_energyconsumption_forecast.csv");
  const data = await response.text();
  const table = data.split("\n").slice(1);
  table.forEach((row) => {
    const column = row.split(",");
    const x = column[0];
    const values = column[1];
    const cost = column[2];
    xLabels_electricEnergyConsumption.push(x);
    yLabels_values.push(parseFloat(values));
    yLabels_cost.push(parseFloat(cost));
  });
  return {xLabels_electricEnergyConsumption, yLabels_values, yLabels_cost};
}