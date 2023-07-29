/* eslint-disable react/prop-types */
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ values }) => {
  const data = {
    labels: ["Project 1", "Project 2", "Project 3"],
    datasets: [
      {
        label: "My First Dataset",
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
      <Doughnut data={data} />
    </>
  );
};

export default PieChart;
