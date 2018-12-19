var db = require('../config');
var Genre = require('../models/genre.js');

var Genres = new db.Collection();

Genres.model = Genre;

module.exports = Genres;
