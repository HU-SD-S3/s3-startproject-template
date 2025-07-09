import {LitElement, css, html} from 'lit'
import litLogo from '../assets/lit.svg'
import viteLogo from '/vite.svg'
import {CounterService} from "../services/counter-service.js";

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
export class CounterElement extends LitElement {
    static get properties() {
        return {
            /**
             * The number of times the button has been clicked.
             */
            count: {type: Number},
        }
    }

    constructor() {
        super()
        this.counterService = new CounterService();
        this.count = 0
    }

    firstUpdated(_changedProperties) {
        this.counterService.getCount().then(result => {
            this.count = result.value
        });
    }

    render() {
        return html`
            <button @click=${this._onClick} part="button">
                count is ${this.count}
            </button>            
        `
    }

    _onClick() {
        this.counterService.increment().then(r => {
            this.count = r.value;
        })
    }

    static get styles() {
        return css`
            button {
                border-radius: 8px;
                border: 1px solid transparent;
                padding: 0.6em 1.2em;
                font-size: 1em;
                font-weight: 500;
                font-family: inherit;
                background-color: #1a1a1a;
                cursor: pointer;
                transition: border-color 0.25s;
            }

            button:hover {
                border-color: #646cff;
            }

            button:focus,
            button:focus-visible {
                outline: 4px auto -webkit-focus-ring-color;
            }

            @media (prefers-color-scheme: light) {               
                button {
                    background-color: #f9f9f9;
                }
            }
        `
    }
}

window.customElements.define('counter-element', CounterElement)
