// Import mongoose
const mongoose = require("mongoose");

// Instantiate a schema
const Schema = mongoose.Schema;

// Create the schema and set a single field (username) with attributes
const exerciseSchema = new Schema({
    username: { type: String, required: true},
    description: {type: String, required: true},
    duration: {type: Number, required: true},
    date: {type: Date, required: true},
    
}, {
    // autotimestamp for modifications/insertion/deletion
    timestamps: true,
});

// 'User' is the name we will use for this entity
const Exercise = mongoose.model('Exercise', exerciseSchema);

// Exporting the model
module.exports =  Exercise;


