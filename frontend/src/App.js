import React from "react";
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
import Auth from "./pages/Auth";

const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("username");
  return isAuthenticated ? children : <Navigate to="/auth" />;
};

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              path="/activities"
              element={
                <PrivateRoute>
                  <div className="space-y-8">
                    <ActivityForm />
                    <ActivityList />
                  </div>
                </PrivateRoute>
              }
            />
            <Route
              path="/challenges"
              element={
                <PrivateRoute>
                  <ChallengeBoard />
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
            <Route path="/" element={<Navigate to="/auth" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
