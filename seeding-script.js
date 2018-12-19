var fakeMovies = require('./fakeMovieData.json');
var db = require('./server/db/config.js');
var Movies = require('./server/db/collections/movies.js');

var insertAllMovies = function() {
    fakeMovies.forEach((fakeMovie) => {
        Movies.create({
            title: fakeMovie.title,
            release_date: fakeMovie.release_date,
            fresh_votes: fakeMovie.fresh_votes,
            rotten_votes: fakeMovie.rotten_votes,
            movieId: fakeMovie.movieId,
            genre_id: fakeMovie.genre_id
        })
        .catch((err) => {
            console.log(err);
        })
    });
};

insertAllMovies();