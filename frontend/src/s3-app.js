import { LitElement, css, html } from 'lit'
import huLogo from './assets/hu-logo.svg'
import {LoginService} from "./security/login/login-service.js";

export class AppElement extends LitElement {
  static get properties() {
    return {
      title: { type: String },
      currentUser: { type: Object, state: true }
    }
  }

  constructor() {
    super()
    this.loginService = new LoginService();
    this.title = "Dummy Title";
    this.currentUser = this.loginService.currentUser;
  }

  userChanged(e){
    this.currentUser = e.user;
  }

  render() {
    return html`
    <header>
      <img src=${huLogo} class="logo" alt="HU Logo"/><h1>${this.title}</h1>
    </header>    
    <section>
      <s3-usergrid .currentUser="${this.currentUser}"></s3-usergrid>
      <s3-currentuser @user-changed="${this.userChanged}" .login-service="${this.loginService}"></s3-currentuser>
    </section>
    `
  }

  static get styles() {
    return css`
      :host {
        max-width: 1280px;
        margin: 0 auto;
        padding: 2rem;
        text-align: center;
      }
      
      .logo {
        height: 6em;
        padding: 1.5em;
      }
    `
  }
}

window.customElements.define('s3-app', AppElement)
