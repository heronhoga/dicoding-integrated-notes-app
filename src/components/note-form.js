class NoteForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();

    const form = this.shadowRoot.getElementById("note-form");
    const titleInput = this.shadowRoot.getElementById("note-title");
    const bodyInput = this.shadowRoot.getElementById("note-body");
    const titleError = this.shadowRoot.getElementById("title-error");
    const bodyError = this.shadowRoot.getElementById("body-error");

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const title = titleInput.value.trim();
      const body = bodyInput.value.trim();
      let isValid = true;

      titleError.textContent = "";
      bodyError.textContent = "";

      if (title.length < 3) {
        titleError.textContent = "Judul harus minimal 3 huruf.";
        isValid = false;
      }

      if (body.length < 5) {
        bodyError.textContent = "Isi catatan harus minimal 5 huruf.";
        isValid = false;
      }

      if (isValid) {
        this.dispatchEvent(
          new CustomEvent("note-submitted", {
            detail: { title, body },
            bubbles: true,
            composed: true,
          })
        );
        form.reset();
      }
    });
  }

  render() {
    this.shadowRoot.innerHTML = `
  <style>
    :host {
      display: block;
      max-width: 600px;
      margin: 0 auto 2rem auto;
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      font-family: Arial, sans-serif;
    }

    input,
    textarea {
      padding: 0.75rem;
      font-size: 1rem;
      border: 1px solid #ccc;
      border-radius: 5px;
    }

    button {
      padding: 0.75rem;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }

    button:hover {
      background-color: #0056b3;
    }

    span {
      color: red;
      font-size: 0.9rem;
    }

    label {
      font-weight: bold;
    }
  </style>

      <form id="note-form">
        <label for="note-title">Judul (minimal 3 huruf)</label>
        <input type="text" id="note-title" placeholder="Judul" required />
        <span id="title-error"></span>

        <label for="note-body">Isi Catatan (minimal 5 huruf)</label>
        <textarea id="note-body" placeholder="Isi catatan..." required></textarea>
        <span id="body-error"></span>

        <button type="submit">Tambah Catatan</button>
      </form>
    `;
  }
}

customElements.define("note-form", NoteForm);
