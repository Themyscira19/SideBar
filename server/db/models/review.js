var db = require('../config');
var Movie = require('./movie.js');

var Review = db.Model.extend({
  tableName: 'movies',
  movie: function() {
    return this.belongsTo(Movie, 'movie_Id');
  }
});

module.exports = Review;
