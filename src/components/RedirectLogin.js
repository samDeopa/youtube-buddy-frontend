import React, { useEffect } from "react";

function RedirectLogin() {
  useEffect(() => {
    // Redirect to Google login, using API URL if provided
    const authUrl = process.env.REACT_APP_API_URL
      ? `${process.env.REACT_APP_API_URL}/auth/google`
      : "/auth/google";
    window.location.href = authUrl;
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <p>Redirecting to Google login...</p>
    </div>
  );
}

export default RedirectLogin;
