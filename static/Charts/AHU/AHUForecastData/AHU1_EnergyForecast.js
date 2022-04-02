var xLabels_AHU_EnergyForecast = [];
var yLabels_AHU_EnergyForecast = [];
getData_AHU_EnergyForecast();

async function getData_AHU_EnergyForecast() {
  const response = await fetch("static/output/AHU1_Energy_forecast.csv");
  const data = await response.text();
  const table = data.split("\n").slice(1);
  table.forEach((row) => {
    const column = row.split(",");
    const x = column[1];
    const y = column[2];
    xLabels_AHU_EnergyForecast.push(x);
    yLabels_AHU_EnergyForecast.push(parseFloat(y));
  });
}

const data_AHU_EnergyForecast = {
  labels: xLabels_AHU_EnergyForecast,
  datasets: [
    {
      label: "AHU Electrical Energy Forecast (in kWh)",
      data: yLabels_AHU_EnergyForecast,
      backgroundColor: "#0066cc",
      borderColor: "#0066cc",
      borderWidth: 1,
    },
  ],
};

const config_AHU_EnergyForecast = {
  type: "bar",
  data: data_AHU_EnergyForecast,
  options: {
    scales: {
      x: {
        type: "time",
        distribution: "series",
      },
    },
    plugins: {
      zoom: {
        pan: {
          enabled: true,
          mode: "x",
        },
        zoom: {
          mode: "x",
          wheel: {
            enabled: true,
            speed: 0.5,
          },
        },
      },
    },
    elements: {
      point: {
        radius: 0,
      },
    },
  },
};

const AHU_EnergyForecast = new Chart(
  document.getElementById("AHU_EnergyForecast"),
  config_AHU_EnergyForecast
);