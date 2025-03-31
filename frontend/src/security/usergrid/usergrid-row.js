import {css, html, LitElement} from "lit";
import {DeleteUserClicked} from "../events.js";

export class UsergridRow extends LitElement {
    static get properties() {
        return {
            user: {type: Object},
            editing: {type: Boolean}
        }
    }

    constructor() {
        super();
        this.user = {};
        this.editing = false;
    }

    delete(){
        this.dispatchEvent(new DeleteUserClicked(this.user))
    }

    render() {
        return html`<tr>
                <td>${this.user.username}</td>
                <td>${this.user.firstName}</td>
                <td>${this.user.lastName}</td>
                <td>${this.user.enabled}</td>
                <td>
                    <button type="button">Edit</button>
                    <button type="button" @click="${this.delete}">Delete</button>
                <button type="button" disabled>Reset Password</button>
            </td>
        </tr>`;
    }

    static get styles() {
        return css`
            :host {
                display: table-row;
            }
        `
    }
}



window.customElements.define('usergrid-row', UsergridRow)