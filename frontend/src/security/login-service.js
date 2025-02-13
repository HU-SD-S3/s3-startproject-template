const currentUserKey = "current"


const storage = window.sessionStorage;

// alternatief: storage = window.localStorage;
function setItem(key, obj) {
    storage.setItem(key, JSON.stringify(obj));
}

function getItem(key, obj) {
    let result = storage.getItem(key, obj);
    if (result) {
        return JSON.parse(result);
    } else {
        return null;
    }
}

export class LoginService {
    constructor() {
    }

    get isLoggedIn() {
        return getItem(currentUserKey) != null;
    }

    get currentUser() {
        return getItem(currentUserKey);
    }

    login(user, password) {
        console.debug('login in service')
        if (!user) {
            throw new Error('username cannot be empty');
        }

        return fetch("/api/login", {
            method: "POST",
            body: JSON.stringify({
                username: user,
                password: password
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(r => r.json()).then(u => {
            if(u.error){
                throw new Error(u.message)
            }
            setItem(currentUserKey, u);
        });
    }

    register(registerData) {
        return fetch("/api/register", {
            method: "POST",
            body: JSON.stringify({
                username: registerData.username,
                password: registerData.password,
                firstName: registerData.firstname,
                lastName: registerData.lastname
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });
    }

    logout() {
        storage.removeItem(currentUserKey)
    }
}


export class FakeLoginService extends LoginService {
    login(user, password) {
        if (!user) {
            throw new Error('username cannot be empty');
        }

        return Promise.resolve({
            username: user,
            token: "abc123"
        }).then(u => {
            setItem(currentUserKey, u);
        });
    }

    register(registerData) {
        return Promise.resolve();
    }
}
