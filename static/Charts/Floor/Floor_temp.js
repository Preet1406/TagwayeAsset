showChart_Floor_temp();
async function showChart_Floor_temp() {
  const ctx = document.getElementById("Floor_temp");
  const datapoints = await getData_Floor_temp();
  const Floor_temp = new Chart(ctx, {
    type: "bar",
    data: {
      labels: datapoints.xLabels_Floor_temp,
      datasets: [
        {
          label: "Temperature",
          data: datapoints.yLabels_Floor_temp,
          backgroundColor: "#33cccc",
          borderWidth: 1,
        },
      ],
    },
    options: {
      plugins:{
        title: {
          display: true,
          text: "Floorwise Temperature",
        },
        legend: {
          display: false,
        }
      },
    },
  });
}

async function getData_Floor_temp() {
  const xLabels_Floor_temp = [];
  const yLabels_Floor_temp = [];
  const response = await fetch("static/output/Floor_Temperature.csv");
  const data = await response.text();
  const table = data.split("\n").slice(1);
  table.forEach((row) => {
    const column = row.split(",");
    const x = column[0];
    const y = column[1];
    xLabels_Floor_temp.push(x);
    yLabels_Floor_temp.push(parseFloat(y));
  });
  return {xLabels_Floor_temp, yLabels_Floor_temp};
}