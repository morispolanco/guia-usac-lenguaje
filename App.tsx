import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import HomePage from './components/pages/HomePage';
import LoginPage from './components/pages/LoginPage';
import RegisterPage from './components/pages/RegisterPage';
import DashboardPage from './components/pages/DashboardPage';
import UnitPage from './components/pages/UnitPage';
import PaymentPage from './components/pages/PaymentPage';
import PaymentSuccessPage from './components/pages/PaymentSuccessPage';
import ProfilePage from './components/pages/ProfilePage';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/layout/Layout';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          <Route 
            path="/payment" 
            element={
              <ProtectedRoute paymentRequired={false}>
                <PaymentPage />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/payment-success" 
            element={
              <ProtectedRoute paymentRequired={false}>
                <PaymentSuccessPage />
              </ProtectedRoute>
            } 
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Layout>
                  <DashboardPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Layout>
                  <ProfilePage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/module/:moduleId/unit/:unitId"
            element={
              <ProtectedRoute>
                <Layout>
                  <UnitPage />
                </Layout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </HashRouter>
    </AuthProvider>
  );
};

export default App;