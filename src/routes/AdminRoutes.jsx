import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardPage from '../pages/DashboardPage';

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/admin/dashboard" element={<DashboardPage />} />
    </Routes>
  );
};

export default AdminRoutes;
