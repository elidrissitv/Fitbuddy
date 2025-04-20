import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import ActivityList from "./components/ActivityList";
import ActivityForm from "./components/ActivityForm";
import ChallengeBoard from "./components/ChallengeBoard";
import Leaderboard from "./components/Leaderboard";
import Profile from "./pages/Profile";
import Challenges from "./pages/Challenges";
import Auth from "./pages/Auth";

const PrivateRoute = ({ children }) => {
  const userId = localStorage.getItem("userId");
  return userId ? children : <Navigate to="/auth" />;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("userId")
  );

  useEffect(() => {
    const handleAuthStateChange = () => {
      setIsAuthenticated(!!localStorage.getItem("userId"));
    };

    window.addEventListener("authStateChanged", handleAuthStateChange);
    return () => {
      window.removeEventListener("authStateChanged", handleAuthStateChange);
    };
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {isAuthenticated && <Navbar />}
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/activities"
              element={
                <PrivateRoute>
                  <ActivityList />
                </PrivateRoute>
              }
            />
            <Route
              path="/challenges"
              element={
                <PrivateRoute>
                  <Challenges />
                </PrivateRoute>
              }
            />
            <Route
              path="/leaderboard"
              element={
                <PrivateRoute>
                  <Leaderboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route path="/" element={<Navigate to="/auth" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
