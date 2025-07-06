/* eslint max-classes-per-file: "off" */
/* eslint class-methods-use-this: "off" */
// The getItem/setItem functions are encapsulated in the module and used across two classses
// Eslint rrrreaally does not like this, but I'm not sure I agree.

const currentUserKey = "current";
const storage = window.sessionStorage;
// alternatief: storage = window.localStorage;

const setItem = function (key, obj) {
  storage.setItem(key, JSON.stringify(obj));
};

const getItem = function (key, obj) {
  const result = storage.getItem(key, obj);
  if (result) {
    return JSON.parse(result);
  }
  return null;
};

class LoginService {
  get isLoggedIn() {
    return getItem(currentUserKey) !== null;
  }

  get currentUser() {
    return getItem(currentUserKey);
  }

  login(user, password) {
    if (!user) {
      throw new Error("username cannot be empty");
    }

    return fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({
        username: user,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((loginResult) => {
        if (loginResult.error) {
          throw new Error(loginResult.message);
        }
        setItem(currentUserKey, loginResult);
      });
  }

  register(registerData) {
    return fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({
        username: registerData.username,
        password: registerData.password,
        firstName: registerData.firstname,
        lastName: registerData.lastname,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  logout() {
    storage.removeItem(currentUserKey);
  }
}

/* eslint no-unused-vars: "off" */
class FakeLoginService extends LoginService {
  login(user) {
    if (!user) {
      throw new Error("username cannot be empty");
    }

    return Promise.resolve({
      username: user,
      token: "abc123",
    }).then((loginResult) => {
      setItem(currentUserKey, loginResult);
    });
  }

  register() {
    return Promise.resolve();
  }
}

export const loginService = new LoginService();
export const getCurrentUser = () => loginService.currentUser;
