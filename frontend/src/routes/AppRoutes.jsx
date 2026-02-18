import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Public layout & pages
import Layout from '../components/layout/Layout';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Packages from '../pages/Packages';
import Flights from '../pages/Flights';
import Hotels from '../pages/Hotels';
import Cars from '../pages/Cars';

// Admin layout, guard & pages
import PermissionGuard from '../hoc/PermissionGuard';
import AdminLayout from '../components/layout/AdminLayout';
import AdminDashboard from '../pages/admin/AdminDashboard';
import AgentApproval from '../pages/admin/AgentApproval';
import Destinations from '../pages/admin/Destinations';

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
          <Route path="/flights" element={<Flights />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/cars" element={<Cars />} />

          {/* Add more public routes here if needed */}
        </Route>

        {/* ── ADMIN ROUTES (protected + separate AdminLayout) ── */}
        <Route
          path="/admin/dashboard"
          element={
            <PermissionGuard allowedRole="ADMIN">
              <AdminLayout>
                <AdminDashboard />
              </AdminLayout>
            </PermissionGuard>
          }
        />

        <Route
          path="/admin/agents"
          element={
            <PermissionGuard allowedRole="ADMIN">
              <AdminLayout>
                <AgentApproval />
              </AdminLayout>
            </PermissionGuard>
          }
        />

        <Route
          path="/admin/destinations"
          element={
            <PermissionGuard allowedRole="ADMIN">
              <AdminLayout>
                <Destinations />
              </AdminLayout>
            </PermissionGuard>
          }
        />

        {/* Add more admin routes here following the same pattern */}

      </Routes>
    </Router>
  );
}

export default AppRoutes;