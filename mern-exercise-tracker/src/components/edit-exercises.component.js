import React, { Component } from 'react';

import axios from 'axios';

import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";



// This component will allow us to add exercises to the database
export default class CreateExercise extends Component {

    constructor(props) {
        // always call super() when defining constructor of a subclass
        // All react classes with a constructor should have this
        super(props);

        // binding the methods we define to the CreateExercise object
        this.onChangeUserName = this.onChangeUserName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);


        // in react, we set variables using state
        // when the state changes, the page will automatically update with new values

        // set initial component state
        // the fields correspond to the mongodb entity attributes
        this.state = {
            username : '',
            description : '',
            duration : 0,
            date : new Date(),
            users : []
        } // end init state
    } // end constructor

    // react lifecycle method
    // this will be called just before anything is displayed on the page

    // user is automatically set to first user in database if there is at least 1 user
    componentDidMount() {
        // pulling id from the url (backend)
        axios.get('http://localhost:5000/exercises/'+this.props.match.params.id)
        .then(res => {
            this.setState({
                // update state with what was retrieved from backend
                username: res.data.username,
                escription: res.data.description,
                duration: res.data.duration,
                date: new Date(res.data.date)
            })
        })
        .catch( function(error) {
            console.log(error);
        })


        axios.get('http://localhost:5000/users/')
        .then(res => {
            if (res.data.length > 0){
                this.setState({
                    users: res.data.map(user => user.username),
                })
            }
        })
    } // end componentDidMount()

    // add methods for updating state properties

    onChangeUserName(e){
        this.setState({
            username: e.target.value
        }); // end setState
    } // end onChangeUserName

    onChangeDescription(e){
        this.setState({
            description: e.target.value
        }); // end setState
    } // end onChangeDescription

    onChangeDuration(e){
        this.setState({
            duration: e.target.value
        }); // end setState
    } // end onChangeDuration

    // date will correspond to a calendar with selectable dates
    onChangeDate(date){
        this.setState({
            date : date
        }); // end setState
    } // end onChangeDate

    onSubmit(e){
        // prevent default HTML form submit behavior from executing
        e.preventDefault();

        // creating variables in react is okay if we're restricting their scope to within methods
        const exercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
          };

        
        console.log(exercise);

        // send data to backend
        // see /backend/routes/exercises to see what happens when we send a POST request to /users/add
        axios.post('http://localhost:5000/exercises/update/'+this.props.match.params.id, exercise)
          .then(res => console.log(res.data));

        // take the user back to homepage (list of exercises)
        window.location='/';



    } // end onSubmit()

    render(){
        return(
            <div>
            <h3>Edit Exercise Log</h3>
            <form onSubmit={this.onSubmit}>
                <div className="form-group"> 
                <label>Username: </label>
                {/* Dropdown menu to select username */}
                <select ref="userInput"
                    required
                    className="form-control"
                    defaultValue={this.state.username}
                    onChange={this.onChangeUsername}>
                    {
                        // take all of our users and return them in an array
                        this.state.users.map(function(user) {
                            // for each user in the array, return a select box with both key and value being user
                        return <option 
                            key={user}
                            value={user}>{user}
                            </option>;
                        })
                    }
                </select>
                </div>
                <div className="form-group"> 
                <label>Description: </label>
                <input  type="text"
                    required
                    className="form-control"
                    value={this.state.description}
                    onChange={this.onChangeDescription}
                    />
                </div>
                <div className="form-group">
                <label>Duration (in minutes): </label>
                <input 
                    type="text" 
                    className="form-control"
                    defaultValue={this.state.duration}
                    onChange={this.onChangeDuration}
                    />
                </div>
                <div className="form-group">
                <label>Date: </label>
                <div>
                    {/* Datepicker uses react-datepicker module (installed separately) */}
                    <DatePicker
                    selected={this.state.date}
                    onChange={this.onChangeDate}
                    />
                </div>
                </div>

                <div className="form-group">
                <input type="submit" value="Edit Exercise Log" className="btn btn-primary" />
                </div>
            </form>
            </div>
        ) // end return

    } // end render function
} // end exerciselist class
