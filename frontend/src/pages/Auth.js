import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSpinner } from "react-icons/fa";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // Simuler une requête API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (isLogin) {
        // Logique de connexion
        localStorage.setItem("username", formData.username);
        setSuccess("Connexion réussie !");
      } else {
        // Logique d'inscription
        localStorage.setItem("username", formData.username);
        setSuccess("Inscription réussie !");
      }
    } catch (err) {
      setError("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 p-4">
      <motion.div
        className="w-full max-w-md"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={isLogin ? "login" : "register"}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8"
              initial={{ rotateY: 90 }}
              animate={{ rotateY: 0 }}
              exit={{ rotateY: -90 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                  {isLogin ? "Connexion" : "Inscription"}
                </h1>
                <p className="text-gray-600 dark:text-gray-300">
                  {isLogin
                    ? "Bienvenue sur FitBuddy !"
                    : "Rejoignez la communauté FitBuddy !"}
                </p>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
                >
                  {error}
                </motion.div>
              )}

              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4"
                >
                  {success}
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">
                    Pseudo
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 flex items-center justify-center"
                >
                  {loading ? <FaSpinner className="animate-spin mr-2" /> : null}
                  {isLogin ? "Se connecter" : "S'inscrire"}
                </button>
              </form>

              <div className="mt-6 text-center">
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition duration-300"
                >
                  {isLogin
                    ? "Pas encore de compte ? S'inscrire"
                    : "Déjà un compte ? Se connecter"}
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;
