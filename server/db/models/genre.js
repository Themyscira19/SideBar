var db = require('../config');

var Genre = db.Model.extend({
  tableName: 'genres'
});

module.exports = Genre;
