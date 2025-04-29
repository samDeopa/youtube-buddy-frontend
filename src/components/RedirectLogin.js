import React, { useEffect } from "react";

// URL of the backend API server
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

function RedirectLogin() {
  useEffect(() => {
    // Use relative path to leverage React proxy
    window.location.href = "/auth/google";
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <p>Redirecting to Google login...</p>
    </div>
  );
}

export default RedirectLogin;
