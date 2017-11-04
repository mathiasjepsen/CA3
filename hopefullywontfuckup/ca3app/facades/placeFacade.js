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
            console.log("places", places)
            this._places = places
            if (this._placeHandler) {
                this._placeHandler(places)
            }
        })
           
    }
}

let placeFacade = new PlaceFacade()
export default placeFacade
