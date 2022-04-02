var xLabels_AQI_final = [];
var yLabels_AQI_final = [];
getData_AQI_final();

async function getData_AQI_final() {
  const response = await fetch("static/output/AQI_final.csv");
  const data = await response.text();
  const table = data.split("\n").slice(1);
  table.forEach((row) => {
    const column = row.split(",");
    const dateTime = column[1];
    const aqi = column[29];
    xLabels_AQI_final.push(dateTime);
    yLabels_AQI_final.push(parseFloat(aqi));
  });
}

const dates_AQI_final = xLabels_AQI_final;
const dataPoints_AQI_final = yLabels_AQI_final;

const data_AQI_final = {
  labels: dates_AQI_final,
  datasets: [
    {
      label: "Air Quality Index",
      backgroundColor: "#99cc00",
      borderColor: "#99cc00",
      data: dataPoints_AQI_final,
    },
  ],
};

const config_AQI_final = {
  type: "line",
  data: data_AQI_final,
  options: {
    responsive: true,
    scales: {
      x: {
        type: "time",
        distribution: "series",
      },
    },
    plugins: {
      title: {
        display: true,
        text: 'Air Quality Index',
      },
      legend:{
        display:false,
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
            speed: 0.8,
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

const AQI_final_Chart = new Chart(document.getElementById("AQI_final_Chart"), config_AQI_final);