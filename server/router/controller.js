var Movie = require("../db/models/movie.js");
var Review = require("../db/models/review.js");
var Genre = require("../db/models/genre.js");

exports.retrieveAllMovies = (req, res) => {
  Movie.where({})
    .fetchAll()
    .then(found => {
      if (!found) {
        console.log("could not find");
      } else {
        res.send(found.models);
      }
    });
};



exports.retrieveAllReviews = (req, res) => {
    Review.where({})
      .fetchAll()
      .then(found => {
        if (!found) {
          console.log("could not find");
        } else {
          res.send(found.models);
        }
      });
  };