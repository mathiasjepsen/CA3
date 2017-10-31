import fetchHelper, { errorChecker } from "./fetchHelpers"
const URL = require("../../package.json").serverURL;


class AdminStore {
    constructor() {
        this._data = "";
        this._errorMessage = "";
    }

    setUserObserver = (handler) => {
        this._userHandler = handler
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
                if (this._userHandler) {
                    this._userHandler(users)
                }
            })
    }

    deleteUser = (username) => {
        const options = fetchHelper.makeOptions("DELETE", true);
        console.log("options", options)
        fetch(URL + "api/admin/" + username, {
            method: 'DELETE',
            headers: options.headers
        }).then(() => {
            this.getAllUsers()
        })
    }
}

let adminStore = new AdminStore();

//Only for debugging
//window.userStore = userStore;
export default adminStore;