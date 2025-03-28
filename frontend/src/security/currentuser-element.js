import { LitElement, css, html } from 'lit'
import { LoginService } from './login/login-service.js';
// import { FakeLoginService as LoginService } from './login-service'; //Voor nu is dit uncommenten genoeg om de login te faken

export class CurrentUserElement extends LitElement {
    static get properties() {
        return {
            registering: { type: Boolean },
            error: { type: String },
            currentUser: { type: Object, state: true }
        }
    }

    constructor() {
        super();
        this.username = "";
        this.error = "";
        this.loginService = new LoginService();
        this.currentUser = this.loginService.currentUser;        
    }

    logout(){
        this.error = "";
        this.loginService.logout();
        this.currentUser = this.loginService.currentUser;
    }

    navigateRegister(){
        this.error = "";
        this.registering = true;
    }

    navigateLogin(){
        this.error = "";
        this.registering = false;
    }

    login(e){
        this.error = "";
        this.loginService.login(e.username, e.password).then(() => {
            this.currentUser = this.loginService.currentUser;
        }).catch(e => {
            this.error = e.message;
        });
    }

    register(e){
        this.loginService.register(e.data).then(()=>{
            return this.loginService.login(e.data.username, e.data.password)
        }).then(()=>{
            this.registering = false;
            this.currentUser = this.loginService.currentUser;
        })
    }

    render() {
        //Later behandelen we 'routing', wat een mooiere manier is om dit op te lossen.
        let error = html`<span class="error">${this.error}</span>`

        if (this.registering) {
            return html`
                ${error}
                <s3-register @attempt-register=${this.register} @request-login=${this.navigateLogin}></s3-register>`
        } else {            
            return html`
                ${error}
                <s3-login @request-logout=${this.logout} @request-register=${this.navigateRegister} @attempt-login=${this.login} username=${this.currentUser?.username}></s3-login>
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
