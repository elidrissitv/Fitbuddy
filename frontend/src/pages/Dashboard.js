import React, { useState, useEffect } from "react";
import Leaderboard from "../components/Leaderboard";
import ActivityChart from "../components/ActivityChart";
import { getActivities } from "../services/api";

const Dashboard = () => {
  const [activities, setActivities] = useState([]);
  const [stats, setStats] = useState({
    totalActivities: 0,
    totalDistance: 0,
    totalDuration: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const data = await getActivities();
        setActivities(data);
        setLoading(false);
        calculateStats(data);
      } catch (err) {
        setError("Erreur lors du chargement des activités");
        setLoading(false);
      }
    };

    fetchActivities();
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

    setStats({
      totalActivities,
      totalDistance,
      totalDuration,
    });
  };

  if (loading) return <div>Chargement...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* En-tête du Dashboard */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Tableau de bord
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Suivez vos performances et votre progression
        </p>
      </div>

      {/* Cartes de statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
          <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">
            Activités
          </h3>
          <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            {stats.totalActivities || 0}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
          <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">
            Distance Totale
          </h3>
          <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            {stats.totalDistance ? `${stats.totalDistance} km` : "0 km"}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
          <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">
            Durée Totale
          </h3>
          <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            {stats.totalDuration ? `${stats.totalDuration} min` : "0 min"}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
          <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">
            Dernière Activité
          </h3>
          <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            {activities[0]?.type || "Aucune"}
          </p>
        </div>
      </div>

      {/* Graphique d'activités */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Activités de la semaine
            </h2>
            <div className="h-[300px]">
              <ActivityChart activities={activities} />
            </div>
          </div>
        </div>

        {/* Classement */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Top 3 du classement
            </h2>
            <Leaderboard />
          </div>
        </div>
      </div>

      {/* Dernières activités */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Dernières activités
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Durée
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Distance
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {activities.slice(0, 5).map((activity, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {new Date(activity.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {activity.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {activity.duration} min
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {activity.distance} km
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {activities.length === 0 && (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              Aucune activité enregistrée
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
