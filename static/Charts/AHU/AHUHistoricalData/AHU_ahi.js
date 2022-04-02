var xLabels_ahi = [];
var yLabels_ahi = [];
getData_ahi();

async function getData_ahi() {
  const response = await fetch("static/output/AHU_ahi.csv");
  const data = await response.text();
  const table = data.split("\n").slice(1);
  table.forEach((row) => {
    const column = row.split(",");
    const x = column[0];
    const y = column[1];
    xLabels_ahi.push(x);
    yLabels_ahi.push(parseFloat(y));
  });
}

const data_ahi = {
  labels: xLabels_ahi,
  datasets: [
    {
      label: "AHU AHI",
      data: yLabels_ahi,
      backgroundColor: "#99cc00",
      borderColor: "#99cc00",
      borderWidth: 1,
    },
  ],
};

const config_ahi = {
  type: "bar",
  data: data_ahi,
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
        text: 'AHU Health Index'
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
  },
};

const ahi = new Chart(document.getElementById("ahi"), config_ahi);