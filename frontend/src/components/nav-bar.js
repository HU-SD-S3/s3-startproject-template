import { css, html, LitElement } from "lit";
import { when } from "lit/directives/when.js";
import { NavEvent } from "./events.js";

export class NavBar extends LitElement {
  static get properties() {
    return {
      currentUser: { type: Object },
    };
  }

  constructor(){
    super();
    this.currentUser = {};
  }

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
          this.currentUser && this.currentUser.username,
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
