import {getCurrentUser} from "../login/login-service.js";

export default class UsergridService {
    constructor() {

    }

    get isAdminLoggedIn() {
        return getCurrentUser()?.username === "admin";
    }

    get #headers() {
        return {
            'Authorization': `Bearer ${getCurrentUser()?.token}`,
            "Content-Type": "application/json"
        }
    }

    getUsers() {
        if (!this.isAdminLoggedIn) {
            return Promise.reject(new Error("Not authorized"));
        }

        return fetch("api/users", {
            headers: this.#headers
        }).then(r => {
            if (r.ok) {
                return r.json();
            } else {
                return r.json().then(e => {
                    throw new Error(`Error fetchingusers: ${JSON.stringify(e)}`);
                })
            }
        });
    }

    getUser(id) {
        return fetch(`api/users/${id}`,{
            headers: this.#headers
        }).then(r => r.json());
    }

    createUser(user) {
        return fetch("api/users", {
            method: "POST",
            body: JSON.stringify(user),
            headers: this.#headers
        });
    }

    updateUser(user) {
        return fetch(`api/users/${user.id}`, {
            method: "PUT",
            body: JSON.stringify(user),
            headers: this.#headers
        }).then(r => r.json());
    }

    deleteUser(id) {
        return fetch(`api/users/${id}`, {
            method: "DELETE",
            headers: this.#headers,
        });
    }


}