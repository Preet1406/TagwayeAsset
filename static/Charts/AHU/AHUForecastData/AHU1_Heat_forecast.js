var xLabels_Heat_forecast = [];
var yLabels_Heat_forecast = [];
getData_Heat_forecast();

async function getData_Heat_forecast() {
  const response = await fetch("static/output/AHU1_Heat_forecast.csv");
  const data = await response.text();
  const table = data.split("\n").slice(1);
  table.forEach((row) => {
    const column = row.split(",");
    const x = column[1];
    const y = column[2];
    xLabels_Heat_forecast.push(x);
    yLabels_Heat_forecast.push(parseFloat(y));
  });
}

const data_Heat_forecast = {
  labels: xLabels_Heat_forecast,
  datasets: [
    {
      label: "AHU Heat Energy Forecast (in KWh)",
      data: yLabels_Heat_forecast,
      backgroundColor: "#33cccc",
      borderColor: "#33cccc",
      borderWidth: 1,
    },
  ],
};

const config_Heat_forecast = {
  type: "bar",
  data: data_Heat_forecast,
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

const Heat_forecast = new Chart(document.getElementById("Heat_forecast"), config_Heat_forecast);