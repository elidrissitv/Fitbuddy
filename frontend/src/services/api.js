import axios from "axios";

const API_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
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

export default api;
