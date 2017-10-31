import React, { Component } from 'react'
import pf from '../facades/placeFacade'

export default class App2 extends Component {
    
      constructor() {
        super();
        const data ={places: [ {address: {city: 'Toulon', zip: "1111", street: "aa", location: "aa"}, rating: "3"},
        {address: {city: 'Marseille', zip: "22222", street: "bb", location: "bb"}, rating: "2"},
        {address: {city: 'Paris', zip: "3333", street: "cc", location: "cc"}, rating: "1"},
        {address: {city: 'Londres', zip: "44444", street: "dd", location: "dd"}, rating: "4"}
        ]}
      }

      render() {
        console.log("obj ",this.data)
        console.log("obj.places ",this.data.places)
          var sortedArray = pf.sortByRating(data.places)
          console.log("new Array", sortedArray)
        return (
          <div>
            <h2>test</h2>
          </div>
        )
      }
    }
    