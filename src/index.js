import "./components/note-item.js";
import "./components/note-form.js";
import "./components/note-header.js";
import "./style.css";

const notesContainer = document.getElementById("notes-container");

function createNoteElement(id, title, body, createdAt, archived) {
  const note = document.createElement("note-item");
  note.setAttribute("id", id);
  note.setAttribute("title", title);
  note.setAttribute("body", body);
  note.setAttribute("createdat", createdAt);
  note.setAttribute("archived", archived);
  notesContainer.appendChild(note);
}

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

function createNote(data) {
  const url = "https://notes-api.dicoding.dev/v2/notes";
  console.log(data);

  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      return response.json();
    })
    .then((notes) => {
      const notesData = notes.data;
      console.log(notesData);
      return notesData;
    })
    .catch((error) => {
      console.error(error.message);
    });
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

document.addEventListener("note-submitted", async (e) => {
  const { title, body } = e.detail;
  const dataInput = { title, body };

  const newData = await createNote(dataInput);

  if (!newData) {
    console.error("Failed to create note.");
    return;
  }

  const newNote = {
    id: newData.id,
    title: newData.title,
    body: newData.body,
    createdAt: new Date(newData.createdAt).toISOString(),
    archived: newData.archived,
  };

  createNoteElement(
    newNote.id,
    newNote.title,
    newNote.body,
    newNote.createdAt,
    newNote.archived
  );
});

