// imports
const router = require('express').Router();
let Exercise = require('../models/exercise.model');
const { route } = require('./users');

// NOTE: The "model" represents the schema for an entity. All of its attributes are defined in the model file
// which is imported above.

// This file contains routing information such as what to do when a client sends a GET or POST request
// to a particular page


// If user goes to root url /exercises/, and the browser is sending a GET request
// then Exercise.find() will retrieve all exercises from the database and return them in json format
router.route('/').get((req, res) => {
    Exercise.find()
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error: ' + err));
});





// If user goes to root url /exercises/add/, and the browser is sending a POST request
// then we will save the exercise and return a confirmation message
router.route('/add').post((req, res) => {
    const username = req.body.username;
    const description= req.body.description;
    const duration = req.body.duration;
    // date conversion
    const date = Date.parse(req.body.date);

    // instantiate a new exercise using the variables above
    const newExercise = new Exercise({
        username,
        description,
        duration,
        date,});

    newExercise.save()
    .then(() => res.json('Exercise added!'))
    .catch(err => res.status(400).json('Error: ' + err));

}); // end router.route('/add)


// object id's are created automatically by mongodb 
// http://url/exercises/<object-id> with a GET request will retrieve that particular object
router.route('/:id').get((req, res) => {
    Exercise.findById(req.params.id)
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json('Error: ' + err));

}); // end get by id

// object id's are created automatically by mongodb 
// http://url/exercises/<object-id> with a DELETE request will delete that particular object 
router.route('/:id').delete((req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
    .then(exercise => res.json('exercise deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
}); // end delete by id


// object id's are created automatically by mongodb 
// http://url/exercises/<object-id> with a POST request will update that particular object 
router.route('/update/:id').post((req, res) => {
    Exercise.findById(req.params.id)
    .then(exercise => {
        exercise.username = req.body.username;
        exercise.description = req.body.description;
        exercise.duration = req.body.duration;
        exercise.date = Date.parse(req.body.date);

        exercise.save()
        .then(() => res.json('Exercise updated.'))
        .catch(err => res.status(400).json('Error: ' + err));
    }) // end findById.then()
    .catch(err => res.status(400).json('Error: ' + err));

}); // end update by id

// In production, one should have the ability to update particular fields of an entity without having to
// submit all of them again.


// allow express to see this route
module.exports = router;

