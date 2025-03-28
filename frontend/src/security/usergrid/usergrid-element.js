import {LitElement, css, html} from 'lit'
import {map} from 'lit/directives/map.js';
import UsergridService from "./usergrid-service.js";


export class UsergridElement extends LitElement {
    static get properties() {
        return {
            currentUser: { type: Object },
            users: {type: Object, state: true}
        }
    }

    constructor() {
        super();
        this.users = [];
        this.currentUser = {};
        this.gridService = new UsergridService();
    }

    connectedCallback() {
        super.connectedCallback();
    }

    updated(_changedProperties) {
        if(_changedProperties.has('currentUser')){
            return this.gridService.getUsers().then(users => {
                this.users = users;
            }).catch(e => {
                this.users = [];
            })
        }
    }

    render() {
        if (this.currentUser?.username === "admin") {
            return html`
                <table>
                    <thead>
                    <tr>
                        <td>Username</td>
                        <td>Firstname</td>
                        <td>Lastname</td>
                        <td>Enabled</td>
                        <td>Actions</td>
                    </tr>
                    </thead>
                    <tbody>
                    ${map(this.users, u => html`
                        <td>${u.username}</td>
                        <td>${u.firstName}</td>
                        <td>${u.lastName}</td>
                        <td>${u.enabled}</td>
                        <td>
                            <button type="button">Edit</button>
                            <button type="button">Delete</button>
                        </td>
                    `)}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colspan="5">
                                <button type="button">New</button>        
                            </td>
                        </tr>                        
                    </tfoot>
                </table>
            `;
        }else {
            return html`Only available for admins`
        }
    }

    static get styles() {
        return css`
        `
    }
}

window.customElements.define('s3-usergrid', UsergridElement)
