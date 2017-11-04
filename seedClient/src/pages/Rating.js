import React, { Component } from 'react';
import userFacade from '../facades/userFacade';
import auth from '../authorization/auth'

export default class Rating extends React.Component {
    constructor(props) {
        super(props)
        this.user = auth._userName;
        this.placeId = this.props.match.params.id;
        this.state = {
            place:"", 
            user:auth._userName    
        }
    }

    componentDidMount() {
        userFacade.setRatingObserver(this.handleFetchPlace)
        this.place = userFacade.fetchPlace(this.placeId)
    }

    handleFetchPlace =(place) =>{
        this.setState({place})
        console.log("fetch the place", this.state)
    }


    handleChange = (e) => {
        var value = parseInt(e.target.value);
        var user = this.state.user;
        var newRating = {[user]:value};
        var obj = Object.assign({}, this.state.place.ratings, newRating);
        var newPlace = this.state.place;
        newPlace.ratings = obj;
        this.setState({place:newPlace});
        console.log("new state after change", this.state)
    }

    handleSubmit = (event) => {
        event.preventDefault()
        userFacade.addRating(this.state.place);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    rate the place
                </label>
                <input type="text" name="rating" onChange={this.handleChange} />                
                <input type="submit" value="Submit" />
            </form>
        )
        //        }
    }
}