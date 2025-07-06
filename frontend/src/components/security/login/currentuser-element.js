import { LitElement, css, html } from "lit";
import { UserChanged } from "../events.js";
import { loginService } from "../../../services/login-service.js";

export class CurrentUserElement extends LitElement {
  static get properties() {
    return {
      registering: { type: Boolean },
      error: { type: String },
      currentUser: { type: Object, state: true },
    };
  }

  constructor() {
    super();
    this.username = "";
    this.error = "";
    this.loginService = loginService;
    this.currentUser = loginService.currentUser;
  }

  logout(event) {
    event.stopPropagation();

    this.error = "";
    this.loginService.logout();
    this.currentUser = this.loginService.currentUser;
    this.dispatchEvent(new UserChanged(this.currentUser));
  }

  navigateRegister(event) {
    event.stopPropagation();

    this.error = "";
    this.registering = true;
  }

  navigateLogin(event) {
    event.stopPropagation();

    this.error = "";
    this.registering = false;
  }

  login(event) {
    event.stopPropagation();

    this.error = "";
    this.loginService
      .login(event.username, event.password)
      .then(() => {
        this.currentUser = this.loginService.currentUser;
        this.dispatchEvent(new UserChanged(this.currentUser));
      })
      .catch((error) => {
        this.error = error.message;
      });
  }

  register(event) {
    this.loginService
      .register(event.data)
      .then(() =>
        this.loginService.login(event.data.username, event.data.password),
      )
      .then(() => {
        this.currentUser = this.loginService.currentUser;
        this.registering = false;
        this.dispatchEvent(new UserChanged(this.currentUser));
      });
  }

  render() {
    //Later behandelen we 'routing', wat een mooiere manier is om dit op te lossen.
    const error = html`<span class="error">${this.error}</span>`;

    if (this.registering) {
      return html` ${error}
        <s3-register
          @attempt-register=${this.register}
          @request-login=${this.navigateLogin}
        ></s3-register>`;
    }
    return html`
      ${error}
      <s3-login
        @request-logout=${this.logout}
        @request-register=${this.navigateRegister}
        @attempt-login=${this.login}
        username=${this.currentUser?.username}
      ></s3-login>
    `;
  }

  static get styles() {
    return css`
      .error {
        color: var(--hu-red);
      }
    `;
  }
}

window.customElements.define("s3-currentuser", CurrentUserElement);
