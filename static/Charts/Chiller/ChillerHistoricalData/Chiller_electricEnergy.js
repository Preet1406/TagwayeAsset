var xLabels_ChillerElectricEnergy = [];
var yLabels_ChillerElectricEnergy = [];
getData_ChillerElectricEnergy();

async function getData_ChillerElectricEnergy() {
  const response = await fetch("static/AssetDataFiles/Chiller_Dailyagg.csv");
  const data = await response.text();
  const table = data.split("\n").slice(1);
  table.forEach((row) => {
    const column = row.split(",");
    const x = column[0];
    const y = column[4];
    xLabels_ChillerElectricEnergy.push(x);
    yLabels_ChillerElectricEnergy.push(parseFloat(y));
  });
}

const data_ChillerElectricEnergy = {
  labels: xLabels_ChillerElectricEnergy,
  datasets: [
    {
      label: "Electric Energy Consumption (kWh)",
      data: yLabels_ChillerElectricEnergy,
      backgroundColor: "#33cccc",
      borderColor: "#33cccc",
      borderWidth: 1,
    },
  ],
};

const config_ChillerElectricEnergy = {
  type: "line",
  data: data_ChillerElectricEnergy,
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
        text: "Electric Energy Consumption (kWh)",
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

const ChillerElectricEnergy = new Chart(document.getElementById("ChillerElectricEnergy"), config_ChillerElectricEnergy);