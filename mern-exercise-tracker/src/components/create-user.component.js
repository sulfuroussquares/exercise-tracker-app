import React, { Component } from 'react';

import axios from 'axios';

export default class CreateUser extends Component {

    constructor(props) {
        // always call super() when defining constructor of a subclass
        // All react classes with a constructor should have this
        super(props);

        // binding the methods we define to the CreateUser object
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    
        // set initial component state
        // the fields correspond to the mongodb entity attributes
        this.state = {
          username: ''
        }
      }
    
      onChangeUsername(e) {
        this.setState({
          username: e.target.value
        })
      }
    
      onSubmit(e) {
        // prevent default HTML form submit behavior from executing
        e.preventDefault();
    
        // creating variables in react is okay if we're restricting their scope to within methods
        const user = {
          username: this.state.username
        }
    
        console.log(user);
    
        // send data to backend
        // see /backend/routes/users to see what happens when we send a POST request to /users/add
        axios.post('http://localhost:5000/users/add', user)
          .then(res => console.log(res.data));
    
        // keep user on same page following form submission 
        // (in case they want to add more users)
        this.setState({
          username: ''
        })
      }




    // NOTE: Leaving a "value={}" in the input box attributes makes a read-only input box!
    // use "defaultValue=" instead
    render() {
        return (
          <div>
            <h3>Create New User</h3>
            <form onSubmit={this.onSubmit}>
              <div className="form-group"> 
                <label>Username: </label>
                <input  type="text"
                    required
                    className="form-control"
                    defaultValue={this.state.username}
                    onChange={this.onChangeUsername}
                    />
              </div>
              <div className="form-group">
                <input type="submit" value="Create User" className="btn btn-primary" />
              </div>
            </form>
          </div>
        )

    } // end render function
} // end exerciselist class