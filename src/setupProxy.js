const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  // Proxy authentication and API routes to backend
  app.use(
    ["/auth"],
    createProxyMiddleware({
      target: process.env.REACT_APP_API_URL || "http://localhost:8000",
      changeOrigin: true,
      secure: false,
      cookieDomainRewrite: "",
    })
  );
  app.use(
    ["/videos", "/notes", "/events"],
    createProxyMiddleware({
      target: process.env.REACT_APP_API_URL || "http://localhost:8000",
      changeOrigin: true,
      secure: false,
      cookieDomainRewrite: "",
    })
  );
};
