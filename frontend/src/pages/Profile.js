import React, { useState, useEffect, useCallback } from "react";
import { getActivities } from "../services/api";

const Profile = () => {
  const [username, setUsername] = useState("");
  const [activities, setActivities] = useState([]);
  const [stats, setStats] = useState({
    totalActivities: 0,
    totalDistance: 0,
    totalDuration: 0,
    favoriteActivity: "",
  });

  const fetchActivities = useCallback(async () => {
    try {
      const data = await getActivities();
      setActivities(data);
      calculateStats(data);
    } catch (error) {
      console.error("Erreur lors de la récupération des activités:", error);
    }
  }, []);

  const calculateStats = (activities) => {
    const totalActivities = activities.length;
    const totalDistance = activities.reduce(
      (sum, activity) => sum + (activity.distance || 0),
      0
    );
    const totalDuration = activities.reduce(
      (sum, activity) => sum + (activity.duration || 0),
      0
    );

    // Calculer l'activité favorite
    const activityCounts = activities.reduce((acc, activity) => {
      acc[activity.type] = (acc[activity.type] || 0) + 1;
      return acc;
    }, {});

    const favoriteActivity =
      Object.entries(activityCounts).sort(([, a], [, b]) => b - a)[0]?.[0] ||
      "Aucune";

    setStats({
      totalActivities,
      totalDistance,
      totalDuration,
      favoriteActivity,
    });
  };

  useEffect(() => {
    const savedUsername = localStorage.getItem("username");
    if (savedUsername) {
      setUsername(savedUsername);
    }
    fetchActivities();
  }, [fetchActivities]);

  const handleUsernameChange = (e) => {
    const newUsername = e.target.value;
    setUsername(newUsername);
    localStorage.setItem("username", newUsername);
  };

  return (
    <div className="space-y-8">
      {/* Informations du profil */}
      <div className="bg-white dark:bg-dark p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">
          Profil
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2">
              Nom d'utilisateur
            </label>
            <input
              type="text"
              value={username}
              onChange={handleUsernameChange}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
              placeholder="Entrez votre nom d'utilisateur"
            />
          </div>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-dark p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400">
            Activités Total
          </h3>
          <p className="text-3xl font-bold text-gray-800 dark:text-gray-200">
            {stats.totalActivities}
          </p>
        </div>
        <div className="bg-white dark:bg-dark p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400">
            Distance Totale
          </h3>
          <p className="text-3xl font-bold text-gray-800 dark:text-gray-200">
            {stats.totalDistance} km
          </p>
        </div>
        <div className="bg-white dark:bg-dark p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400">
            Durée Totale
          </h3>
          <p className="text-3xl font-bold text-gray-800 dark:text-gray-200">
            {stats.totalDuration} min
          </p>
        </div>
        <div className="bg-white dark:bg-dark p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400">
            Activité Favorite
          </h3>
          <p className="text-3xl font-bold text-gray-800 dark:text-gray-200">
            {stats.favoriteActivity}
          </p>
        </div>
      </div>

      {/* Historique des activités */}
      <div className="bg-white dark:bg-dark p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">
          Historique des activités
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Durée
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Distance
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-dark divide-y divide-gray-200 dark:divide-gray-700">
              {activities.map((activity, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">
                    {new Date(activity.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">
                    {activity.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">
                    {activity.duration} min
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">
                    {activity.distance} km
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Profile;
