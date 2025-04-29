import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

function VideoList() {
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchVideos() {
      try {
        const res = await api.get("/videos");
        setVideos(res.data);
      } catch (err) {
        console.error("Failed to fetch videos", err);
      }
    }
    fetchVideos();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Your Videos</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {videos.map((v) => (
          <li
            key={v.id}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
              cursor: "pointer",
            }}
            onClick={() => navigate(`/videos/${v.id}`)}
          >
            <img
              src={v.thumbnail}
              alt={v.title}
              style={{ width: "120px", height: "90px", marginRight: "10px" }}
            />
            <span>{v.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default VideoList;
