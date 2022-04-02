var xLabels_CoolingWaterTemperature = [];
var CoolingWaterTemperature = [];

getData_CoolingWaterTemperature();

async function getData_CoolingWaterTemperature() {
  const response = await fetch("static/output/Chiller_sensordata.csv");
  const data = await response.text();
  const table = data.split("\n").slice(1);
  table.forEach((row) => {
    const column = row.split(",");
    const x = column[0];
    const y2 = column[2];
    xLabels_CoolingWaterTemperature.push(x);
    CoolingWaterTemperature.push(parseFloat(y2));
  });
}

const data_CoolingWaterTemperature = {
  labels: xLabels_CoolingWaterTemperature,
  datasets: [
    {
      label: "Cooling Water Temperature",
      data: CoolingWaterTemperature,
      backgroundColor: "#00ccff",
      borderColor: "#00ccff",
      borderWidth: 1,
    },
  ],
};

const config_CoolingWaterTemperature = {
  type: "line",
  data: data_CoolingWaterTemperature,
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
        text: "Cooling Water Temperature",
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

const Chiller_CoolingWaterTemperature= new Chart(
  document.getElementById("Chiller_CoolingWaterTemperature"),
  config_CoolingWaterTemperature
);