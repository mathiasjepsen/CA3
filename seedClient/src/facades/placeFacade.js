import fetchHelper, { errorChecker } from "./fetchHelpers"
import React from 'react';
const URL = require("../../package.json").serverURL

class placeFacade extends React.Component {
    createLocation = (place, data) => {
        const options = fetchHelper.makeOptions("POST", true);
        fetch(URL + 'api/user/createlocation', {
            method: 'POST',
            headers: options.headers,
            body: JSON.stringify({
                description: place.description,
                image: place.image,
                address: {
                    city: place.address.city,
                    zip: place.address.zip,
                    street: place.address.street,
                    location: place.address.location
                },
                ratings: {
                    "lovro": 3.0
                }
            })
        }).then((res) => {
            return res.json()
        }).then((place) => {
            this.saveImage(data)
        })
    }

    saveImage = (data) => {
        const options = fetchHelper.makeOptions("POST");
        fetch(URL + 'api/upload/file', {
            method: 'POST',
            body: data
        })
    }

    setPlaceObserver = (handler) => {
        this._handler = handler;
    }

    sortByRating = (props) => {
        let oldArray = props;
        let sortedArray = oldArray.sort(compareRating);
        this._handler(sortedArray);
    }

    sortByCity = (props) => {
        let oldArray = props;
        let sortedArray = oldArray.sort(compareCity);
        this._handler(sortedArray);
    }

    sortByZip = (props) => {
        let oldArray = props;
        let sortedArray = oldArray.sort(compareZip);
        this._handler(sortedArray);
    }
}
function compareRating(a, b) {
    if (parseInt(a.rating) > parseInt(b.rating))
        return -1;
    if (parseInt(a.rating) < parseInt(b.rating))
        return 1;
    return 0;
}

function compareCity(a, b) {
    if (a.address.city < b.address.city)
        return -1;
    if (a.address.city > b.address.city)
        return 1;
    return 0;
}

function compareZip(a, b) {
    if (a.address.zip < b.address.zip)
        return -1;
    if (a.address.zip > b.address.zip)
        return 1;
    return 0;
}


let pf = new placeFacade();

export default pf;

