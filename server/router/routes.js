var router = require('express').Router();
var controller = require('./controller.js');

// Create route handlers for each of the six methods in pokemonController
router.route('/movies')
    .get(controller.retrieveAllMovies);

router.route('/movies/:id')
    .get(controller.retrieveMovieById);

router.route('/genres')
    .get(controller.retrieveGenres);

router.route('/genres/:genre_id')
    .get(controller.retrieveMoviesByGenre);

router.route('/topTen')
    .get(controller.retrieveTopTenMovies);

router.route('/topTen/:genre_id')
    .get(controller.retrieveTopTenMoviesByGenre);

module.exports = router;
