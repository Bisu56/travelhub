import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const UserGrowthChart = ({ data }) => {
  if (!data || data.length === 0) return <p>No user growth data available</p>;

  const chartData = {
    labels: data.map((d) => d.month),
    datasets: [
      {
        label: "New Users",
        data: data.map((d) => d.count),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "User Growth" },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default UserGrowthChart;
