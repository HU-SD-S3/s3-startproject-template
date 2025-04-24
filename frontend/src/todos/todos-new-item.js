import {css, html, LitElement} from "lit";
import {when} from "lit/directives/when.js";
import {TodoCompleted} from "./events.js";

export class TodosNewItem extends LitElement {
    static get properties() {
        return {
            editing: {type: Boolean, state: true},
        }
    }

    constructor() {
        super();
        this.editing = false;
    }

    render() {
        return html`
            ${when(this.editing,
                    () => html`
                        <input type="text"/> <span @click=${this.completeEdit} class="command accept">&#10004;</span>
                        <span @click=${this.cancelEdit} class="command cancel">&#10060;</span>
                    `,
                    () => html`
                        <span class="new" @click=${this.startEdit}>....</span>`)}
        `
    }

    startEdit() {
        this.editing = true;
    }

    cancelEdit() {
        this.editing = false;
    }

    completeEdit() {
        this.editing = false;
        let title = this.shadowRoot.querySelector('input[type="text"]').value;
        this.dispatchEvent(new TodoCompleted({title}))
    }

    static get styles() {
        return [
            css`
                .new {
                    cursor: pointer;
                }

                .command {
                    cursor: pointer;
                }

                .cancel {
                }
            `
        ]
    }
}

window.customElements.define('todos-new-item', TodosNewItem);