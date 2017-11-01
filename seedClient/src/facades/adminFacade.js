import fetchHelper, { errorChecker } from "./fetchHelpers"
const URL = require("../../package.json").serverURL;


class AdminStore {
    constructor() {
        this._data = "";
        this._errorMessage = "";
        this._users = ""
    }

    setUsersObserver = (handler) => {
        this._usersHandler = handler
    }

    getData = (cb) => {
        this._errorMessage = "";
        this._messageFromServer = "";
        let resFromFirstPromise = null;  //Pass on response the "second" promise so we can read errors from server
        const options = fetchHelper.makeOptions("GET", true);
        fetch(URL + "api/demoadmin", options)
            .then((res) => {
                resFromFirstPromise = res;
                return res.json();
            }).then((data) => {
                errorChecker(resFromFirstPromise, data);
                if (cb) {
                    cb(null, data.message)
                }
            }).catch(err => {
                if (cb) {
                    cb({ err: fetchHelper.addJustErrorMessage(err) })
                }
            })
    }

    getAllUsers = () => {
        const options = fetchHelper.makeOptions("GET", true);
        fetch(URL + "api/admin/allUsers", options)
            .then((res) => res.json())
            .then((users) => {
                this._users = users
                if (this._usersHandler) {
                    this._usersHandler(users)
                }
            })
    }

    addUser = (user) => {
        const options = fetchHelper.makeOptions("POST", true);
        fetch(URL + "api/admin/user", {
            method: 'POST',
            headers: options.headers,
            body: JSON.stringify({
                userName: user.username,
                passwordHash: user.password,
                fName: user.fName,
                lName: user.lName,
                phone: user.phone,
                email: user.email,
                roles: [{ roleName: user.roles[0] }]
            })
        }).then(() => {
            this.getAllUsers()
        })
    }

    deleteUser = (username) => {
        const options = fetchHelper.makeOptions("DELETE", true);
        fetch(URL + "api/admin/" + username, {
            method: 'DELETE',
            headers: options.headers
        }).then(() => {
            this.getAllUsers()
        })
    }

    editUser = (user) => {
        const options = fetchHelper.makeOptions("PUT", true);
        fetch(URL + "api/admin", {
            method: 'PUT',
            headers: options.headers,
            body: JSON.stringify({
                userName: user.username,
                passwordHash: user.password,
                fName: user.fName,
                lName: user.lName,
                phone: user.phone,
                email: user.email,
                roles: [{ roleName: user.roles[0] }]
            })
        }).then(() => {
            this.getAllUsers()
        })
    }
}

let adminStore = new AdminStore();

//Only for debugging
//window.userStore = userStore;
export default adminStore;