import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import CompareTab from "./components/CompareTab.jsx";
import GenreTab from "./components/GenreTab.jsx";
import RecommendTab from "./components/RecommendTab.jsx";
import { Tabs, Tab } from "react-bootstrap";

var tabStyle = {
  maxWidth: "375px",
  overflowWrap: "true"
};

var allStyle = {
  fontWeight: "normal",
  maxWidth: "375px",
  color: "black",
  overflowWrap: "true",
  borderWidth: "1px",
  borderStyle: "ridge"
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movieData: {},
      currentMovie: {
        title: "example",
        movieId: 100,
        release_date: "10/28/1927",
        fresh_votes: 50,
        rotten_votes: 50,
        genre_id: 15
      },
      topTen: [],
      genres: {},
      currentGenre: "Example-Genre",
      genreTopTen: [],
      recommended: []
    };
    var genreObject = {};
    axios.get("/genres").then(res => {
      res.data.map(genre => {
        genreObject[genre.usable_Id] = genre.name;
      })
    })
    .then((genreObject) => {
      axios.get("/movies").then(response => {
        var movieObject = {};
        response.data.map(movie => {
          movie.rating =
            movie.fresh_votes / (movie.fresh_votes + movie.rotten_votes);
          movie.rating = Math.floor(movie.rating * 100);
          if (movie.rating >= 75) {
            movie.icon = "./sidebar/images/certified_fresh.png";
          } else if (movie.rating >= 60) {
            movie.icon = "./sidebar/images/fresh.png";
          } else {
            movie.icon = "./sidebar/images/rotten.jpeg";
          }
          movieObject[movie.movieId] = movie;
        });
        this.setState(
          {
            movieData: movieObject,
            currentMovie: movieObject[101],
            genres: genreObject
          },
          () => {
            var url = Number(document.URL.substring(document.URL.length - 3));
            this.switchMovie(url);
          }
        );
      });
    })

    this.switchMovie = this.switchMovie.bind(this);
  }

  switchMovie(num) {
    num = num || 101;
    var currentMovie = this.state.movieData[num];
    var genreId = currentMovie.genre_id;
    var genre = this.state.genres[genreId];
    console.log(this.state.genres)

    var recommended = [];
    for (var movie in this.state.movieData) {
      if (movie.title.length === currentMovie.title.length) {
        recommended.push(movie);
      }
    }

    axios.get(`/genres/${movie.genre_id}`).then(({data}) => {
      this.setState({
        currentMovie,
        genreTopTen: data,
        currentGenre: genre
      });

    })
  }

  render() {
    return (
      <Tabs id="tabs" defaultActiveKey={1} style={allStyle} generateChildId="true">
        <Tab id="1" eventKey={1} title={"Compare:"} style={tabStyle}>
          <CompareTab currentMovie={this.state.currentMovie} movies={this.state.movieData} topTen={this.state.topTen}/>
        </Tab>
        <Tab id="2" eventKey={2} title={"In this genre:"} style={tabStyle}>
          <GenreTab currentMovie={this.state.currentMovie} movies={this.state.movieData} topTen={this.state.genreTopTen} genre={this.state.currentGenre}/>
        </Tab>
        <Tab id="3" eventKey={3} title={`Recommended:`} style={tabStyle}>
          <RecommendTab currentMovie={this.state.currentMovie} ten={this.state.recommended}/>
        </Tab>
      </Tabs>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("sidebar"));
