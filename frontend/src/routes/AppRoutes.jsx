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
import Destination from '../pages/admin/Destination';

// Agent layout & pages
import AgentLayout from '../components/layout/AgentLayout';
import AgentDashboard from '../pages/agent/AgentDashboard';
import AgentPackages from '../pages/agent/AgentPackage';
import CreatePackage from '../pages/agent/CreatePackages';
import EditPackage from '../pages/agent/EditPackage';

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

        {/* ── AGENT ROUTES (protected) ── */}
        <Route
          path="/agent/dashboard"
          element={
            <PermissionGuard allowedRole="AGENT">
              <AgentLayout>
                <AgentDashboard />
              </AgentLayout>
            </PermissionGuard>
          }
        />

        <Route
          path="/agent/packages"
          element={
            <PermissionGuard allowedRole="AGENT">
              <AgentLayout>
                <AgentPackages />
              </AgentLayout>
            </PermissionGuard>
          }
        />

        <Route
          path="/agent/packages/create"
          element={
            <PermissionGuard allowedRole="AGENT">
              <AgentLayout>
                <CreatePackage />
              </AgentLayout>
            </PermissionGuard>
          }
        />

        <Route
          path="/agent/packages/edit/:id"
          element={
            <PermissionGuard allowedRole="AGENT">
              <AgentLayout>
                <EditPackage />
              </AgentLayout>
            </PermissionGuard>
          }
        />

      </Routes>
    </Router>
  );
}

export default AppRoutes;
