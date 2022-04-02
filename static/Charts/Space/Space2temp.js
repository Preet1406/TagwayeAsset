var xLabels_temp_Space2 = [];
var yLabels_temp_Space2 = [];
getData_temp_Space2();

async function getData_temp_Space2() {
  const response = await fetch("static/output/Room2.csv");
  const data = await response.text();
  const table = data.split("\n").slice(1);
  table.forEach((row) => {
    const column = row.split(",");
    const dateTime = column[0];
    const temp = column[5];
    xLabels_temp_Space2.push(dateTime);
    yLabels_temp_Space2.push(parseFloat(temp));
  });
}

const data_temp_Space2 = {
  labels: xLabels_temp_Space2,
  datasets: [
    {
        label: "Temperature",
        backgroundColor: "#00ccff",
        borderColor: "#00ccff",
        data: yLabels_temp_Space2,
      }
  ],
};

const config_temp_Space2 = {
  type: "line",
  data: data_temp_Space2,
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

const temp_Space2 = new Chart(document.getElementById("temp_Space2"), config_temp_Space2);