import {LitElement, css, html} from 'lit'
import {map} from 'lit/directives/map.js';
import UsergridService from "../../../services/usergrid-service.js";

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

    #refresh(){
        return this.gridService.getUsers().then(users => {
            this.users = users;
        }).catch(e => {
            this.users = [];
        })
    }

    updated(_changedProperties) {
        if(_changedProperties.has('currentUser')){
            return this.#refresh();
        }
    }

    delete(e){
        this.gridService.deleteUser(e.user.username).then(() => this.#refresh());
    }

    save(e){
        this.gridService.updateUser(e.user).then(() => this.#refresh());
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
                        <usergrid-row .user="${u}"
                                      @user-save="${this.save}"
                                      @user-delete="${this.delete}"></usergrid-row>
                    `)}
                    </tbody>
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
