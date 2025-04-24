import {css, html, LitElement} from "lit";
import {TodosService} from "./todos-service.js";
import {map} from "lit/directives/map.js";
import {repeat} from "lit/directives/repeat.js";

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

    deleteTodo(todo) {
        return (e) => {
            this.todosService.deleteTodo(this.currentUser, todo).then(() => this.#refresh());
        }
    }

    todoChanged(todo) {
        return (e) => {
            this.todosService.updateTodo(this.currentUser, todo).then(() => this.#refresh());
        };
    }

    createTodo(e) {
        this.todosService.addTodo(this.currentUser, e.todo).then(() => this.#refresh());
    }

    render() {
        return html`
            <h2>Todos</h2>
            <ul>
                ${repeat(this.todos, t => t.id,  todo => html`
                    <li>
                        <todos-item 
                                @todos-check-changed=${this.todoChanged(todo)}
                                .todo=${todo}></todos-item> <span @click=${this.deleteTodo(todo)} class="command cancel">&#10060;</span>
                    </li>`)}
                <li><todos-new-item @todos-completed=${this.createTodo}></todos-new-item></li>
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
            `
        ]
    }

}

window.customElements.define('todos-list', TodosList);