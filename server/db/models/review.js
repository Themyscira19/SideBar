var db = require('../config');
var Movie = require('./movie.js');

var Review = db.Model.extend({
  tableName: 'reviews',
  movie: function() {
    return this.belongsTo(Movie, 'movieId');
  }
});

module.exports = Review;
