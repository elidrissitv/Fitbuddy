import axios from "axios";

const api = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://fitbuddy-auls.onrender.com/api"
      : "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Intercepteur pour gérer les erreurs globalement
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Erreur API:", error);
    if (error.response) {
      // Erreur serveur avec réponse
      console.error("Détails:", error.response.data);
    }
    return Promise.reject(error);
  }
);

// Intercepteur pour ajouter le token aux requêtes
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getActivities = async () => {
  try {
    const response = await api.get("/activities");
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des activités:", error);
    throw error;
  }
};

export const addActivity = async (activity) => {
  try {
    const response = await api.post("/activities", activity);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'activité:", error);
    throw error;
  }
};

export const getLeaderboard = async () => {
  try {
    const response = await api.get("/leaderboard");
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération du classement:", error);
    throw error;
  }
};

export const getChallenges = async () => {
  try {
    const response = await api.get("/challenges");
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des défis:", error);
    throw error;
  }
};

export const joinChallenge = async (challengeId, userId) => {
  try {
    const response = await api.put(`/challenges/${challengeId}/join`, {
      userId,
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la participation au défi:", error);
    throw error;
  }
};

export default api;
