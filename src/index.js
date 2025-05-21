import "./components/note-item.js";
import "./components/note-form.js";
import "./components/note-header.js";
import "./style.css";

const notesContainer = document.getElementById("notes-container");

async function getNotes() {
  const url = "https://notes-api.dicoding.dev/v2/notes";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const notes = await response.json();
    const notesData = notes.data;
    return notesData;
  } catch (error) {
    console.error(error.message);
  }
}

const notesData = await getNotes();

notesData.forEach((note) => {
  createNoteElement(
    note.id,
    note.title,
    note.body,
    note.createdAt,
    note.archived
  );
});

document.addEventListener("note-submitted", (e) => {
  const { title, body } = e.detail;
  const newNote = {
    id: `notes-${Math.random().toString(36).substring(2, 10)}`,
    title,
    body,
    createdAt: new Date().toISOString(),
    archived: false,
  };
  createNoteElement(
    newNote.id,
    newNote.title,
    newNote.body,
    newNote.createdAt,
    newNote.archived
  );
});

function createNoteElement(id, title, body, createdAt, archived) {
  const note = document.createElement("note-item");
  note.setAttribute("id", id);
  note.setAttribute("title", title);
  note.setAttribute("body", body);
  note.setAttribute("createdat", createdAt);
  note.setAttribute("archived", archived);
  notesContainer.appendChild(note);
}
