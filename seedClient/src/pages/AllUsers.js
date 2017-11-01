import React, { Component } from "react";
import { Route, Link, Switch } from 'react-router-dom'
import adminFacade from "../facades/adminFacade";

export default class AllUsers extends Component {
    constructor() {
        super()
        this.state = {
            users: [],
            username: "",
            password: "",
            fName: "",
            lName: "",
            phone: "",
            email: ""
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

    addUser = () => {

    }

    editUser = (username) => {
        const user = this.state.users.filter((user) => {
            return user.username === username
        })[0]

        if (user) {
            this.setState({
                username: user.username,
                fName: user.fName,
                lName: user.lName,
                phone: user.phone,
                email: user.email
            })
        }
    }

    deleteUser = (e) => {
        adminFacade.deleteUser(e.target.id)
    }

    handleSubmitPressed = (user) => {

    }

    handleChange = (target) => {
        this.setState({
            [target.name]: target.value
        })
    }

    render() {
        return (
            <div className="container">
                <div className="row">
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
                                                    <Link to={`${this.props.match.url}/editUser/${user.username}`} style={{ display: 'block', height: '100%' }}>Edit</Link>
                                                    <button type="button" onClick={this.deleteUser} className="btn btn-warning" id={user.username}>Delete</button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
                <div className="row">
                    <div className="col-sm-6 col-sm-offset-3">
                        <Switch>
                            <Route path={`${this.props.match.url}/addUser`} render={(props) => {
                                return (
                                    <div>
                                        <h3 style={{ textAlign: "center" }}>Add new user</h3>
                                        <AddUserTable
                                            {...props}
                                            addUser={this.addUser}
                                            onChange={this.handleChange}
                                            username={this.state.username}
                                            password={this.state.password}
                                            fName={this.state.fName}
                                            lName={this.state.lName}
                                            phone={this.state.phone}
                                            email={this.state.email}
                                        />
                                    </div>
                                )
                            }} />
                            <Route path={`${this.props.match.url}/editUser/:username`} render={(props) => {
                                return (
                                    <div>
                                        <h3 style={{ textAlign: "center" }}>Edit existing user</h3>
                                        <EditUserTable
                                            {...props}
                                            editUser={this.editUser}
                                            onChange={this.handleChange}
                                            username={this.state.username}
                                            password={this.state.password}
                                            fName={this.state.fName}
                                            lName={this.state.lName}
                                            phone={this.state.phone}
                                            email={this.state.email}
                                        />
                                    </div>
                                )
                            }} />
                        </Switch>
                    </div>
                </div>
            </div>
        )
    }
}

const AddUserTable = (props) => {

    this.handleChange = (e) => {
        props.onChange(e.target)
    }

    this.handleSubmitPressed = (e) => {
        const user = {
            username: props.username,
            password: props.password,
            fName: props.fName,
            lName: props.lName,
            phone: props.phone,
            email: props.email
        }

        props.addUser(user)
        e.preventDefault()
    }

    return (
        <div>
            <form className="form-horizontal" onSubmit={this.handleSubmitPressed}>
                <div className="form-group">
                    <div className="col-sm-12">
                        <input className="form-control" id="username" name="username" value={props.username} />
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-12">
                        <input className="form-control" id="password" name="password" placeholder="Enter password" value={props.password} onChange={this.handleChange} />
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-12">
                        <input type="number" className="form-control" name="fName" id="fName" placeholder="Enter first name" value={props.fName} onChange={this.handleChange} />
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-12">
                        <input type="email" className="form-control" id="lName" name="lName" placeholder="Enter last name" value={props.lName} onChange={this.handleChange} />
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-12">
                        <input className="form-control" id="phone" name="phone" placeholder="Enter phone number" value={props.phone} onChange={this.handleChange} />
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-12">
                        <input className="form-control" id="email" name="email" placeholder="Enter e-mail" value={props.email} onChange={this.handleChange} />
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-12">
                        <button type="submit" className="btn btn-default">Submit</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

class EditUserTable extends Component {
    constructor() {
        super()
    }

    componentDidMount() {
        this.props.editUser(this.props.match.params.username)
    }

    handleChange = (e) => {
        this.props.onChange(e.target)
    }

    handleSubmitPressed = (e) => {
        const user = {
            username: this.props.username,
            password: this.props.password,
            fName: this.props.fName,
            lName: this.props.lName,
            phone: this.props.phone,
            email: this.props.email
        }

        this.props.editUser(user)
        e.preventDefault()
    }

    render() {
        return (
            <div>
                <form className="form-horizontal" onSubmit={this.handleSubmitPressed}>
                    <div className="form-group">
                        <div className="col-sm-12">
                            <input className="form-control" readOnly id="username" name="username" value={this.props.username} />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-12">
                            <input className="form-control" id="password" name="password" placeholder="Enter password" value={this.props.password} onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-12">
                            <input type="number" className="form-control" name="fName" id="fName" placeholder="Enter first name" value={this.props.fName} onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-12">
                            <input type="email" className="form-control" id="lName" name="lName" placeholder="Enter last name" value={this.props.lName} onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-12">
                            <input className="form-control" id="phone" name="phone" placeholder="Enter phone number" value={this.props.phone} onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-12">
                            <input className="form-control" id="email" name="email" placeholder="Enter e-mail" value={this.props.email} onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-12">
                            <button type="submit" className="btn btn-default">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}