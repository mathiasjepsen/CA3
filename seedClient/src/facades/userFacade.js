import fetchHelper, { errorChecker } from "./fetchHelpers"
const URL = require("../../package.json").serverURL;

class UserStore {
    constructor() {
        this._data = "";
        this._errorMessage = "";
        this._places = ""
    }

    setPlaceObserver = (handler) => {
        this._placeHandler = handler
    }

    setRatingObserver = (handler) => {
        this._ratingHandler = handler
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

    fetchPlaces = () => {
        const options = fetchHelper.makeOptions("GET", true);
        fetch(URL + 'api/all/places', options)
            .then((res) => {
                return res.json()
            })
            .then((places) => {
                this._places = places
                if (this._placeHandler) {
                    this._placeHandler(places)
                }
            })

    }

    fetchPlace = (id) => {
        const options = fetchHelper.makeOptions("GET", true);
        fetch(URL + 'api/user/' + id, options)
            .then((res) => {
                return res.json()
            })
            .then((place) => {
                this._place = place
                if (this._ratingHandler) {
                    this._ratingHandler(place)
                }
            })
    }

    addRating = (place) => {
        console.log("place in addRating", place)
        fetch(URL + 'api/user/rating', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({place})
        }
    // ). does it make sense to update state in Places component, since it is not what is rendered here. 
    //             then((res) => {
    //                 return res.json()
    //             })
    //             .then((places) => {
    //                 this._places = places
    //                 if (this._placeHandler) {
    //                     this._placeHandler(places)
    //                 }
    //             }
    )}
}

let userStore = new UserStore();

//Only for debugging
//window.userStore = userStore;
export default userStore;
