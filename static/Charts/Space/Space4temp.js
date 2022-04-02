var xLabels_temp_Space4 = [];
var yLabels_temp_Space4 = [];
getData_temp_Space4();

async function getData_temp_Space4() {
  const response = await fetch("static/output/Room4.csv");
  const data = await response.text();
  const table = data.split("\n").slice(1);
  table.forEach((row) => {
    const column = row.split(",");
    const dateTime = column[0];
    const temp = column[5];
    xLabels_temp_Space4.push(dateTime);
    yLabels_temp_Space4.push(parseFloat(temp));
  });
}

const data_temp_Space4 = {
  labels: xLabels_temp_Space4,
  datasets: [
    {
        label: "Temperature",
        backgroundColor: "#00ccff",
        borderColor: "#00ccff",
        data: yLabels_temp_Space4,
      }
  ],
};

const config_temp_Space4 = {
  type: "line",
  data: data_temp_Space4,
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
        text: 'Temperature',
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

const temp_Space4 = new Chart(document.getElementById("temp_Space4"), config_temp_Space4);