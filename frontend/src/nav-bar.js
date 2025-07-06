import { css, html, LitElement } from "lit";
import { when } from "lit/directives/when.js";

export class NavEvent extends Event {
  constructor(page) {
    super("nav-requested");
    this.page = page;
  }
}

export class NavBar extends LitElement {
  static get properties() {
    return {
      currentUser: { type: Object },
    };
  }

  currentUser;

  static get styles() {
    return css`
      ul {
        list-style: none;
        display: flex;
        flex-flow: row;
      }

      ul li {
        padding: 5px;
      }

      a {
        text-decoration: underline;
        cursor: pointer;
      }
    `;
  }

  requestNav(target) {
    return () => {
      this.dispatchEvent(new NavEvent(target));
    };
  }

  render() {
    return html` <nav>
      Navigation
      <ul>
        <li>
          <a @click=${this.requestNav("login")}>Login</a>
        </li>
        ${when(
          this.currentUser,
          () => html`
            <li>
              <a @click=${this.requestNav("todos")}>Todos</a>
            </li>
          `,
        )}
        ${when(
          this.currentUser && this.currentUser.username === "admin",
          () =>
            html` <li>
              <a @click=${this.requestNav("admin")}>Admin</a>
            </li>`,
        )}
      </ul>
    </nav>`;
  }
}

window.customElements.define("nav-bar", NavBar);
