import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Make sure to import axios
import { Link, NavLink } from "react-router-dom";
import { API_BASE_URL } from "../../config";


export default function LoginInvestor() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // React Router navigation

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Use FormData to append form data
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/investor/login`, // Replace with actual base URL
        formData, // Send FormData instead of the raw object
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Login successful:", response.data);

      // Redirect or do something after successful login
      navigate("/dashboard"); // For example, navigate to a dashboard page
    } catch (error) {
      console.error("Error logging in:", error);
      setError("Failed to log in. Please check your credentials.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 bg-opacity-80 backdrop-blur-md p-8 rounded-xl shadow-2xl max-w-sm w-full">
        <h2 className="text-3xl font-bold text-white text-center mb-6">Investor Login</h2>
        {error && <p className="text-red-500 text-center mb-3">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-300 mb-1">Email:</label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-300 mb-1">Password:</label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300 shadow-md"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
