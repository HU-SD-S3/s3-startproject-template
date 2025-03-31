import {LitElement, css, html} from 'lit'
import {UserChanged} from "../events.js";
import {loginService} from "./login-service.js";

export class CurrentUserElement extends LitElement {
    static get properties() {
        return {
            registering: {type: Boolean},
            error: {type: String},
            currentUser: {type: Object, state: true}
        }
    }

    constructor() {
        super();
        this.username = "";
        this.error = "";
        this.loginService = loginService;
        this.currentUser = loginService.currentUser;
    }

    logout(e) {
        e.stopPropagation();

        this.error = "";
        this.loginService.logout();
        this.currentUser = this.loginService.currentUser;
        this.dispatchEvent(new UserChanged(this.currentUser));
    }

    navigateRegister(e) {
        e.stopPropagation();

        this.error = "";
        this.registering = true;
    }

    navigateLogin(e) {
        e.stopPropagation();

        this.error = "";
        this.registering = false;
    }

    login(e) {
        e.stopPropagation();

        this.error = "";
        this.loginService.login(e.username, e.password).then(() => {
            this.currentUser = this.loginService.currentUser;
            this.dispatchEvent(new UserChanged(this.currentUser));
        }).catch(e => {
            this.error = e.message;
        });
    }

    register(e) {
        this.loginService.register(e.data).then(() => {
            return this.loginService.login(e.data.username, e.data.password);
        }).then(() => {
            this.currentUser = this.loginService.currentUser;
            this.registering = false;
            this.dispatchEvent(new UserChanged(this.currentUser));
        })
    }

    render() {
        console.log("login-user", this.currentUser)
        console.log("login-service", this.loginService)
        console.log("login-service-user", this.loginService.currentUser)
        //Later behandelen we 'routing', wat een mooiere manier is om dit op te lossen.
        let error = html`<span class="error">${this.error}</span>`

        if (this.registering) {
            return html`
                ${error}
                <s3-register @attempt-register=${this.register} @request-login=${this.navigateLogin}></s3-register>`
        } else {
            return html`
                ${error}
                <s3-login @request-logout=${this.logout} @request-register=${this.navigateRegister}
                          @attempt-login=${this.login} username=${this.currentUser?.username}></s3-login>
            `
        }
    }

    static get styles() {
        return css`
            .error {
                color: var(--hu-red)
            }
        `
    }
}

window.customElements.define('s3-currentuser', CurrentUserElement)
