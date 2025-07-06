import { css, html, LitElement } from "lit";
import { DeleteUserClicked, SaveUserClicked } from "../events.js";
import { when } from "lit/directives/when.js";

export class UsergridRow extends LitElement {
  static get properties() {
    return {
      user: { type: Object },
      editing: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.user = {};
    this.editing = false;
  }

  startEdit() {
    this.editing = true;
  }

  cancelEdit() {
    this.editing = false;
  }

  saveEdit() {
    const firstName = this.renderRoot.querySelector(
      'input[name="firstName"]',
    ).value;
    const lastName = this.renderRoot.querySelector(
      'input[name="lastName"]',
    ).value;
    const enabled = this.renderRoot.querySelector(
      'input[name="enabled"]',
    ).checked;

    this.dispatchEvent(
      new SaveUserClicked({ ...this.user, firstName, lastName, enabled }),
    );
    this.editing = false;
  }

  delete() {
    this.dispatchEvent(new DeleteUserClicked(this.user));
  }

  render() {
    return html` ${when(
      this.editing,
      () => html`
        <td>${this.user.username}</td>
        <td>
          <input type="text" name="firstName" value="${this.user.firstName}" />
        </td>
        <td>
          <input type="text" name="lastName" value="${this.user.lastName}" />
        </td>
        <td>
          <input
            type="checkbox"
            name="enabled"
            ?checked="${this.user.enabled}"
          />
        </td>
        <td>
          <button type="button" @click="${this.cancelEdit}">Cancel</button>
          <button type="button" @click="${this.saveEdit}">Save</button>
        </td>
      `,
      () => html`
        <td>${this.user.username}</td>
        <td>${this.user.firstName}</td>
        <td>${this.user.lastName}</td>
        <td>${this.user.enabled}</td>
        <td>
          <button type="button" @click="${this.startEdit}">Edit</button>
          <button type="button" @click="${this.delete}">Delete</button>
          <button type="button" disabled>Reset Password</button>
        </td>
      `,
    )}`;
  }

  static get styles() {
    return css`
      :host {
        display: table-row;
      }
    `;
  }
}

window.customElements.define("usergrid-row", UsergridRow);
