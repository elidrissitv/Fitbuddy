import React, { useState, useEffect } from "react";
import { getActivities, addActivity } from "../services/api";

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newActivity, setNewActivity] = useState({
    type: "",
    distance: "",
    duration: "",
    date: new Date().toISOString().split("T")[0],
  });

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const data = await getActivities();
      setActivities(data);
      setLoading(false);
    } catch (error) {
      console.error("Erreur lors de la récupération des activités:", error);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addActivity(newActivity);
      setNewActivity({
        type: "",
        distance: "",
        duration: "",
        date: new Date().toISOString().split("T")[0],
      });
      fetchActivities();
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'activité:", error);
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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Mes Activités</h1>

      {/* Formulaire d'ajout d'activité */}
      <form
        onSubmit={handleSubmit}
        className="mb-8 bg-white p-6 rounded-lg shadow-md"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Type
            </label>
            <select
              value={newActivity.type}
              onChange={(e) =>
                setNewActivity({ ...newActivity, type: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
              required
            >
              <option value="">Sélectionner un type</option>
              <option value="course">Course</option>
              <option value="marche">Marche</option>
              <option value="vélo">Vélo</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Distance (km)
            </label>
            <input
              type="number"
              value={newActivity.distance}
              onChange={(e) =>
                setNewActivity({ ...newActivity, distance: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Durée (minutes)
            </label>
            <input
              type="number"
              value={newActivity.duration}
              onChange={(e) =>
                setNewActivity({ ...newActivity, duration: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Date
            </label>
            <input
              type="date"
              value={newActivity.date}
              onChange={(e) =>
                setNewActivity({ ...newActivity, date: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="mt-4 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark"
        >
          Ajouter l'activité
        </button>
      </form>

      {/* Liste des activités */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Distance
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Durée
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {activities.map((activity) => (
              <tr key={activity._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {new Date(activity.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {activity.type}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {activity.distance} km
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {activity.duration} min
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Activities;
