import React, { Component } from 'react'
import userFacade from '../facades/userFacade'
import placeFacade from '../facades/placeFacade'

export default class Places extends React.Component {
    constructor() {
        super();
        this.state = {
            places: []
        }
    }

    componentDidMount() {
        userFacade.setPlaceObserver(this.placesUpdater)
        placeFacade.setPlaceObserver(this.placesUpdater)
        userFacade.fetchPlaces()
    }

    placesUpdater = (places) => {
        this.setState({
            places
        })
    }

    sortByRating = ()=>{
        placeFacade.sortByRating(this.state.places)
    }

    sortByCity = ()=>{
        placeFacade.sortByCity(this.state.places)
    }

    sortByZip = ()=>{
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
                            return (
                                <tr key={index}>
                                    <td>
                                        {place.images}
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