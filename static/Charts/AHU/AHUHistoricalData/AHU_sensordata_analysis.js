var xLabels_AHUsensorData = [];
var SupplyAirTemperature = [];
var ReturnAirTemp = [];
getData_AHUsensorData();

async function getData_AHUsensorData() {
  const response = await fetch("static/output/AHU_sensordata.csv");
  const data = await response.text();
  const table = data.split("\n").slice(1);
  table.forEach((row) => {
    const column = row.split(",");
    const x = column[0];
    const y1 = column[1];
    const y2 = column[5];
    xLabels_AHUsensorData.push(x);
    SupplyAirTemperature.push(parseFloat(y1));
    ReturnAirTemp.push(parseFloat(y2));
  });
}

const data_AHUsensorData = {
  labels: xLabels_AHUsensorData,
  datasets: [
    {
      label: "Supply Air Temperature (°C)",
      data: SupplyAirTemperature,
      backgroundColor: "#0066cc",
      borderColor: "#0066cc",
      borderWidth: 1,
    },
    {
      label: "Return Air Temperature (°C)",
      data: ReturnAirTemp,
      backgroundColor: "#666666",
      borderColor: "#666666",
      borderWidth: 1,
    },
  ],
};

const config_AHUsensorData = {
  type: "line",
  data: data_AHUsensorData,
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
        text: 'AHU Sensor Readings',
      },
      legend:{
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

const AHUsensorData = new Chart(document.getElementById("AHUsensorData"), config_AHUsensorData);