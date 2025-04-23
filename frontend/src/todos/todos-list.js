import {css, html, LitElement} from "lit";
import {TodosService} from "./todos-service.js";
import {map} from "lit/directives/map.js";

export class TodosList extends LitElement {
    static get properties() {
        return {
            currentUser: { type: Object },
            todos: {type: Array, state: true}
        }
    }

    constructor() {
        super();
        this.todos = [];
        this.currentUser = {};
        this.todosService = new TodosService();
    }

    #refresh() {
        return this.todosService.getTodos(this.currentUser).then(todos => {
            this.todos = todos;
        })
    }

    updated(changedProperties) {
        if(changedProperties.has('currentUser')){
            this.#refresh();
        }
    }

    todoChanged(todo) {
        return (e) => {
            this.todosService.updateTodo(this.currentUser, todo).then(() => this.#refresh());
        };
    }

    render() {
        return html`
            <h2>Todos</h2>
            <ul>
                ${map(this.todos, todo => html`
                    <li>
                        <todos-item 
                                @todos-check-changed=${this.todoChanged(todo)}
                                .todo=${todo}></todos-item>
                    </li>`)}
                <li><span class="new">....</span></li>
            </ul>
        `;
    }

    static get styles() {
        return [
            css`
               ul {
                   list-style: none;
               }
                
                .new {
                    cursor: pointer;
                }
            `
        ]
    }

}

window.customElements.define('todos-list', TodosList);