class AppHeader extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });

    const wrapper = document.createElement("header");
    wrapper.classList.add("app-header");

    const title = document.createElement("h1");
    title.textContent = this.getAttribute("title") ?? "Catatanku!";
    wrapper.appendChild(title);

    const style = document.createElement("style");
    style.textContent = `
      .app-header {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 1rem 0;
        font-family: system-ui, sans-serif;
      }
      h1 {
        margin: 0;
        font-weight: 600;
        font-size: 2rem;
        letter-spacing: .5px;
      }
    `;

    shadow.append(style, wrapper);
  }
}

customElements.define("app-header", AppHeader);
