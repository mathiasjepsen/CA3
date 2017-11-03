import React, { Component } from 'react'
import placeFacade from '../facades/placeFacade'
 import auth from "../authorization/auth";
 import uploade from "./Upload"

class CreateLocation extends Component {
    constructor() {
        super();
        this.state = {place: {address: "", description: "", image: ""} }
    }

    handleSubmit = (event) => {
        event.preventDefault()
      const address = this.state.place.address
      const description = this.state.place.description
      const images = this.state.place.image
        placeFacade.createLocation(this.state.place)
        this.upload.save(event)
    }
    
    onChange = (e) => {
        const propertyName = e.target.id;
        const value = e.target.value;
        let place = this.state.place;
        place[propertyName] = value;
        this.setState({ place });
    }

    render() {
        return (
            <div className="container">
                <form className="form-signin" onSubmit={this.handleSubmit} >
                    <h2 className="form-signin-heading">Create New Location</h2>
                    <label htmlFor="inputDescription" className="sr-only">Description</label>
                    <input type="text" value={this.state.place.description} onChange={this.onChange} className="form-control" id="description" placeholder="Description" required autoFocus />
                    <label htmlFor="inputAddress" className="sr-only">Address</label>
                    <input type="text" value={this.state.place.address} onChange={this.onChange} className="form-control" id="address" placeholder="Address" required autoFocus />
                    <label value={this.state.place.image} >Select A photo</label><input type= "file" name="file" /> <br/><br/>
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