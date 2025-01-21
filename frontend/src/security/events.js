export class LogoutRequested extends Event {
    constructor(){
        super("request-logout", {
            bubbles: true, 
            composed: true
        });
    }
}

export class LoginAttempted extends Event {
    constructor(username, password){
        super("attempt-login", {
            bubbles: true,
            composed: true
        });
        this.username = username;
        this.password = password;        
    }
}

export class RegisterAttempted extends Event {
    constructor(registerData){
        super("attempt-register", {
            bubbles: true,
            composed: false
        });

        this.data = registerData;
    }
}

export class RegisterRequested extends Event {
    constructor(){
        super("request-register", {
            bubbles: true,
            composed: true
        });
    }
}

export class LoginRequested extends Event {
    constructor(){
        super("request-login", {
            bubbles: true,
            composed: true
        });
    }
}