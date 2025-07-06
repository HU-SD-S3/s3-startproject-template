import { LitElement, css, html } from "lit";
import {
  LoginAttempted,
  LogoutRequested,
  RegisterRequested,
} from "../events.js";

export class LoginElement extends LitElement {
  static get properties() {
    return {
      username: { type: String },
    };
  }

  inputUsername;
  inputPassword;

  constructor() {
    super();
    this.username = "";
  }

  attemptLogin() {
    this.dispatchEvent(
      new LoginAttempted(this.inputUsername, this.inputPassword),
    );
  }

  requestRegister() {
    this.dispatchEvent(new RegisterRequested());
  }

  requestLogout() {
    this.dispatchEvent(new LogoutRequested());
  }

  changeName(event) {
    this.inputUsername = event.target.value;
  }

  changePassword(event) {
    this.inputPassword = event.target.value;
  }

  render() {
    if (!this.username) {
      return html`
        <form>
          <div>
            <div>
              <label for="name">Username:</label>
              <input
                @change=${this.changeName}
                type="text"
                id="name"
                name="user_name"
              />
            </div>
            <div>
              <label for="password">Password:</label>
              <input
                @change=${this.changePassword}
                type="password"
                id="password"
                name="user_password"
              />
            </div>
          </div>
          <div>
            <button type="button" @click=${this.attemptLogin}>Login</button>
            <button type="button" @click=${this.requestRegister}>
              Register
            </button>
          </div>
        </form>
      `;
    }
    return html`
      <form>
        <div>Logged in as ${this.username}.</div>
        <div>
          <button type="button" @click=${this.requestLogout}>Logout</button>
        </div>
      </form>
    `;
  }

  static get styles() {
    return css``;
  }
}

window.customElements.define("s3-login", LoginElement);
