import { css, html, LitElement } from "lit";
import { TodosService } from "../../services/todos-service.js";
import { repeat } from "lit/directives/repeat.js";
import { TodosModel } from "./todos-model.js";
import { when } from "lit/directives/when.js";

export class TodosList extends LitElement {
  static get properties() {
    return {
      currentUser: { type: Object },
      model: { type: Array, state: true },
    };
  }

  constructor() {
    super();
    this.model = new TodosModel();
    this.currentUser = {};
    this.todosService = new TodosService();
  }

  #refresh() {
    return this.todosService.getTodos(this.currentUser).then((todos) => {
      this.model = new TodosModel(todos);
    });
  }

  updated(changedProperties) {
    if (changedProperties.has("currentUser")) {
      this.#refresh();
    }
  }

  deleteTodo(todo) {
    return () => {
      this.todosService
        .deleteTodo(this.currentUser, todo)
        .then(() => this.#refresh());
    };
  }

  todoChanged(todo) {
    return () => {
      this.todosService
        .updateTodo(this.currentUser, todo)
        .then(() => this.#refresh());
    };
  }

  createTodo(event) {
    this.todosService
      .addTodo(this.currentUser, event.todo)
      .then(() => this.#refresh());
  }

  render() {
    return html`
      <h2>Todos</h2>
      ${when(this.model.allCompleted, () => html`<h3>All Done</h3>`)}
      <ul>
        ${repeat(
          this.model.todos,
          (todo) => todo.id,
          (todo) =>
            html` <li>
              <todos-item
                @todos-check-changed=${this.todoChanged(todo)}
                .todo=${todo}
              ></todos-item>
              <span @click=${this.deleteTodo(todo)} class="command cancel"
                >&#10060;</span
              >
            </li>`,
        )}
        <li>
          <todos-new-item @todos-completed=${this.createTodo}></todos-new-item>
        </li>
      </ul>
    `;
  }

  static get styles() {
    return [
      css`
        ul {
          list-style: none;
        }

        .command {
          cursor: pointer;
        }
      `,
    ];
  }
}

window.customElements.define("todos-list", TodosList);
