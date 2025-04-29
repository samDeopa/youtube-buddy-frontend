import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api";

function VideoDetail() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [comments, setComments] = useState([]);
  const [notes, setNotes] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [replyTexts, setReplyTexts] = useState({});
  const [newNote, setNewNote] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editNotes, setEditNotes] = useState({});

  useEffect(() => {
    async function fetchAll() {
      await fetchVideo();
      await fetchComments();
      await fetchNotes();
    }
    fetchAll();
  }, [id]);

  const fetchVideo = async () => {
    try {
      const res = await api.get(`/videos/${id}`);
      setVideo(res.data);
      setTitle(res.data.snippet.title);
      setDescription(res.data.snippet.description);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchComments = async () => {
    try {
      const res = await api.get(`/videos/${id}/comments`);
      setComments(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchNotes = async () => {
    try {
      const res = await api.get(`/notes?videoId=${id}`);
      setNotes(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const updateVideo = async () => {
    try {
      await api.patch(`/videos/${id}`, { title, description });
      alert("Video updated");
      fetchVideo();
    } catch (err) {
      console.error(err);
    }
  };

  const postComment = async () => {
    if (!newComment) return;
    try {
      const comment = await api.post(`/videos/${id}/comments`, {
        text: newComment,
      });
      console.log(comment);

      setNewComment("");
      fetchComments();
    } catch (err) {
      console.error(err);
    }
  };

  const postReply = async (commentId) => {
    const text = replyTexts[commentId];
    if (!text) return;
    try {
      await api.post(`/videos/${id}/comments/${commentId}/replies`, { text });
      setReplyTexts({ ...replyTexts, [commentId]: "" });
      fetchComments();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteComment = async (commentId) => {
    try {
      await api.delete(`/videos/${id}/comments/${commentId}`);
      fetchComments();
    } catch (err) {
      console.error(err);
    }
  };

  const addNote = async () => {
    if (!newNote) return;
    try {
      await api.post("/notes", { videoId: id, content: newNote });
      setNewNote("");
      fetchNotes();
    } catch (err) {
      console.error(err);
    }
  };

  const updateNote = async (noteId) => {
    const content = editNotes[noteId];
    if (content === undefined) return;
    try {
      await api.patch(`/notes/${noteId}`, { content });
      fetchNotes();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteNote = async (noteId) => {
    try {
      await api.delete(`/notes/${noteId}`);
      fetchNotes();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <Link to="/videos">← Back to list</Link>

      {video && (
        <div>
          <h2>Video Detail</h2>
          <img
            src={video.snippet.thumbnails?.default?.url}
            alt={video.snippet.title}
          />
          <div>
            <label>
              Title:
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{ width: "100%", margin: "5px 0" }}
              />
            </label>
          </div>
          <div>
            <label>
              Description:
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                style={{ width: "100%", margin: "5px 0" }}
              />
            </label>
          </div>
          <button onClick={updateVideo}>Save Changes</button>
          <p>Views: {video.statistics.viewCount}</p>
        </div>
      )}

      <hr />

      <div>
        <h3>Comments</h3>
        <div style={{ marginBottom: "10px" }}>
          <input
            placeholder="Add comment"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            style={{ width: "80%" }}
          />
          <button onClick={postComment}>Post</button>
        </div>
        {comments.map((thread) => (
          <div
            key={thread.id}
            style={{ padding: "10px", borderBottom: "1px solid #ccc" }}
          >
            <p>{thread.snippet.topLevelComment.snippet.textOriginal}</p>
            <button
              onClick={() => deleteComment(thread.snippet.topLevelComment.id)}
            >
              Delete
            </button>

            {thread.replies?.comments?.map((reply) => (
              <div
                key={reply.id}
                style={{ marginLeft: "20px", marginTop: "5px" }}
              >
                <p>{reply.snippet.textOriginal}</p>
                <button onClick={() => deleteComment(reply.id)}>Delete</button>
              </div>
            ))}

            <div style={{ marginLeft: "20px", marginTop: "5px" }}>
              <input
                placeholder="Reply..."
                value={replyTexts[thread.id] || ""}
                onChange={(e) =>
                  setReplyTexts({
                    ...replyTexts,
                    [thread.id]: e.target.value,
                  })
                }
                style={{ width: "60%" }}
              />
              <button onClick={() => postReply(thread.id)}>Reply</button>
            </div>
          </div>
        ))}
      </div>

      <hr />

      <div>
        <h3>Notes</h3>
        <div style={{ marginBottom: "10px" }}>
          <input
            placeholder="Add a note"
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            style={{ width: "80%" }}
          />
          <button onClick={addNote}>Add</button>
        </div>
        {notes.map((note) => (
          <div key={note._id} style={{ marginBottom: "10px" }}>
            <textarea
              value={
                editNotes[note._id] !== undefined
                  ? editNotes[note._id]
                  : note.content
              }
              onChange={(e) =>
                setEditNotes({ ...editNotes, [note._id]: e.target.value })
              }
              rows={2}
              style={{ width: "100%", marginBottom: "5px" }}
            />
            <button onClick={() => updateNote(note._id)}>Save</button>
            <button onClick={() => deleteNote(note._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VideoDetail;
