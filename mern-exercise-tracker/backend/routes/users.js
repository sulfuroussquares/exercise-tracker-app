// imports
const router = require('express').Router();
let User = require('../models/user.model');


// NOTE: The "model" represents the schema for an entity. All of its attributes are defined in the model file
// which is imported above.

// This file contains routing information such as what to do when a client sends a GET or POST request
// to a particular page



// http://server-url/users will return a json-formatted list of all users
router.route('/').get((req, res) => {
    User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});



router.route('/add').post((req, res) => {
    const username = req.body.username;
    const newUser = new User({username});

    console.log('made it to the route.');
    console.log(username);

    newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));

})


// In production, we should have "update" and "delete" fucntionalities to perform full CRUD operations

// allow express to see this route
module.exports = router;