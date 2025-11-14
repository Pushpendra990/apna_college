import React from "react";
import { Navigate, useRoutes } from "react-router-dom";

// ✅ Import layouts
import AuthLayout from "../layout/authLayout";
import MainLayout from "../layout/mainLayout";

// ✅ Import pages
import AuthPage from "../pages/auth";
import DashboardPage from "../pages/dashboard";
import ProblemsPage from "../pages/probelms";
import StatisticsPage from "../pages/stastics";

// ✅ Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("user");
  if (!token) {
    // 🔹 Not logged in, redirect to login
    return <Navigate to="/login" replace />;
  }
  return children;
};

// ✅ Public Route Wrapper (prevents showing login if already logged in)
const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("user");
  if (token) {
    // 🔹 Already logged in, redirect to dashboard
    return <Navigate to="/dashboard" replace />;
  }
  return children;
};

export default function AppRoutes() {
  const routes = useRoutes([
    // 🔹 Auth Routes (Login, Signup etc.)
    {
      path: "/",
      element: (
        <PublicRoute>
          <AuthLayout />
        </PublicRoute>
      ),
      children: [
        { path: "login", element: <AuthPage /> },
        { index: true, element: <Navigate to="/login" replace /> },
      ],
    },

    // 🔹 Protected Main Routes
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <MainLayout />
        </ProtectedRoute>
      ),
      children: [
        { path: "dashboard", element: <DashboardPage /> },
        { path: "problems", element: <ProblemsPage /> },
        { path: "statistics", element: <StatisticsPage /> },
        { index: true, element: <Navigate to="/dashboard" replace /> },
      ],
    },

    // 🔹 Catch-all 404 Route
    {
      path: "*",
      element: (
        <div className="flex items-center justify-center min-h-screen text-2xl font-bold text-red-600">
          404 | Page Not Found
        </div>
      ),
    },
  ]);

  return routes;
}
