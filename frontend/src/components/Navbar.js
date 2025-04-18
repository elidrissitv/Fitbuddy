import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const savedUsername = localStorage.getItem("username");
    if (savedUsername) {
      setUsername(savedUsername);
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <nav className="bg-white dark:bg-dark shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-primary">
            FitBuddy
          </Link>

          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className="text-gray-700 dark:text-gray-200 hover:text-primary"
            >
              Dashboard
            </Link>
            <Link
              to="/activities"
              className="text-gray-700 dark:text-gray-200 hover:text-primary"
            >
              Activités
            </Link>
            <Link
              to="/challenges"
              className="text-gray-700 dark:text-gray-200 hover:text-primary"
            >
              Défis
            </Link>
            <Link
              to="/leaderboard"
              className="text-gray-700 dark:text-gray-200 hover:text-primary"
            >
              Classement
            </Link>
            <Link
              to="/profile"
              className="text-gray-700 dark:text-gray-200 hover:text-primary"
            >
              Profil
            </Link>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              {darkMode ? "🌞" : "🌙"}
            </button>

            {username && (
              <span className="text-gray-700 dark:text-gray-200">
                {username}
              </span>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
