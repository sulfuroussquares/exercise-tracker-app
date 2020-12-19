import React, { Component } from 'react';

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
    componentDidMount() {
        this.setState({
            users: ['test'],
            username: 'test user'
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

        // take the user back to homepage (list of exercises)
        window.location='/';



    } // end onSubmit()

    render(){
        return(
            <div>
            <h3>Create New Exercise Log</h3>
            <form onSubmit={this.onSubmit}>
                <div className="form-group"> 
                <label>Username: </label>
                {/* Dropdown menu to select username */}
                <select ref="userInput"
                    required
                    className="form-control"
                    value={this.state.username}
                    onChange={this.onChangeUsername}>
                    {
                        // take all of our users and return them in an array
                        this.state.users.map(function(user) {
                            // for each user in the array, return a select box with boh key and value being user
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
                    value={this.state.duration}
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
                <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
                </div>
            </form>
            </div>
        ) // end return

    } // end render function
} // end exerciselist class
