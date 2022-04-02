showChart_Floor_CO2();
async function showChart_Floor_CO2() {
  const ctx = document.getElementById("Floor_CO2");
  const datapoints = await getData_Floor_CO2();
  const Floor_CO2 = new Chart(ctx, {
    type: "bar",
    data: {
      labels: datapoints.xLabels_Floor_CO2,
      datasets: [
        {
          label: "CO2",
          data: datapoints.yLabels_Floor_CO2,
          backgroundColor: "#666666",
          borderWidth: 1,
        },
      ],
    },
    options: {
      plugins:{
        title: {
          display: true,
          text: "Floorwise CO2",
        },
        legend: {
          display: false,
        }
      },
    },
  });
}

async function getData_Floor_CO2() {
  const xLabels_Floor_CO2 = [];
  const yLabels_Floor_CO2 = [];
  const response = await fetch("static/output/Floor_CO2.csv");
  const data = await response.text();
  const table = data.split("\n").slice(1);
  table.forEach((row) => {
    const column = row.split(",");
    const x = column[0];
    const y = column[1];
    xLabels_Floor_CO2.push(x);
    yLabels_Floor_CO2.push(parseFloat(y));
  });
  return {xLabels_Floor_CO2, yLabels_Floor_CO2};
}