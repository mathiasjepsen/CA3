import React, { Component } from 'react'
import userFacade from '../facades/userFacade'

export default class Places extends React.Component {
    constructor() {
        super();
        this.state = {
            places: []
        }
    }

    componentDidMount() {
        userFacade.setPlaceObserver(this.placesUpdater)
        userFacade.fetchPlaces()
    }

    placesUpdater = (places) => {
        this.setState({
            places
        })
    }

    render() {
        return (
            <div>
                <h2>Beautiful places</h2>
                <table>
                    <thead>
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
                                        {place.ratings}
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