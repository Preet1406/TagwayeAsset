var xLabels_ChillerEnergyConsumption = [];
var ChillerEnergyConsumption = [];

getData_ChillerEnergyConsumption();

async function getData_ChillerEnergyConsumption() {
  const response = await fetch("static/output/Chiller_sensordata.csv");
  const data = await response.text();
  const table = data.split("\n").slice(1);
  table.forEach((row) => {
    const column = row.split(",");
    const x = column[0];
    const y4 = column[4];
    xLabels_ChillerEnergyConsumption.push(x);
    ChillerEnergyConsumption.push(parseFloat(y4));
  });
}

const data_ChillerEnergyConsumption = {
  labels: xLabels_ChillerEnergyConsumption,
  datasets: [
    {
      label: "Chiller Energy Consumption",
      data: ChillerEnergyConsumption,
      backgroundColor: "#0066cc",
      borderColor: "#0066cc",
      borderWidth: 1,
    },
  ],
};

const config_ChillerEnergyConsumption = {
  type: "line",
  data: data_ChillerEnergyConsumption,
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
        text: "Chiller Energy Consumption",
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

const Chiller_ChillerEnergyConsumption = new Chart(
  document.getElementById("Chiller_ChillerEnergyConsumption"),
  config_ChillerEnergyConsumption
);