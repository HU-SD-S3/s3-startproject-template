import { css, html, LitElement } from "lit";
import { classMap } from "lit/directives/class-map.js";
import { TodosCheckChanged } from "./events.js";

export class TodosItem extends LitElement {
  static get properties() {
    return {
      todo: { type: Object },
      strikeThrough: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.todo = {};
    this.strikeThrough = false;
  }

  firstUpdated(_changedProperties) {
    super.firstUpdated(_changedProperties);
    this.strikeThrough = this.todo.completed;
  }

  checkChanged(e) {
    this.todo.completed = e.target.checked;
    this.strikeThrough = this.todo.completed;
    this.dispatchEvent(new TodosCheckChanged(this.todo));
  }

  render() {
    return html` <input
        type="checkbox"
        @change=${this.checkChanged}
        ?checked="${this.todo.completed}"
      />
      <span class=${classMap({ strike: this.strikeThrough })}
        >${this.todo.title}</span
      >`;
  }

  static get styles() {
    return [
      css`
        .strike {
          text-decoration: line-through;
        }
      `,
    ];
  }
}

window.customElements.define("todos-item", TodosItem);
