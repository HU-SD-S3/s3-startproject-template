export class TodosModel {
  constructor(todos = []) {
    this.todos = todos;
  }

  addTodo(todo) {
    this.todos.push(todo);
  }

  /*eslint no-magic-numbers: ["error", { "ignore": [-1, 0] }]*/

  toggleCompleted(targetTodo) {
    const index = this.todos.findIndex((todo) => todo.id === targetTodo.id);
    if (index !== -1) {
      this.todos[index].completed = !targetTodo.completed;
    }
  }

  get allCompleted() {
    return this.todos.every((todo) => todo.completed) && this.todos.length > 0;
  }
}
