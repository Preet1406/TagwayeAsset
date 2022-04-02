var xLabels_hourlyElectricity = [];
var yLabels_hourlyElectricity = [];
getData_hourlyElectricity();

async function getData_hourlyElectricity() {
  const response = await fetch("static/output/AHU1_hourly_Electricity.csv");
  const data = await response.text();
  const table = data.split("\n").slice(1);
  table.forEach((row) => {
    const column = row.split(",");
    const x = column[0];
    const y = column[1];
    xLabels_hourlyElectricity.push(x);
    yLabels_hourlyElectricity.push(parseFloat(y));
  });
}

const data_hourlyElectricity = {
  labels: xLabels_hourlyElectricity,
  datasets: [
    {
      label: "AHU Electrical Energy Consumption (in KWh)",
      data: yLabels_hourlyElectricity,
      backgroundColor: "#0066cc",
      borderColor: "#0066cc",
      borderWidth: 1,
    },
  ],
};

const config_hourlyElectricity = {
  type: "line",
  data: data_hourlyElectricity,
  options: {
    scales: {
      x: {
        type: "time",
        distribution: "series",
      },
    },
    plugins: {
      title: {
        display: true,
        text: 'AHU Electrical Energy Consumption (in KWh)'
      },
      legend: {
        display: false,
      },
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

const hourlyElectricity = new Chart(document.getElementById("hourlyElectricity"), config_hourlyElectricity);