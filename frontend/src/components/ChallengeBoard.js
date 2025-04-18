import React, { useState, useEffect } from "react";
import { getChallenges } from "../services/api";

const ChallengeBoard = () => {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchChallenges();
  }, []);

  const fetchChallenges = async () => {
    try {
      const data = await getChallenges();
      setChallenges(data);
      setLoading(false);
    } catch (error) {
      console.error("Erreur lors de la récupération des défis:", error);
      setLoading(false);
    }
  };

  const handleJoinChallenge = (challengeId) => {
    // Implémenter la logique pour rejoindre un défi
    alert(`Vous avez rejoint le défi ${challengeId}`);
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
        Défis Actifs
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {challenges.map((challenge) => (
          <div
            key={challenge.id}
            className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-sm"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                {challenge.title}
              </h3>
              <span className="px-3 py-1 text-sm rounded-full bg-primary text-white">
                {challenge.participants} participants
              </span>
            </div>

            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {challenge.description}
            </p>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Type:</span>
                <span className="text-gray-800 dark:text-gray-200">
                  {challenge.type}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">
                  Objectif:
                </span>
                <span className="text-gray-800 dark:text-gray-200">
                  {challenge.goal}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Fin:</span>
                <span className="text-gray-800 dark:text-gray-200">
                  {new Date(challenge.endDate).toLocaleDateString()}
                </span>
              </div>
            </div>

            <button
              onClick={() => handleJoinChallenge(challenge.id)}
              className="w-full bg-primary text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
            >
              Rejoindre le défi
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChallengeBoard;
