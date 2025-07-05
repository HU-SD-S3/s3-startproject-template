import { css, html, LitElement } from "lit";

export class AdminPage extends LitElement {
  static get styles() {
    return css``;
  }

  render() {
    return html` Admin`;
  }
}

window.customElements.define("admin-page", AdminPage);
