import { LitElement, css, html } from 'lit'
import huLogo from './assets/hu-logo.svg'

export class AppElement extends LitElement {
  static get properties() {
    return {
      title: { type: String },
    }
  }

  constructor() {
    super()
    this.title = "Dummy Title"    
  }

  render() {
    return html`
    <header>
      <img src=${huLogo} class="logo" alt="HU Logo"/><h1>${this.title}</h1>
    </header>    
    <section>
      <slot></slot>
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
