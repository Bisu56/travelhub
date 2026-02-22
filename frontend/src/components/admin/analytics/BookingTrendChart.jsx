import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BookingTrendChart = ({ data }) => {
  if (!data || data.length === 0) return <p>No booking data available</p>;

  const chartData = {
    labels: data.map((d) => d.date),
    datasets: [
      {
        label: "Bookings",
        data: data.map((d) => d.count),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Booking Trends" },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default BookingTrendChart;
