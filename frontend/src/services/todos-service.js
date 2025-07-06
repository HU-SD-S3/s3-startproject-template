/* eslint class-methods-use-this: "off" */
// The current user is now passed as an argument, but that's quite plausible to change.
// with TodosService as a class any later changes will have less public API impact

export class TodosService {
  getTodos(currentUser) {
    return fetch("/api/todos", {
      headers: {
        Authorization: `Bearer ${currentUser.token}`,
        Accept: "application/json",
      },
    }).then((response) => response.json());
  }

  updateTodo(currentUser, todo) {
    return fetch(`/api/todos/${todo.id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${currentUser.token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });
  }

  deleteTodo(currentUser, todo) {
    return fetch(`/api/todos/${todo.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${currentUser.token}`,
      },
    });
  }

  addTodo(currentUser, todo) {
    return fetch("/api/todos", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${currentUser.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });
  }
}
