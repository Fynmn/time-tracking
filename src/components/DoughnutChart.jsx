/* eslint-disable react/prop-types */
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ values }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "left",
        labels: {
          boxWidth: 15,
        },
      },
    },
  };

  const data = {
    labels: ["Project 1", "Project 2", "Project 3"],
    datasets: [
      {
        label: "Hours",
        data: values,
        backgroundColor: [
          "rgb(25, 110, 230)",
          "rgb(22, 95, 197)",
          "rgb(209, 226, 250)",
        ],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <>
      <Doughnut className="" data={data} options={options} />
    </>
  );
};

export default DoughnutChart;
