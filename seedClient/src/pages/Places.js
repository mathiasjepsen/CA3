import React, { Component } from 'react';
import userFacade from '../facades/userFacade';
import placeFacade from '../facades/placeFacade';
import Rating from './Rating'
import auth from '../authorization/auth'
import { NavLink, Route } from 'react-router-dom';

export default class Places extends React.Component {
    constructor() {
        super();
        this.state = {
            places: [],
            userName: auth.userName
        }
    }

    componentDidMount() {
        placeFacade.setPlaceObserver(this.placesUpdater)
        userFacade.fetchPlaces()
        console.log("componentDid mount userName", this.state.userName)
    }

    placesUpdater = (places) => {
        this.setState({
            places
        })
    }

    sortByRating = () => {
        placeFacade.sortByRating(this.state.places)
    }

    sortByCity = () => {
        placeFacade.sortByCity(this.state.places)
    }

    sortByZip = () => {
        placeFacade.sortByZip(this.state.places)
    }


    render() {
        return (
            <div>
                <h2>Beautiful places</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>City</th>
                            <th>Zip Code</th>
                            <th>Street</th>
                            <th>Location</th>
                            <th>Description</th>
                            <th>Rating</th>
                            <th><button onClick={this.sortByRating}>Sort by rating</button></th>
                            <th><button onClick={this.sortByCity}>Sort by City</button></th>
                            <th><button onClick={this.sortByZip}>Sort by Zip</button></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.places.map((place, index) => {
                            var x = Object.keys(place.ratings);
                            console.log("x in places ",x);
                            var alreadyRated = x.indexOf(this.state.userName)
                            console.log("index ", alreadyRated)
                            return (
                                <tr key={index}>
                                    <td>
                                        <img src={place.image} style={{ width: 50, height: 50}} />
                                    </td>
                                    <td>
                                        {place.address.city}
                                    </td>
                                    <td>
                                        {place.address.zip}
                                    </td>
                                    <td>
                                        {place.address.street}
                                    </td>
                                    <td>
                                        {place.address.location}
                                    </td>
                                    <td>
                                        {place.description}
                                    </td>
                                    <td>
                                        {place.rating}
                                    </td>
                                    <td> {this.state.userName !== "" && alreadyRated===-1 &&
                                        <NavLink to={`/rate/${place.id}`}>rate this place</NavLink>
                                    }
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}



/*
const PlaceDetails = (props) => {

    const place = props.places[props.match.params.index]
    return (
        <div>
            <table>
                <thead>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            City:
            {place.city}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Zip Code:
            {place.zip}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Street Name:
            {place.street}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Location:
            {place.location}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
*/