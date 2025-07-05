import { LitElement, css, html } from "lit";
import { LoginRequested, RegisterAttempted } from "../events.js";

export class RegisterElement extends LitElement {
  static get properties() {
    return {};
  }

  constructor() {
    super();
    this.username = "";
  }

  attemptRegister() {
    const registerForm = this.shadowRoot.querySelector("form");
    const registerData = Object.fromEntries(new FormData(registerForm));
    this.dispatchEvent(new RegisterAttempted(registerData));
  }

  navigateLogin() {
    this.dispatchEvent(new LoginRequested());
  }

  render() {
    return html`
      <form>
        <div>
          <div>
            <label for="username">Username:</label>
            <input type="text" id="username" name="username" />
          </div>
          <div>
            <label for="firstname">First Name:</label>
            <input type="text" id="firstname" name="firstname" />
          </div>
          <div>
            <label for="lastname">Last Name:</label>
            <input type="text" id="lastname" name="lastname" />
          </div>
          <div>
            <label for="password">Password:</label>
            <input type="password" id="password" name="password" />
          </div>
        </div>
        <div>
          <button type="button" @click=${this.attemptRegister}>Register</button>
          <button type="button" @click=${this.navigateLogin}>Cancel</button>
        </div>
      </form>
    `;
  }

  static get styles() {
    return css``;
  }
}

window.customElements.define("s3-register", RegisterElement);
