var xLabels_waterRate = [];
var yLabels_waterRate = [];
getData_waterRate();

async function getData_waterRate() {
  const response = await fetch("static/AssetDataFiles/Chiller_Dailyagg.csv");
  const data = await response.text();
  const table = data.split("\n").slice(1);
  table.forEach((row) => {
    const column = row.split(",");
    const x = column[0];
    const y = column[1];
    xLabels_waterRate.push(x);
    yLabels_waterRate.push(parseFloat(y));
  });
}

const data_waterRate = {
  labels: xLabels_waterRate,
  datasets: [
    {
      label: "Water Consumption (L/sec)",
      data: yLabels_waterRate,
      backgroundColor: "#666666",
      borderColor: "#666666",
      borderWidth: 1,
    },
  ],
};

const config_waterRate = {
  type: "line",
  data: data_waterRate,
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
        text: "Water Consumption (L/sec)",
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

const waterRate = new Chart(document.getElementById("waterRate"), config_waterRate);