var db = require('../config');
var Movie = require('../models/movie.js');

var Movies = new db.Collection();

Movies.model = Movie;

module.exports = Movies;
