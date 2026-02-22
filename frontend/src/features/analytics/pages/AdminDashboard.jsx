import { useEffect, useState } from "react";
import {
  getOverviewStats,
  getRevenueStats,
  getPopularDestinations,
  getTopAgents,
  getUserGrowth,
  getBookingTrends,
  exportStats
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [overviewRes, revenueRes, bookingRes, destRes, agentsRes, usersRes] = await Promise.all([
        getOverviewStats(),
        getRevenueStats("monthly"),
        getBookingTrends(),
        getPopularDestinations(),
        getTopAgents(),
        getUserGrowth()
      ]);
      
      setOverview(overviewRes.data);
      setRevenue(revenueRes.data);
      setBookingTrends(bookingRes.data);
      setDestinations(destRes.data);
      setAgents(agentsRes.data);
      setUsers(usersRes.data);
    } catch (error) {
      console.error("Failed to fetch analytics data", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = async (from, to) => {
    setLoading(true);
    try {
      const overviewRes = await getOverviewStats(from, to);
      setOverview(overviewRes.data);
    } catch (error) {
      console.error("Failed to filter data", error);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async () => {
    try {
      const res = await exportStats();
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "analytics-stats.csv");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch {
      alert("Failed to export stats");
    }
  };

  if (loading) return <p>Loading analytics...</p>;

  return (
    <div>
      <h2>Admin Dashboard</h2>
      
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <DateRangeFilter onFilter={handleFilter} />
        <button onClick={handleExport}>Export CSV</button>
      </div>

      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        <StatCard title="Total Bookings" value={overview.totalBookings} />
        <StatCard title="Total Revenue" value={`Rs ${overview.totalRevenue || 0}`} />
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
