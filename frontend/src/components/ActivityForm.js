import React, { useState } from "react";
import { addActivity } from "../services/api";

const ActivityForm = () => {
  const [formData, setFormData] = useState({
    type: "",
    duration: "",
    distance: "",
    date: new Date().toISOString().split("T")[0],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addActivity(formData);
      setFormData({
        type: "",
        duration: "",
        distance: "",
        date: new Date().toISOString().split("T")[0],
      });
      alert("Activité ajoutée avec succès !");
    } catch (error) {
      alert("Erreur lors de l'ajout de l'activité");
    }
  };

  return (
    <div className="bg-white dark:bg-dark p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
        Ajouter une activité
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2">
            Type d'activité
          </label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
            required
          >
            <option value="">Sélectionner un type</option>
            <option value="course">Course</option>
            <option value="yoga">Yoga</option>
            <option value="musculation">Musculation</option>
            <option value="vélo">Vélo</option>
            <option value="natation">Natation</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2">
            Durée (minutes)
          </label>
          <input
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2">
            Distance (km)
          </label>
          <input
            type="number"
            name="distance"
            value={formData.distance}
            onChange={handleChange}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
            step="0.1"
          />
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2">
            Date
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-primary text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
        >
          Ajouter l'activité
        </button>
      </form>
    </div>
  );
};

export default ActivityForm;
