var knex = require('knex')({
    client: 'postgres',
    connection: {
      host: '127.0.0.1',
      database: 'fakeMovies'
    },
    pool: { min: 0, max: 7 }
  });

  var db = require('bookshelf')(knex);

  db.knex.schema.hasTable('movies').then(function(exists) {
    if (!exists) {
      db.knex.schema.createTable('movies', function (movie) {
        movie.increments('id').primary();
        movie.string('title', 100);
        movie.string('release_date', 20);
        movie.integer('fresh_votes', 10);
        movie.integer('rotten_votes', 10);
        movie.integer('movieId', 5);
        movie.integer('genre_id', 3);
      }).then(function (table) {
        console.log('Created Table', table);
      });
    }
  });
  
  db.knex.schema.hasTable('reviews').then(function(exists) {
    if (!exists) {
      db.knex.schema.createTable('reviews', function (review) {
        review.increments('id').primary();
        review.string('text', 1000);
        review.string('vote', 8);
        review.integer('movie_id', 3);
      }).then(function (table) {
        console.log('Created Table', table);
      });
    }
  });
  
  db.knex.schema.hasTable('genres').then(function(exists) {
    if (!exists) {
      db.knex.schema.createTable('genres', function (genre) {
        genre.increments('id').primary();
        genre.string('name', 50);
        genre.integer('usable_id', 3);
      }).then(function (table) {
        console.log('Created Table', table);
      });
    }
  });
  
  module.exports = db;