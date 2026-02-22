import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Loader from '../components/Loader';

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
import AgentApproval from '../pages/admin/AgentApproval';
import Destination from '../pages/admin/Destination';

// Lazy loaded pages for code splitting
const AdminDashboard = lazy(() => import('../features/analytics/pages/AdminDashboard'));
const AdminReviewModeration = lazy(() => import('../features/reviews/pages/AdminReviewModeration'));
const AdminCommissionManagement = lazy(() => import('../features/earnings/pages/AdminCommissionManagement'));
const AdminPayoutApproval = lazy(() => import('../features/earnings/pages/AdminPayoutApproval'));
const EmailTemplatePreview = lazy(() => import('../features/notifications/pages/EmailTemplatePreview'));

// Agent layout & pages
import AgentLayout from '../components/layout/AgentLayout';
import AgentDashboard from '../pages/agent/AgentDashboard';
import AgentPackages from '../pages/agent/AgentPackage';
import CreatePackage from '../pages/agent/CreatePackages';
import EditPackage from '../pages/agent/EditPackage';
const AgentEarningsDashboard = lazy(() => import('../features/earnings/pages/AgentEarningsDashboard'));
const NotificationHistory = lazy(() => import('../features/notifications/pages/NotificationHistory'));
const NotificationSettings = lazy(() => import('../features/notifications/pages/NotificationSettings'));

function AppRoutes() {
  return (
    <Router>
      <Suspense fallback={<Loader fullPage />}>
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

          {/* ── ADMIN ROUTES ── */}
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

          {/* ── AGENT ROUTES ── */}
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

          <Route
            path="/notifications"
            element={
                <Layout>
                  <NotificationHistory />
                </Layout>
            }
          />

          <Route
            path="/settings/notifications"
            element={
                <Layout>
                  <NotificationSettings />
                </Layout>
            }
          />

          <Route
            path="/admin/email-preview"
            element={
                <AdminLayout>
                  <EmailTemplatePreview />
                </AdminLayout>
            }
          />

        </Routes>
      </Suspense>
    </Router>
  );
}

export default AppRoutes;
