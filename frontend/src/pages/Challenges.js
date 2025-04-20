import React, { useState, useEffect } from "react";
import { getChallenges } from "../services/api";

const Challenges = () => {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const data = await getChallenges();
        console.log("Données reçues:", JSON.stringify(data, null, 2));
        setChallenges(data);
        setLoading(false);
      } catch (err) {
        setError("Erreur lors du chargement des défis");
        setLoading(false);
      }
    };

    fetchChallenges();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="text-red-500 bg-red-100 px-6 py-4 rounded-lg shadow">
          {error}
        </div>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <header className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Défis</h2>
        <p className="text-gray-600">
          Participez à des défis et mesurez-vous aux autres utilisateurs
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {challenges.map((challenge) => {
          console.log("Challenge:", challenge);
          console.log("Participants:", challenge.participants);
          return (
            <article
              key={challenge._id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
            >
              <div className="p-6">
                <header className="mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {challenge.title}
                  </h3>
                  <p className="text-gray-600 line-clamp-2">
                    {challenge.description}
                  </p>
                </header>

                <div className="space-y-4">
                  <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Objectif
                      </p>
                      <p className="text-lg font-semibold text-gray-900">
                        {challenge.goal} km
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-500">
                        Date de fin
                      </p>
                      <p className="text-gray-900">
                        {new Date(challenge.endDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-2">
                      Participants ({challenge.participants?.length || 0})
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {Array.isArray(challenge.participants) &&
                        challenge.participants.map((participant) => {
                          console.log("Participant:", participant);
                          return (
                            <div
                              key={participant._id}
                              className="inline-flex items-center bg-gray-50 rounded-full px-3 py-1 hover:bg-gray-100 transition-colors"
                            >
                              {participant.avatarUrl && (
                                <img
                                  src={participant.avatarUrl}
                                  alt={participant.pseudo}
                                  className="w-6 h-6 rounded-full mr-2 border border-gray-200"
                                />
                              )}
                              <span className="text-sm text-gray-700 font-medium">
                                {participant.pseudo}
                              </span>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>

                <footer className="mt-6">
                  <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 font-medium">
                    Rejoindre le défi
                  </button>
                </footer>
              </div>
            </article>
          );
        })}
      </div>

      {challenges.length === 0 && (
        <div className="flex flex-col items-center justify-center min-h-[40vh] bg-gray-50 rounded-xl p-8">
          <svg
            className="w-16 h-16 text-gray-400 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 20a8 8 0 100-16 8 8 0 000 16z"
            />
          </svg>
          <p className="text-gray-500 text-lg text-center">
            Aucun défi disponible pour le moment.
          </p>
        </div>
      )}
    </div>
  );
};

export default Challenges;
