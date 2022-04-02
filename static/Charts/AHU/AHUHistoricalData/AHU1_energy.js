var xLabels_ahu1_daily = [];
var Energy_ahu1_daily = [];

getData_ahu1_daily();

async function getData_ahu1_daily() {
  const response = await fetch("static/output/AHU1_daily_CO2_E_RAT.csv");
  const data = await response.text();
  const table = data.split("\n").slice(1);
  table.forEach((row) => {
    const column = row.split(",");
    const x = column[0];
    const y1 = column[2];
    xLabels_ahu1_daily.push(x);
    Energy_ahu1_daily.push(parseFloat(y1));
  });
}

const data_ahu1_daily = {
  labels: xLabels_ahu1_daily,
  datasets: [
    {
      label: "Energy",
      data: Energy_ahu1_daily,
      backgroundColor: "#33cccc",
      borderColor: "#33cccc",
      borderWidth: 1,
    },
  ],
};

const config_ahu1_daily = {
  type: "line",
  data: data_ahu1_daily,
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
        text: 'AHU-1 Heat Energy Consumption (in KWh)'
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
    elements: {
      point: {
        radius: 0,
      },
    },
  },
};

const ahu1_daily = new Chart(document.getElementById("ahu1_daily"), config_ahu1_daily);