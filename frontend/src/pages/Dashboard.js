import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { getActivities } from "../services/api";
import Leaderboard from "../components/Leaderboard";

const Dashboard = () => {
  const [activities, setActivities] = useState([]);
  const [stats, setStats] = useState({
    totalActivities: 0,
    totalDistance: 0,
    totalDuration: 0,
  });

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const data = await getActivities();
      setActivities(data);
      calculateStats(data);
    } catch (error) {
      console.error("Erreur lors de la récupération des activités:", error);
    }
  };

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

  const getWeeklyData = () => {
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - i);
      return d.toISOString().split("T")[0];
    }).reverse();

    const dailyData = last7Days.map((date) => {
      const dayActivities = activities.filter(
        (activity) => activity.date === date
      );
      return {
        date,
        distance: dayActivities.reduce(
          (sum, activity) => sum + (activity.distance || 0),
          0
        ),
        duration: dayActivities.reduce(
          (sum, activity) => sum + (activity.duration || 0),
          0
        ),
      };
    });

    return {
      labels: dailyData.map((data) =>
        new Date(data.date).toLocaleDateString("fr-FR", { weekday: "short" })
      ),
      datasets: [
        {
          label: "Distance (km)",
          data: dailyData.map((data) => data.distance),
          borderColor: "rgb(59, 130, 246)",
          backgroundColor: "rgba(59, 130, 246, 0.1)",
          tension: 0.4,
        },
        {
          label: "Durée (min)",
          data: dailyData.map((data) => data.duration),
          borderColor: "rgb(16, 185, 129)",
          backgroundColor: "rgba(16, 185, 129, 0.1)",
          tension: 0.4,
        },
      ],
    };
  };

  return (
    <div className="space-y-8">
      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-dark p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400">
            Activités
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
      </div>

      {/* Graphique */}
      <div className="bg-white dark:bg-dark p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">
          Activités de la semaine
        </h2>
        <div className="h-64">
          <Line
            data={getWeeklyData()}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: "top",
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            }}
          />
        </div>
      </div>

      {/* Top 3 du classement */}
      <div className="bg-white dark:bg-dark p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">
          Top 3 du classement
        </h2>
        <Leaderboard />
      </div>
    </div>
  );
};

export default Dashboard;
