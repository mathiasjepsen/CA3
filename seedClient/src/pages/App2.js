import React, { Component } from 'react'
import pf from '../facades/placeFacade'

export default class App2 extends Component {
    
      constructor() {
        super();
        this.data ={places: [ {rating: "5"},
        { rating: "23"},
        {rating: "4"},
        {rating: "444"}
        ]}
        console.log("constructor", this.data)
      }

      render() {
        console.log("this.data.places ",this.data.places)
          var sortedArray = pf.sortByRating(this.data.places)
          console.log("new Array", sortedArray)
        return (
          <div>
            <h2>test</h2>
          </div>
        )
      }
    }
    