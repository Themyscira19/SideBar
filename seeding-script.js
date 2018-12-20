var fakeMovies = require('./fakeMovieData.json');
var fakeReviews = require('./fakeReviewData.json');
var fakeGenres = require('./fakeGenreData.json');
var db = require('./server/db/config.js');
var Movies = require('./server/db/collections/movies.js');
var Reviews = require('./server/db/collections/reviews.js');
var Genres = require('./server/db/collections/genres.js');

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

var insertAllReviews = function() {
    fakeReviews.forEach((fakeReview) => {
        Reviews.create({
            text: fakeReview.text,
            vote: fakeReview.vote,
            movie_id: fakeReview.movie_id
        })
        .catch((err) => {
            console.log(err);
        })
    });
};

insertAllReviews();

var insertAllGenres = function() {
    fakeGenres.forEach((fakeGenre) => {
        Genres.create({
            name: fakeGenre.name,
            usable_id: fakeGenre.usable_id
        })
        .catch((err) => {
            console.log(err);
        })
    });
};

insertAllGenres();