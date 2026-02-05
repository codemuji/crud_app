import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";

const App = () => {
  const [notes, setNotes] = useState([]);
  function fetchNotes() {
    axios.get(`${API_BASE}/api/notes`).then((res) => {
      setNotes(res.data.notes);
    });
  }
  useEffect(() => {
    fetchNotes();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    const { title, description } = e.target.elements;
    console.log(title.value, description.value);
    axios
      .post(`${API_BASE}/api/notes`, {
        title: title.value,
        description: description.value,
      })
      .then((res) => {
        console.log(res.data);
        fetchNotes();
      });
  }

  function handleDeleteNote(noteId) {
    axios.delete(`${API_BASE}/api/notes/` + noteId).then((res) => {
      console.log(res.data);
    });

    fetchNotes();
  }
  return (
    <>
      <form className="note-create-form" onSubmit={handleSubmit}>
        <input name="title" type="text" placeholder="Enter Title" />
        <input name="description" type="text" placeholder="Enter Description" />
        <button>Create Note</button>
      </form>
      <div className="notes">
        {notes.map((note) => {
          return (
            <div className="note">
              <h1>{note.title}</h1>
              <p>{note.description}</p>
              <button
                onClick={() => {
                  handleDeleteNote(note._id);
                }}
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default App;
