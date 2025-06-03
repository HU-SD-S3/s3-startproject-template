export class TodosModel {
    constructor(todos = []) {
        this.todos = todos;
    }

    addTodo(todo) {
        this.todos.push(todo);
    }

    toggleCompleted(todo) {
        const index = this.todos.findIndex(t => t.id === todo.id);
        if (index !== -1) {
            this.todos[index].completed = !todo.completed;
        }
    }

    get allCompleted() {
        return this.todos.every(todo => todo.completed) && this.todos.length > 0;
    }
}