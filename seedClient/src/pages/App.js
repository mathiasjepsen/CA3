import React from "react"
import {Route, Switch } from "react-router-dom"
import Login from "./Login";
import Logout from "./Logout";
import About from "./About";
import UserPage from "./UserPage";
import AdminPage from "./AdminPage";
import TopMenu from "./TopMenu";
import Signup from "./Signup";
import Upload from "./Upload";
import AllUsers from './admin/AllUsers'
import Places from "./Places";
<<<<<<< HEAD
import CreateLocation from "./CreateLocation"
=======
import Rating from "./Rating"
>>>>>>> master


function App() {
  return (
    <div>
      <TopMenu />
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/logout" component={Logout} />
        <Route path="/about" component={About} />
        <Route path="/user" component={UserPage} />
        <Route path="/admin" component={AdminPage} />
        <Route path="/signup" component={Signup} />
        <Route path="/upload" component={Upload} />
        <Route path="/allUsers" component={AllUsers} />        
        <Route path="/places" component={Places}/>
<<<<<<< HEAD
        <Route path="/createlocation" component={CreateLocation}/>
=======
        <Route path="/rate/:id" component={Rating}/>
>>>>>>> master
      </Switch>
    </div>
  )
}
export default App;