import fetchHelper, { errorChecker } from "./fetchHelpers"
const URL = require("../../package.json").serverURL;

class UserStore {
    constructor() {
        this._data = "";
        this._errorMessage = "";
    }

    getData = (cb) => {
        this._errorMessage = "";
        this._messageFromServer = "";
        let resFromFirstPromise = null;  //Pass on response the "second" promise so we can read errors from server
        const options = fetchHelper.makeOptions("GET", true);
        fetch(URL + "api/demouser", options)
            .then((res) => {
                resFromFirstPromise = res;
                return res.json();
            }).then((data) => {
                errorChecker(resFromFirstPromise, data);
                if (cb) {
                    cb(null, data.message)
                }
            }).catch(err => {
                console.log(JSON.stringify(err))
                if (cb) {
                    cb({ err: fetchHelper.addJustErrorMessage(err) })
                }
            })
    }

    signUp = (user) => {
        fetch(URL + 'api/all', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userName: user.username,    
                passwordHash: user.password,                
                fName: user.firstname,
                lName: user.lastname,
                phone: user.phone,
                email: user.email
            })
        })
    }
}

let userStore = new UserStore();

//Only for debugging
//window.userStore = userStore;
export default userStore;
