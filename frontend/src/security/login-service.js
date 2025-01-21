const currentUserKey = "current"

export class LoginService {
    storage = window.sessionStorage;
    // alternatief: storage = window.localStorage;

    constructor(){        
    }

    #setItem(key, obj){
        this.storage.setItem(key, JSON.stringify(obj));   
    }

    #getItem(key, obj){
        let result = this.storage.getItem(key, obj);
        if(result){
            return JSON.parse(result);
        }else {
            return null;
        }
    }

    get isLoggedIn(){
        return this.#getItem(currentUserKey) != null;
    }

    get currentUser(){
        return this.#getItem(currentUserKey);
    }

    login(user, password){
        if(!user){
            throw new Error('username cannot be empty');
        }

        return Promise.resolve({
            name: user,
            token: "abc123"
        }).then(u => {
            this.#setItem(currentUserKey, u);
        });
    }

    register(registerData){
        return Promise.resolve();
    }

    logout(){
        this.storage.removeItem(currentUserKey)
    }
}