import {LoginService} from "../login/login-service.js";

export default class UsergridService {
    loginService = new LoginService();

    get isAdminLoggedIn(){
        return this.loginService.isLoggedIn && this.loginService.currentUser.username === "admin";
    }

    getUsers() {
        if(!this.isAdminLoggedIn){
            return Promise.reject(new Error("Not authorized"));
        }

        return fetch("api/users", {
            headers: {
                'Authorization': `Bearer ${this.loginService.currentUser.token}`
            }
        }).then(r => {
            if(r.ok){
                return r.json();
            }else{
                return r.json().then(e => {
                    throw new Error(`Error fetchingusers: ${JSON.stringify(e)}`);
                })
            }
        });
    }

    getUser(id) {
        return fetch(`api/users/${id}`).then(r => r.json());
    }

    createUser(user) {
        return fetch("api/users", {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json"
            }
        });
    }

    updateUser(user) {
        return fetch(`api/users/${user.id}`, {
            method: "PUT",
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(r => r.json());
    }

    deleteUser(id) {
        return fetch(`api/users/${id}`, {
            method: "DELETE"
        });
    }


}