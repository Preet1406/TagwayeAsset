var xLabels_ChilledWaterRate = [];
var ChilledWaterRate = [];

getData_ChilledWaterRate();

async function getData_ChilledWaterRate() {
  const response = await fetch("static/output/Chiller_sensordata.csv");
  const data = await response.text();
  const table = data.split("\n").slice(1);
  table.forEach((row) => {
    const column = row.split(",");
    const x = column[0];
    const y1 = column[1];
    xLabels_ChilledWaterRate.push(x);
    ChilledWaterRate.push(parseFloat(y1));
  });
}

const data_ChilledWaterRate = {
  labels: xLabels_ChilledWaterRate,
  datasets: [
    {
      label: "Chilled Water Rate",
      data: ChilledWaterRate,
      backgroundColor: "#0066cc",
      borderColor: "#0066cc",
      borderWidth: 1,
    }
  ],
};

const config_ChilledWaterRate = {
  type: "line",
  data: data_ChilledWaterRate,
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
        text: "Chilled Water Rate",
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

const Chiller_ChilledWaterRate = new Chart(
  document.getElementById("Chiller_ChilledWaterRate"),
  config_ChilledWaterRate
);