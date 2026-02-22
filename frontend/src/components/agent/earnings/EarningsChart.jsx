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

const EarningsChart = ({ commissions }) => {
  if (!commissions || commissions.length === 0) return <p>No earnings data yet</p>;
  
  const data = {
    labels: commissions.map((c) => c.bookingDate),
    datasets: [
      {
        label: "Commission Earnings",
        data: commissions.map((c) => c.amount),
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Earnings Over Time",
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default EarningsChart;
