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

export class TodoCompleted extends  Event {
    constructor(todo) {
        super('todos-completed', {
            bubbles: true,
            composed: true,
            cancelable: true
        });
        this.todo = todo;
    }
}