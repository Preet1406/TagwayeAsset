var xLabels_AHU_RTU = [];
var ReturnAirTemperature = [];
var Circuit1DischargeTemperature = [];
var Circuit2DischargeTemperature = [];
getData_AHU_RTU();

async function getData_AHU_RTU() {
  const response = await fetch(
    "static/output/AHU02_RTU_datsatrat_flowrate.csv"
  );
  const data = await response.text();
  const table = data.split("\n").slice(1);
  table.forEach((row) => {
    const column = row.split(",");
    const x = column[0];
    const y1 = column[2];
    const y2 = column[4];
    const y3 = column[5];
    xLabels_AHU_RTU.push(x);
    ReturnAirTemperature.push(parseFloat(y1));
    Circuit1DischargeTemperature.push(parseFloat(y2));
    Circuit2DischargeTemperature.push(parseFloat(y3));
  });
}

const data_AHU_RTU = {
  labels: xLabels_AHU_RTU,
  datasets: [
    {
      label: "Return Air Temperature (°C)",
      data: ReturnAirTemperature,
      backgroundColor: "#00ccff",
      borderColor: "#00ccff",
      borderWidth: 1,
    },
    {
      label: "Circuit-1 Discharge Temperature(°C)",
      data: Circuit1DischargeTemperature,
      backgroundColor: "#006699",
      borderColor: "#006699",
      borderWidth: 1,
    },
    {
      label: "Circuit-2 Discharge Temperature (°C)",
      data: Circuit2DischargeTemperature,
      backgroundColor: "#0066cc",
      borderColor: "#0066cc",
      borderWidth: 1,
    },
  ],
};

const config_AHU_RTU = {
  type: "line",
  data: data_AHU_RTU,
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
        text: 'AHU Temperature Readings'
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

const AHU_RTU = new Chart(document.getElementById("AHU_RTU"), config_AHU_RTU);