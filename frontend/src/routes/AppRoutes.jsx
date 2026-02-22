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

// Admin layout & pages
import AdminLayout from '../components/layout/AdminLayout';
import AgentApproval from '../pages/admin/AgentApproval';
import Destination from '../pages/admin/Destination';

// Agent layout & pages
import AgentLayout from '../components/layout/AgentLayout';
import AgentDashboard from '../pages/agent/AgentDashboard';
import AgentPackages from '../pages/agent/AgentPackage';
import CreatePackage from '../pages/agent/CreatePackages';
import EditPackage from '../pages/agent/EditPackage';

// Features - Analytics
const AdminDashboard = lazy(() => import('../features/analytics/pages/AdminDashboard'));

// Features - Earnings
const AgentEarningsDashboard = lazy(() => import('../features/earnings/pages/AgentEarningsDashboard'));
const AdminCommissionManagement = lazy(() => import('../features/earnings/pages/AdminCommissionManagement'));
const AdminPayoutApproval = lazy(() => import('../features/earnings/pages/AdminPayoutApproval'));

// Features - Notifications
const NotificationHistory = lazy(() => import('../features/notifications/pages/NotificationHistory'));
const NotificationSettings = lazy(() => import('../features/notifications/pages/NotificationSettings'));
const EmailTemplatePreview = lazy(() => import('../features/notifications/pages/EmailTemplatePreview'));

// Features - Reviews
const AdminReviewModeration = lazy(() => import('../features/reviews/pages/AdminReviewModeration'));

// Features - Wishlist
const WishlistPage = lazy(() => import('../features/wishlist/pages/WishlistPage'));

function AppRoutes() {
  return (
    <Router>
      <Suspense fallback={<Loader fullPage />}>
        <Routes>

          {/* ── PUBLIC ROUTES ── */}
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
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/notifications" element={<NotificationHistory />} />
            <Route path="/settings/notifications" element={<NotificationSettings />} />
          </Route>

          {/* ── ADMIN ROUTES ── */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="agents" element={<AgentApproval />} />
            <Route path="destinations" element={<Destination />} />
            <Route path="reviews" element={<AdminReviewModeration />} />
            <Route path="commissions" element={<AdminCommissionManagement />} />
            <Route path="payouts" element={<AdminPayoutApproval />} />
            <Route path="email-preview" element={<EmailTemplatePreview />} />
          </Route>

          {/* ── AGENT ROUTES ── */}
          <Route path="/agent" element={<AgentLayout />}>
            <Route path="dashboard" element={<AgentDashboard />} />
            <Route path="packages" element={<AgentPackages />} />
            <Route path="packages/create" element={<CreatePackage />} />
            <Route path="packages/edit/:id" element={<EditPackage />} />
            <Route path="earnings" element={<AgentEarningsDashboard />} />
          </Route>

        </Routes>
      </Suspense>
    </Router>
  );
}

export default AppRoutes;
