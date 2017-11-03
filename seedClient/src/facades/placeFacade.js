
import fetchHelper, { errorChecker } from "./fetchHelpers"
const URL = require("../../package.json").serverURL;

class placeFacade {

  createLocation = (place) => {
    fetch(URL + 'api/all', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            description: place.description,
            image: place.image,
            address: place.address
        })
    })
}

  setPlaceObserver = (handler) =>{
    this._handler = handler;
  }
  
      sortByRating = (props) => {
         let oldArray = props;
         let sortedArray = oldArray.sort(compareRating);
         this._handler(sortedArray);
      }
  
      sortByCity = (props) =>{
        let oldArray = props;
        let sortedArray = oldArray.sort(compareCity);
        this._handler(sortedArray);
      }
  
      sortByZip = (props) =>{
        let oldArray = props;
        let sortedArray = oldArray.sort(compareZip);
        this._handler(sortedArray);
      }
  }
  
  function compareRating(a,b) {
      if (parseInt(a.rating) > parseInt(b.rating))
        return -1;
      if (parseInt(a.rating) < parseInt(b.rating))
        return 1;
      return 0;
    }
  
    function compareCity(a,b) {
      if (a.address.city < b.address.city)
        return -1;
      if (a.address.city > b.address.city)
        return 1;
      return 0;
    }
  
    function compareZip(a,b) {
      if (a.address.zip < b.address.zip)
        return -1;
      if (a.address.zip > b.address.zip)
        return 1;
      return 0;
    }
  
  let pf = new placeFacade();
  
  export default pf;
  
