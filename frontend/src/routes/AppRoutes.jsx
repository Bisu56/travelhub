import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Packages from '../pages/Packages';
import Flights from '../pages/Flights';
import Hotels from '../pages/Hotels';
import Cars from '../pages/Cars';

function AppRoutes() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/flights" element={<Flights />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/cars" element={<Cars />} />
          {/* Add more routes here */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default AppRoutes;
