import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import RedirectLogin from "./components/RedirectLogin";
import VideoList from "./components/VideoList";
import VideoDetail from "./components/VideoDetail";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RedirectLogin />} />
        <Route path="/home" element={<VideoList />} />
        <Route path="/videos" element={<VideoList />} />
        <Route path="/videos/:id" element={<VideoDetail />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
