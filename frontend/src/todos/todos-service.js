export class TodosService {

    getTodos(currentUser){
        return fetch('/api/todos', {
            headers: {
                'Authorization' : `Bearer ${currentUser.token}`,
                'Accept': 'application/json'
            }
        }).then(r => r.json())
    }

    updateTodo(currentUser, todo){
        return fetch('/api/todos/' + todo.id, {
            method: 'PUT',
            headers: {
                'Authorization' : `Bearer ${currentUser.token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(todo)
        });
    }

    deleteTodo(currentUser, todo){
        return fetch('/api/todos/' + todo.id, {
            method: 'DELETE',
            headers: {
                'Authorization' : `Bearer ${currentUser.token}`,
            }
        });
    }

    addTodo(currentUser, todo){
        return fetch('/api/todos' , {
            method: 'POST',
            headers: {
                'Authorization' : `Bearer ${currentUser.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(todo)
        });
    }


}