var db = require('../config');
var Genre = require('./genre.js');

var Movie = db.Model.extend({
  tableName: 'movie',
  genre: function() {
    return this.belongsTo(Genre, 'genre_id');
  }
});

module.exports = Movie;
