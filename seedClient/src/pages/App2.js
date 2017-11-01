import React, { Component } from 'react'
import pf from '../facades/placeFacade'

export default class App2 extends Component {
    
      constructor() {
        super();
        this.data ={places: [ { address:{city: "Toulon", zip: "a83140", street: "Avenue AA", location: "location"}, description:"this description" , rating: "5"},
        {  address:{city: "London", zip: "234e53", street: "Avenue CC", location: "location"}, description:"this description" , rating: "23"},
        { address:{city: "Barcelona", zip: "958ff35", street: "Avenue BB", location: "location"}, description:"this description" , rating: "4"},
        { address:{city: "Copenhagen", zip: "8aar5140", street: "Boulevard AA", location: "location"}, description:"this description" , rating: "444"}
        ]}
        console.log("constructor", this.data)
      }

      render() {
        console.log("this.data.places ",this.data.places)
          // var sortedbyRating = pf.sortByRating(this.data.places)
          // console.log("sortedbyRating", sortedbyRating)
          // var sortedbyCity = pf.sortByCity(this.data.places)
          // console.log("sortedbyCity", sortedbyCity)
          var sortedbyZip = pf.sortByZip(this.data.places)
          console.log("sortedbyZip", sortedbyZip)
        return (
          <div>
            <h2>test</h2>
          </div>
        )
      }
    }
    