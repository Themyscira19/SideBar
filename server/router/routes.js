var router = require('express').Router();
var controller = require('./controller.js');

// Create route handlers for each of the six methods in pokemonController
router.route('/movies')
    .get(controller.retrieveAllMovies)
    // .post(controller.createOne)
    // .delete(controller.deleteAll);

// router.route('/')
//     .get(pokemonController.retrieveOne)
//     .put(pokemonController.updateOne)
//     .delete(pokemonController.deleteOne);

module.exports = router;
