import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Public layout & pages
import Layout from '../components/layout/Layout';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Packages from '../pages/Packages';
import PackageDetail from '../pages/public/PackageDetail';
import FlightSearchPage from '../pages/flights/FlightSearchPage';
import FlightBookingPage from '../pages/flights/FlightBookingPage';
import HotelSearchPage from '../pages/hotels/HotelSearchPage';
import HotelDetailPage from '../pages/hotels/HotelDetailPage';
import VehicleSearchPage from '../pages/vehicles/VehicleSearchPage';
import VehicleDetailPage from '../pages/vehicles/VehicleDetailPage';
import BookingSummaryPage from '../pages/BookingSummaryPage';
import MyBookingsPage from '../pages/bookings/MyBookingsPage';
import Hotels from '../pages/Hotels';
import PaymentMethodPage from "../pages/payments/PaymentMethodPage";
import PaymentSuccessPage from "../pages/payments/PaymentSuccessPage";
import PaymentFailurePage from "../pages/payments/PaymentFailurePage";
import PaymentHistoryPage from "../pages/payments/PaymentHistoryPage";

// Admin layout, guard & pages
import PermissionGuard from '../hoc/PermissionGuard';
import AdminLayout from '../components/layout/AdminLayout';
import AdminDashboard from '../pages/admin/AdminDashboard';
import AgentApproval from '../pages/admin/AgentApproval';
import Destination from '../pages/admin/Destination';
import AdminReviewModeration from '../features/reviews/pages/AdminReviewModeration';
import AdminCommissionManagement from '../pages/admin/AdminCommissionManagement';
import AdminPayoutApproval from '../pages/admin/AdminPayoutApproval';

// Agent layout & pages
import AgentLayout from '../components/layout/AgentLayout';
import AgentDashboard from '../pages/agent/AgentDashboard';
import AgentPackages from '../pages/agent/AgentPackage';
import CreatePackage from '../pages/agent/CreatePackages';
import EditPackage from '../pages/agent/EditPackage';
import AgentEarningsDashboard from '../pages/agent/AgentEarningsDashboard';

function AppRoutes() {
  return (
    <Router>
      <Routes>

        {/* ── PUBLIC ROUTES (wrapped in main Layout) ── */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/packages/:id" element={<PackageDetail />} />
          <Route path="/flights" element={<FlightSearchPage />} />
          <Route path="/flights/book/:id" element={<FlightBookingPage />} />
          <Route path="/hotels" element={<HotelSearchPage />} />
          <Route path="/hotels/:id" element={<HotelDetailPage />} />
          <Route path="/vehicles" element={<VehicleSearchPage />} />
          <Route path="/vehicles/:id" element={<VehicleDetailPage />} />
          <Route path="/booking/summary" element={<BookingSummaryPage />} />
          <Route path="/my-bookings" element={<MyBookingsPage />} />
          <Route path="/payment-method" element={<PaymentMethodPage />} />
          <Route path="/payment-success" element={<PaymentSuccessPage />} />
          <Route path="/payment-failure" element={<PaymentFailurePage />} />
          <Route path="/payment-history" element={<PaymentHistoryPage />} />
        </Route>

        {/* ── ADMIN ROUTES (temporarily public) ── */}
        <Route
          path="/admin/dashboard"
          element={
              <AdminLayout>
                <AdminDashboard />
              </AdminLayout>
          }
        />

        <Route
          path="/admin/agents"
          element={
              <AdminLayout>
                <AgentApproval />
              </AdminLayout>
          }
        />

        <Route
          path="/admin/destinations"
          element={
              <AdminLayout>
                <Destination />
              </AdminLayout>
          }
        />

        <Route
          path="/admin/reviews"
          element={
              <AdminLayout>
                <AdminReviewModeration />
              </AdminLayout>
          }
        />

        <Route
          path="/admin/commissions"
          element={
              <AdminLayout>
                <AdminCommissionManagement />
              </AdminLayout>
          }
        />

        <Route
          path="/admin/payouts"
          element={
              <AdminLayout>
                <AdminPayoutApproval />
              </AdminLayout>
          }
        />

        {/* ── AGENT ROUTES (temporarily public for testing) ── */}
        <Route
          path="/agent/dashboard"
          element={
              <AgentLayout>
                <AgentDashboard />
              </AgentLayout>
          }
        />

        <Route
          path="/agent/packages"
          element={
              <AgentLayout>
                <AgentPackages />
              </AgentLayout>
          }
        />

        <Route
          path="/agent/packages/create"
          element={
              <AgentLayout>
                <CreatePackage />
              </AgentLayout>
          }
        />

        <Route
          path="/agent/packages/edit/:id"
          element={
              <AgentLayout>
                <EditPackage />
              </AgentLayout>
          }
        />

        <Route
          path="/agent/earnings"
          element={
              <AgentLayout>
                <AgentEarningsDashboard />
              </AgentLayout>
          }
        />

      </Routes>
    </Router>
  );
}

export default AppRoutes;
