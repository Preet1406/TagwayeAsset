var xLabels_light_Space3 = [];
var yLabels_light_Space3  = [];
getData_light_Space3();

async function getData_light_Space3() {
  const response = await fetch("static/output/Room3.csv");
  const data = await response.text();
  const table = data.split("\n").slice(1);
  table.forEach((row) => {
    const column = row.split(",");
    const dateTime = column[0];
    const light = column[3];
    xLabels_light_Space3.push(dateTime);
    yLabels_light_Space3.push(parseFloat(light));
  });
}

const data_light_Space3 = {
  labels: xLabels_light_Space3,
  datasets: [
    {
        label: "Light",
        backgroundColor: "#33cccc",
        borderColor: "#33cccc",
        data: yLabels_light_Space3,
      }
  ],
};

const config_light_Space3 = {
  type: "line",
  data: data_light_Space3,
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
        text: 'Light',
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

const light_Space3 = new Chart(document.getElementById("light_Space3"), config_light_Space3);