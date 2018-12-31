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

exports.retrieveMoviesByGenre = (req, res) => {
    var genre_id = req.params.genre_id;
    Movie.where({genre_id})
      .fetchAll()
      .then(found => {
        if (!found) {
          console.log("could not find");
        } else {
          res.send(found.models);
        }
      });
  };

  var insertionSort = function(array) {
      var newArray = [];
    for (var i = 0; i < array.length; i++) {
        // console.log(array[i].attributes)
      var numObj = array[i].attributes;
    //   console.log(numObj)
      var fresh = numObj.fresh_votes;
        var rotten = numObj.rotten_votes;
        numObj.rating = fresh / (fresh + rotten);
      for (var j = 0; j <= newArray.length; j++) {
          if (j === i) {
              newArray.push(numObj);
              break;
          }
        var compareObj = newArray[j];
        var fresh = compareObj.fresh_votes;
        var rotten = compareObj.rotten_votes;
        compareObj.rating = fresh / (fresh + rotten);
        if (numObj.rating > compareObj.rating)  {
          newArray.splice(j, 0, numObj);
          break;
        }
      }
    }
    return newArray.slice(0, 10);
  };

  exports.retrieveTopTenMovies = (req, res) => {
    Movie.where({})
      .fetchAll()
      .then(found => {
        if (!found) {
          console.log("could not find");
        } else {
            var response = insertionSort(found.models);
            res.send(response);
        }
      });
  };

  exports.retrieveTopTenMoviesByGenre = (req, res) => {
    var genre_id = req.params.genre_id;
    Movie.where({genre_id})
      .fetchAll()
      .then(found => {
        if (!found) {
          console.log("could not find");
        } else {
            var response = insertionSort(found.models);
            res.send(response);
        }
      });
  };

  exports.retrieveMovieById = (req, res) => {
    var movieId = req.params.id;
    Movie.where({movieId: movieId})
      .fetch()
      .then(found => {
        if (!found) {
          console.log("could not find");
        } else {
          res.send(found.attributes);
        }
      });
  };



exports.retrieveGenres = (req, res) => {
    Genre.where({})
      .fetchAll()
      .then(found => {
        if (!found) {
          console.log("could not find");
        } else {
          res.send(found.models);
        }
      });
  };

