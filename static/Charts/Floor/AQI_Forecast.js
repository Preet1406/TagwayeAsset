var xLabels_AQI_forecast_Chart = [];
var yLabels_AQI_forecast_Chart = [];
getData_AQI_forecast_Chart();

async function getData_AQI_forecast_Chart() {
  const response = await fetch("static/output/AQI_forecast.csv");
  const data = await response.text();
  const table = data.split("\n").slice(1);
  table.forEach((row) => {
    const column = row.split(",");
    const dateTime = column[1];
    const forecast = column[2];
    xLabels_AQI_forecast_Chart.push(dateTime);
    yLabels_AQI_forecast_Chart.push(parseFloat(forecast));
  });
}

const dates_AQI_forecast_Chart = xLabels_AQI_forecast_Chart;
const dataPoints_AQI_forecast_Chart = yLabels_AQI_forecast_Chart;

const data_AQI_forecast_Chart = {
  labels: dates_AQI_forecast_Chart,
  datasets: [
    {
      label: "Air Quality Index Forecast",
      backgroundColor: "#99cc00",
      borderColor: "#99cc00",
      data: dataPoints_AQI_forecast_Chart,
    },
  ],
};

const config_AQI_forecast_Chart = {
  type: "line",
  data: data_AQI_forecast_Chart,
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
        text: 'Air Quality Index Forecast',
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
            speed: 0.1,
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

const AQI_forecast_Chart = new Chart(document.getElementById("AQI_forecast_Chart"), config_AQI_forecast_Chart);