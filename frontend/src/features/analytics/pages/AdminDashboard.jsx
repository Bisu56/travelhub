import { useEffect, useState } from "react";
import {
  getOverviewStats,
  getRevenueStats,
  getPopularDestinations,
  getTopAgents,
  getUserGrowth,
  getBookingTrends
} from "../services/analyticsApi";

import StatCard from "../components/StatCard";
import RevenueChart from "../components/RevenueChart";
import BookingTrendChart from "../components/BookingTrendChart";
import UserGrowthChart from "../components/UserGrowthChart";
import PopularDestinations from "../components/PopularDestinations";
import TopAgentsTable from "../components/TopAgentsTable";
import DateRangeFilter from "../components/DateRangeFilter";

const AdminDashboard = () => {
  const [overview, setOverview] = useState({});
  const [revenue, setRevenue] = useState([]);
  const [bookingTrends, setBookingTrends] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [agents, setAgents] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setOverview((await getOverviewStats()).data);
      setRevenue((await getRevenueStats("monthly")).data);
      setBookingTrends((await getBookingTrends()).data);
      setDestinations((await getPopularDestinations()).data);
      setAgents((await getTopAgents()).data);
      setUsers((await getUserGrowth()).data);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Admin Dashboard</h2>

      <DateRangeFilter />

      <div style={{ display: "flex", gap: "10px" }}>
        <StatCard title="Total Bookings" value={overview.totalBookings} />
        <StatCard title="Total Revenue" value={overview.totalRevenue} />
        <StatCard title="Total Users" value={overview.totalUsers} />
        <StatCard title="Total Agents" value={overview.totalAgents} />
      </div>

      <RevenueChart data={revenue} />
      <BookingTrendChart data={bookingTrends} />
      <UserGrowthChart data={users} />
      <PopularDestinations data={destinations} />
      <TopAgentsTable data={agents} />
    </div>
  );
};

export default AdminDashboard;