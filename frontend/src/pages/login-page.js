import { css, html, LitElement } from "lit";

export class LoginPage extends LitElement {
  static get styles() {
    return css``;
  }

  render() {
    return html` Login`;
  }
}

window.customElements.define("login-page", LoginPage);
