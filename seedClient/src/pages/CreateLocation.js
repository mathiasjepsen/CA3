import React, { Component } from 'react'
import placeFacade from '../facades/placeFacade'
 import auth from "../authorization/auth";
 import upload from "./Upload"

class CreateLocation extends Component {
    constructor() {
        super();
        this.state = {city: "", zip: "", location: "", street:"", description:"", image:""}
    }

    handleSubmit = (event) => {
        event.preventDefault()
      const place = {
            address: {
              city: this.state.city,
              zip: this.state.zip,
              street: this.state.street,
              location: this.state.location,
          },
       description: this.state.description,
       image: this.state.image
      }
        placeFacade.createLocation(place)
    }
    
    onChange = (e) => {
   this.setState({
       [e.target.id] : e.target.value
   })
    }

    render() {
        return (
            <div className="container">
                <form className="form-signin" onSubmit={this.handleSubmit} >
                    <h2 className="form-signin-heading">Create New Location</h2>
                    <label htmlFor="inputDescription" className="sr-only">Description</label>
                    <input type="text" value={this.state.description} onChange={this.onChange} className="form-control" id="description" placeholder="Description" required autoFocus />
                    <label htmlFor="inputStreet" className="sr-only">Street</label>
                    <input type="text" value={this.state.street} onChange={this.onChange} className="form-control" id="street" placeholder="Street" required autoFocus />
                    <label htmlFor="inputCity" className="sr-only">City</label>
                    <input type="text" value={this.state.city} onChange={this.onChange} className="form-control" id="city" placeholder="City" required autoFocus />
                    <label htmlFor="inputZip" className="sr-only">Zip</label>
                    <input type="text" value={this.state.zip} onChange={this.onChange} className="form-control" id="zip" placeholder="Zip" required autoFocus />
                    <label htmlFor="inputLocation" className="sr-only">Location</label>
                    <input type="text" value={this.state.location} onChange={this.onChange} className="form-control" id="location" placeholder="Location" required autoFocus />                   
                    <label value={this.state.image} >Select A photo</label><input type= "file" id="file" /> <br/><br/>
                    <button className="btn btn-lg btn-primary btn-block" type="submit">Create</button>
                    <br />
                </form>
                {this.state.err && (
                    <div className="alert alert-danger errmsg" role="alert">
                        {this.state.err}
                    </div>
                )}
            </div>
        )
    }
}

export default CreateLocation;