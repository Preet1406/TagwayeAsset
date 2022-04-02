var xLabels_ChillerAHI = [];
var yLabels_ChillerAHI = [];
getData_ChillerAHI();

async function getData_ChillerAHI() {
  const response = await fetch("static/output/Chiller_ahi.csv");
  const data = await response.text();
  const table = data.split("\n").slice(1);
  table.forEach((row) => {
    const column = row.split(",");
    const x = column[0];
    const y = column[1];
    xLabels_ChillerAHI.push(x);
    yLabels_ChillerAHI.push(parseFloat(y));
  });
}

const data_ChillerAHI = {
  labels: xLabels_ChillerAHI,
  datasets: [
    {
      label: "Chiller Health Index",
      data: yLabels_ChillerAHI,
      backgroundColor: "#99cc00",
      borderColor: "#99cc00",
      borderWidth: 1,
    },
  ],
};

const config_ChillerAHI = {
  type: "bar",
  data: data_ChillerAHI,
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
        text: "Chiller Health Index",
      },
      legend: {
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

const ChillerAHI= new Chart(document.getElementById("ChillerAHI"), config_ChillerAHI);