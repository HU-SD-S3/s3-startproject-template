import {css, html, LitElement} from "lit";

export class TodosPage extends LitElement {

    static get styles(){
        return css`
        `
    }

    render() {
        return html`
        Todos`
    }
}

window.customElements.define('todos-page', TodosPage);