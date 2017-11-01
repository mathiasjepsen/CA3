

class placeFacade {

    sortByRating = (props) => {
       let oldArray = props;
       let sortedArray = oldArray.sort(compareRating);
       return sortedArray;
    }

    sortByCity = (props) =>{
      let oldArray = props;
      let sortedArray = oldArray.sort(compareCity);
      return sortedArray;
    }

    sortByZip = (props) =>{
      let oldArray = props;
      let sortedArray = oldArray.sort(compareZip);
      return sortedArray;
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
