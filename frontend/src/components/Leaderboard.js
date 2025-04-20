import React, { useState, useEffect } from "react";
import { getLeaderboard } from "../services/api";

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const data = await getLeaderboard();
      setLeaderboard(data);
      setLoading(false);
    } catch (error) {
      console.error("Erreur lors de la récupération du classement:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-dark p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">
        Classement
      </h2>

      <div className="space-y-4">
        {leaderboard.map((user, index) => (
          <div
            key={user._id}
            className={`flex items-center justify-between p-4 rounded-lg ${
              index === 0
                ? "bg-yellow-100 dark:bg-yellow-900"
                : index === 1
                ? "bg-gray-100 dark:bg-gray-800"
                : index === 2
                ? "bg-amber-100 dark:bg-amber-900"
                : "bg-white dark:bg-dark"
            }`}
          >
            <div className="flex items-center space-x-4">
              <span className="text-2xl font-bold">
                {index === 0
                  ? "🥇"
                  : index === 1
                  ? "🥈"
                  : index === 2
                  ? "🥉"
                  : `${index + 1}.`}
              </span>
              <div className="flex items-center space-x-3">
                {user.avatarUrl && (
                  <img
                    src={user.avatarUrl}
                    alt={user.username}
                    className="w-10 h-10 rounded-full"
                  />
                )}
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                    {user.username}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {user.points} points
                  </p>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {user.activities?.length || 0} activités
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
