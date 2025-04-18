import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import ActivityList from "./components/ActivityList";
import ActivityForm from "./components/ActivityForm";
import ChallengeBoard from "./components/ChallengeBoard";
import Leaderboard from "./components/Leaderboard";
import Profile from "./pages/Profile";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route
              path="/activities"
              element={
                <div className="space-y-8">
                  <ActivityForm />
                  <ActivityList />
                </div>
              }
            />
            <Route path="/challenges" element={<ChallengeBoard />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
