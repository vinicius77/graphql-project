const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/** 
 * EXAMPLE
 * {
    name: 'Robert Martin',
    id: 'afa51ab0-344d-11e9-a414-719c6709cf3e',
    born: 1952,
  },*/

//Create User Schema
const AuthorSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  born: {
    type: String,
    required: false,
  },

  register_date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Author', AuthorSchema);
