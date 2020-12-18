// Import mongoose
const mongoose = require("mongoose");

// Instantiate a schema
const Schema = mongoose.Schema;

// Create the schema and set a single field (username) with attributes
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        // trim whitespace at the end
        trim: true,
        // at least 3 characters
        minlength: 3
    },
}, {
    // autotimestamp for modifications/insertion/deletion
    timestamps: true,
});

// 'User' is the name we will use for this entity
const User = mongoose.model('User', userSchema);

// Exporting the model
module.exports = User;