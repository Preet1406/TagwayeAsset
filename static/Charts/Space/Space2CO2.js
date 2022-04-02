var xLabels_co2_Space2 = [];
var yLabels_co2_Space2  = [];

getData_co2_Space2();

async function getData_co2_Space2() {
  const response = await fetch("static/output/Room2.csv");
  const data = await response.text();
  const table = data.split("\n").slice(1);
  table.forEach((row) => {
    const column = row.split(",");
    const dateTime = column[0];
    const co2 = column[1];
    xLabels_co2_Space2.push(dateTime);
    yLabels_co2_Space2.push(parseFloat(co2));
  });
}

const data_co2_Space2 = {
  labels: xLabels_co2_Space2,
  datasets: [
    {
      label: "CO2",
      backgroundColor: "#0066cc",
      borderColor: "#0066cc",
      data: yLabels_co2_Space2,
    },
  ],
};

const config_co2_Space2 = {
  type: "line",
  data: data_co2_Space2,
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

const co2_Space2 = new Chart(document.getElementById("co2_Space2"), config_co2_Space2);