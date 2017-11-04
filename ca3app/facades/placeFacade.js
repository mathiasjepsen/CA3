const URL = require("../package.json").serverURL

class PlaceFacade {
    constructor() {
        this._places = ""
    }

    setPlaceObserver = (handler) => {
        this._placeHandler = handler
    }

    fetchPlaces = () => {
        fetch(URL + 'api/all/places')
            .then((res) => {
                return res.json()
            })
            .then((places) => {
                this._places = places
                if (this._placeHandler) {
                    this._placeHandler(places)
                }
            })
            .catch(function (error) {
                console.log('There has been a problem with your fetch operation: ' + error.message);
                throw error;
            });
    }
}

let placeFacade = new PlaceFacade()
export default placeFacade
