import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import fitbuddyLogo from "../components/fitbuddy.png";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [username, setUsername] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUsername = localStorage.getItem("username");
    const userId = localStorage.getItem("userId");
    if (savedUsername && userId) {
      setUsername(savedUsername);
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    setIsAuthenticated(false);
    setUsername("");
    navigate("/auth");
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <Link
            to="/"
            className="flex items-center space-x-3 hover:opacity-90 transition-opacity"
          >
            <img
              src={fitbuddyLogo}
              alt="FitBuddy Logo"
              className="h-16 w-auto object-contain"
            />
            <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              FitBuddy
            </span>
          </Link>

          <div className="flex items-center space-x-6">
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
                >
                  Dashboard
                </Link>
                <Link
                  to="/activities"
                  className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
                >
                  Activités
                </Link>
                <Link
                  to="/challenges"
                  className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
                >
                  Défis
                </Link>
                <Link
                  to="/leaderboard"
                  className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
                >
                  Classement
                </Link>
                <Link
                  to="/profile"
                  className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
                >
                  Profil
                </Link>
                <span className="text-gray-700 dark:text-gray-200 font-medium px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-full">
                  {username}
                </span>
                <button
                  onClick={handleLogout}
                  className="text-gray-700 dark:text-gray-200 hover:text-red-600 dark:hover:text-red-400 transition-colors font-medium"
                >
                  Déconnexion
                </button>
              </>
            ) : (
              <Link
                to="/auth"
                className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
              >
                Connexion
              </Link>
            )}

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-lg"
              aria-label="Toggle dark mode"
            >
              {darkMode ? "🌞" : "🌙"}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
