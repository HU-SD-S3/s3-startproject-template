import { getCurrentUser } from "./login-service.js";

/* eslint class-methods-use-this: "off" */
// getCurrentUser is now a function import, but that's quite plausible to change.
// with UserGridService as a class any later changes will have less public API impact

export default class UsergridService {
  static get isAdminLoggedIn() {
    return getCurrentUser()?.username === "admin";
  }

  static get #headers() {
    return {
      Authorization: `Bearer ${getCurrentUser()?.token}`,
      "Content-Type": "application/json",
    };
  }

  getUsers() {
    if (!UsergridService.isAdminLoggedIn) {
      return Promise.reject(new Error("Not authorized"));
    }

    return fetch("api/users", {
      headers: UsergridService.#headers,
    }).then((response) => {
      if (response.ok) {
        return response.json();
      }
      return response.json().then((event) => {
        throw new Error(`Error fetchingusers: ${JSON.stringify(event)}`);
      });
    });
  }

  getUser(id) {
    return fetch(`api/users/${id}`, {
      headers: UsergridService.#headers,
    }).then((resp) => resp.json());
  }

  createUser(user) {
    return fetch("api/users", {
      method: "POST",
      body: JSON.stringify(user),
      headers: UsergridService.#headers,
    });
  }

  updateUser(user) {
    return fetch(`api/users/${user.username}`, {
      method: "PUT",
      body: JSON.stringify(user),
      headers: UsergridService.#headers,
    }).then((resp) => resp.json());
  }

  deleteUser(id) {
    return fetch(`api/users/${id}`, {
      method: "DELETE",
      headers: UsergridService.#headers,
    });
  }
}
