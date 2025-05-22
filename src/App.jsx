import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Library from "./pages/Library";
import BookDetail from "./pages/BookDetail";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import UserProtectedRoute from "./components/UserProtectedRoute";
import { AdminProvider } from "./context/AdminContext";

function App() {
  return (
    <AdminProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Protected User Routes */}
          <Route 
            path="/library" 
            element={
              <UserProtectedRoute>
                <Library />
              </UserProtectedRoute>
            } 
          />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route 
            path="/admin/dashboard" 
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/BookDetail" 
            element={
              <ProtectedRoute>
                <BookDetail />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Router>
    </AdminProvider>
  );
}

export default App;
