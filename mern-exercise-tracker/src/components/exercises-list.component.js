import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// functional react component (no state or lifecycle methods; accepts props and returns JSX)
const Exercise = props => (
  <tr>
    <td>{props.exercise.username}</td>
    <td>{props.exercise.description}</td>
    <td>{props.exercise.duration}</td>
    <td>{props.exercise.date.substring(0,10)}</td>
    <td>
      <Link to={"/edit/"+props.exercise._id}>edit</Link> | <a href="#" onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</a>
    </td>
  </tr>
)

// class component
// This shows every exercise in the database, and is the "beginning" or "homepage" of the app
export default class ExercisesList extends Component {
  constructor(props) {
    super(props);

    this.deleteExercise = this.deleteExercise.bind(this)

    this.state = {exercises: []};
  }

  componentDidMount() {
    // retrieve list of exercises from database
    axios.get('http://localhost:5000/exercises/')
      .then(response => {
        this.setState({ exercises: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  // deleteExercise takes an objectid, then uses the axios library to send a DELETE request to specified
  // location with id appended
  deleteExercise(id) {
    axios.delete('http://localhost:5000/exercises/'+id)
      .then(response => { console.log(response.data)});

    // update the page and filter our exercises to only the elements with id's different from the one
    // we just deleted
    this.setState({
      exercises: this.state.exercises.filter(el => el._id !== id)
      // NOTE: "_id" is because mongodb automatically prepends an underscore to the id field name
      // alternatively, we could also have just sent another GET request but this is more elegant
      // and less bandwidth/network intensive
    })
  }

  // for every element in the exercise array, exerciseList() returns a component which represents 
//   a row of the table.
  exerciseList() { 
    return this.state.exercises.map(currentexercise => {
        // each prop corresponding to an exercise is kind of like a variable
      return <Exercise exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>Logged Exercises</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.exerciseList() }
          </tbody>
        </table>
      </div>
    )
  }
}