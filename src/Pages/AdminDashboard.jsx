import React, { useEffect, useState } from "react";
import AdminDashboard from "../Components/AdminDashboard/AdminDashboard";
import { useNavigate } from "react-router-dom";
import api from "../axiosConfig"

function HomePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      let token = sessionStorage.getItem("token");

      if(!token){
        token = localStorage.getItem("token");
      }
      if (!token) {
        setLoading(false); // Ensure loading is stopped
        navigate("/admin/login"); // Redirect to login if token is missing
        return;
      }

      try {
        const response = await api.post(
          "/admin/verifyToken",
          {}, // Empty body since you want headers, not a body
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.success) { // Correct Axios response handling
          setIsAuthenticated(true); // Token is valid
        } else {
          navigate("/admin/login"); // Token is invalid
        }
      } catch (error) {
        console.error("Error verifying token", error);
        navigate("/admin/login"); // Redirect to login on error
      } finally {
        setLoading(false); // Stop loading state
      }
    };

    verifyToken();
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>; // Show loading message or spinner while verifying
  }

  if (!isAuthenticated) {
    return null; // Prevent rendering if not authenticated (fallback)
  }

  return (
    <React.StrictMode>
      <AdminDashboard /> {/* Render the AdminDashboard if authenticated */}
    </React.StrictMode>
  );
}

export default HomePage;
