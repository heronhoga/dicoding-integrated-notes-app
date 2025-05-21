class NoteItem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get observedAttributes() {
    return ["id", "title", "body", "createdat", "archived"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  render() {
    const id = this.getAttribute("id") || "";
    const title = this.getAttribute("title") || "";
    const body = this.getAttribute("body") || "";
    const createdAt = this.getAttribute("createdat") || "";
    const archived = this.getAttribute("archived") || "";

    this.shadowRoot.innerHTML = `
      <style>
        .card {
          background: white;
          padding: 1rem;
          margin-bottom: 1rem;
          border-radius: 10px;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
          font-family: Arial, sans-serif;
        }
        h3 {
          margin: 0 0 0.5rem 0;
          font-size: 1.1rem;
        }
        p {
          margin: 0 0 0.5rem 0;
          white-space: pre-wrap;
        }
        .created {
          font-size: 0.8rem;
          color: #777;
        }
      </style>
      <div class="card">
        <p>${id}</p>
        <h3>${title}</h3>
        <p>${body}</p>
        <div class="created">Dibuat pada: ${new Date(
          createdAt
        ).toLocaleString()}</div>
        <p>Archived: ${archived}</p>
      </div>
    `;
  }

  connectedCallback() {
    this.render();
  }
}

customElements.define("note-item", NoteItem);
