var xLabels_co2_Space1 = [];
var yLabels_co2_Space1  = [];

getData_co2_Space1();

async function getData_co2_Space1() {
  const response = await fetch("static/output/Room1.csv");
  const data = await response.text();
  const table = data.split("\n").slice(1);
  table.forEach((row) => {
    const column = row.split(",");
    const dateTime = column[0];
    const co2 = column[1];
    xLabels_co2_Space1.push(dateTime);
    yLabels_co2_Space1.push(parseFloat(co2));
  });
}

const data_co2_Space1 = {
  labels: xLabels_co2_Space1,
  datasets: [
    {
      label: "CO2",
      backgroundColor: "#0066cc",
      borderColor: "#0066cc",
      data: yLabels_co2_Space1,
    },
  ],
};

const config_co2_Space1 = {
  type: "line",
  data: data_co2_Space1,
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
        text: 'CO2 Level',
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

const co2_Space1 = new Chart(document.getElementById("co2_Space1"), config_co2_Space1);