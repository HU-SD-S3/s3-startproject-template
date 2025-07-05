import { LitElement, css, html } from "lit";
import huLogo from "./assets/hu-logo.svg";
import { getCurrentUser } from "./services/login-service.js";
import { choose } from "lit/directives/choose.js";

export class AppElement extends LitElement {
  static get properties() {
    return {
      title: { type: String },
      currentUser: { type: Object, state: true },
      currentPage: { type: String, state: true },
    };
  }

  constructor() {
    super();
    this.title = "Dummy Title";
    this.currentUser = getCurrentUser();
    this.currentPage = "login";
  }

  userChanged(e) {
    this.currentUser = e.user;
  }

  navigate(e) {
    this.currentPage = e.page;
  }

  render() {
    console.log("app-user", this.currentUser);
    return html`
      <header>
        <img src=${huLogo} class="logo" alt="HU Logo" />
        <h1>${this.title}</h1>
      </header>
      <nav-bar
        @nav-requested=${this.navigate}
        .currentUser=${this.currentUser}
      ></nav-bar>
      <section>
        ${choose(this.currentPage, [
          [
            "login",
            () =>
              html` <s3-currentuser
                @user-changed="${this.userChanged}"
              ></s3-currentuser>`,
          ],
          [
            "admin",
            () =>
              html`<s3-usergrid
                .currentUser="${this.currentUser}"
              ></s3-usergrid>`,
          ],
          [
            "todos",
            () =>
              html`<todos-list .currentUser=${this.currentUser}></todos-list>`,
          ],
        ])}
      </section>
    `;
  }

  static get styles() {
    return css`
      :host {
        max-width: 1280px;
        margin: 0 auto;
        padding: 2rem;
        text-align: center;
      }

      .logo {
        height: 6em;
        padding: 1.5em;
      }
    `;
  }
}

window.customElements.define("s3-app", AppElement);
