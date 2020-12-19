// standard import across react projects
import React, {Component} from 'react';
// import links to use in react-router routes
import {Link} from 'react-router-dom';


// our custom Navbar class is a react component object
export default class Navbar extends Component {

    render() {
        return (
            // Generic Navbar from bootstrap, converted to JSX
            // Key differences: Class is now className, <Link> used instead of anchor tag

            // navbar-dark, bg-dark, navbar-expand-lg are bootstrap styles
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <Link to="/" className="navbar-brand">ExcerTracker</Link>
                <div className="collpase navbar-collapse">
                <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                <Link to="/" className="nav-link">Exercises</Link>
                </li>
                <li className="navbar-item">
                <Link to="/create" className="nav-link">Create Exercise Log</Link>
                </li>
                <li className="navbar-item">
                <Link to="/user" className="nav-link">Create User</Link>
                </li>
                </ul>
                </div>
            </nav>

        
        )} // end render function
} // end Navbar class