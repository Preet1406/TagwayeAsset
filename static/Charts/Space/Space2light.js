var xLabels_light_Space2 = [];
var yLabels_light_Space2  = [];
getData_light_Space2();

async function getData_light_Space2() {
  const response = await fetch("static/output/Room2.csv");
  const data = await response.text();
  const table = data.split("\n").slice(1);
  table.forEach((row) => {
    const column = row.split(",");
    const dateTime = column[0];
    const light = column[3];
    xLabels_light_Space2.push(dateTime);
    yLabels_light_Space2.push(parseFloat(light));
  });
}

const data_light_Space2 = {
  labels: xLabels_light_Space2,
  datasets: [
    {
        label: "Light",
        backgroundColor: "#33cccc",
        borderColor: "#33cccc",
        data: yLabels_light_Space2,
      }
  ],
};

const config_light_Space2 = {
  type: "line",
  data: data_light_Space2,
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

const light_Space2 = new Chart(document.getElementById("light_Space2"), config_light_Space2);