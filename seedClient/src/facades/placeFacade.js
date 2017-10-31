

class placeFacade {

    sortByRating = (props) => {
       var oldArray = props;
       var sortedArray = oldArray.sort(compareRating);
       return sortedArray;
    }
}

function compareRating(a,b) {
    if (parseInt(a.rating) < parseInt(b.rating))
      return -1;
    if (parseInt(a.rating) > parseInt(b.rating))
      return 1;
    return 0;
  }

let pf = new placeFacade();

export default pf;
