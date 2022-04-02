var xLabels_AHU_LCC = [];
var yLabels_AHU_LCC = [];
getData_AHU_LCC();

async function getData_AHU_LCC() {
  const response = await fetch("static/output/AHU_LLC.csv");
  const data = await response.text();
  const table = data.split("\n").slice(1);
  table.forEach((row) => {
    const column = row.split(",");
    const x = column[0];
    const y = column[1];
    xLabels_AHU_LCC.push(x);
    yLabels_AHU_LCC.push(parseFloat(y));
  });
}

const data_AHU_LCC = {
  labels: xLabels_AHU_LCC,
  datasets: [
    {
      label: "AHU Life Cycle Cost",
      data: yLabels_AHU_LCC,
      backgroundColor: "#ffcc33",
      borderColor: "#ffcc33",
      borderWidth: 1,
    },
  ],
};

const config_AHU_LCC = {
  type: "line",
  data: data_AHU_LCC,
  options: {
    scales: {
      x: {
        type: "time",
        distribution: "series",
        time: {
          unit: "year",
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: 'AHU Life-cycle cost (in $)',
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

const AHU_LCC = new Chart(document.getElementById("AHU_LCC"), config_AHU_LCC);