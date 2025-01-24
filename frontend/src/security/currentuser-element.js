import { LitElement, css, html } from 'lit'
import { LoginService } from './login-service';

export class CurrentUserElement extends LitElement {
    static get properties() {
        return {
            registering: { type: Boolean },
            currentUser: { type: Object, state: true }
        }
    }

    constructor() {
        super();
        this.username = "";
        this.loginService = new LoginService();
        this.currentUser = this.loginService.currentUser;        
    }

    logout(){
        this.loginService.logout();
        this.currentUser = this.loginService.currentUser;
    }

    navigateRegister(){
        this.registering = true;
    }

    navigateLogin(){
        this.registering = false;
    }

    login(e){
        console.debug("Logging in, in CurrentUserElement")
        this.loginService.login(e.username, e.password).then(() => {
            this.currentUser = this.loginService.currentUser;
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
        if (this.registering) {
            return html`<s3-register @attempt-register=${this.register} @request-login=${this.navigateLogin}></s3-register>`
        } else {
            if (this.currentUser) {
                return html`
                <s3-login @request-logout=${this.logout} @request-register=${this.navigateRegister} @attempt-login=${this.login} username=${this.currentUser.name}></s3-login>
                `
            } else {
                return html`
                <s3-login @request-logout=${this.logout} @request-register=${this.navigateRegister} @attempt-login=${this.login}></s3-login>
            `
            }
        }
    }

    static get styles() {
        return css`
    `
    }
}

window.customElements.define('s3-currentuser', CurrentUserElement)
