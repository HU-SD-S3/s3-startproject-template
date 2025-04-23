export class TodosCheckChanged extends Event {
    constructor(todo) {
        super('todos-check-changed', {
            bubbles: true,
            composed: true,
            cancelable: true
        });
        this.todo = todo;
    }
}