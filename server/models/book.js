const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/** EXAMPLE
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    genres: ['refactoring'],
  },*/

//Create User Schema
const BookSchema = new Schema({
  title: {
    type: String,
    required: true,
  },

  published: {
    type: String,
    required: false,
  },
  author: {
    type: String,
    required: false,
  },

  register_date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Book', BookSchema);
