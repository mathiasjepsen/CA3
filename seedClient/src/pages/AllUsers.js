import React, { Component } from "react";
import adminFacade from "../facades/adminFacade";

export default class AllUsers extends Component {
    constructor() {
        super()
        this.state = {
            users: []
        }
    }

    componentWillMount() {
        adminFacade.setUserObserver(this.usersUpdater)
        adminFacade.getAllUsers()
    }

    usersUpdater = (users) => {
        this.setState({
            users
        })
    }

    editUser = (e) => {
        adminFacade.editUser()
    }

    deleteUser = (e) => {
        adminFacade.deleteUser(e.target.id)        
    }

    render() {
        return (
            <div>
                <h1>All users</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Phone Number</th>
                            <th>E-mail</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.users.length > 0 &&
                            this.state.users.map((user, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{user.username}</td>
                                        <td>{user.fName}</td>
                                        <td>{user.lName}</td>
                                        <td>{user.phone}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            <div className="btn-group">
                                                <button type="button" onClick={this.editUser} className="btn btn-info" id={user.username}>Edit</button><button type="button" onClick={this.deleteUser} className="btn btn-warning" id={user.username}>Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}