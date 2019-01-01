import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import CompareTab from "./components/CompareTab.jsx";
import GenreTab from "./components/GenreTab.jsx";
import RecommendTab from "./components/RecommendTab.jsx";
import {Tabs, Tab} from 'react-bootstrap';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movieData: [],
      currentMovie: {title: "example", movieId: 100, release_date: "10/28/1927", fresh_votes: 50, rotten_votes: 50, genre_id: 15},
      topTen: [],
      genres: [],
      currentGenre: 'Example-Genre',
      genreTopTen: [],
      recommended: []
    };
    axios.get('/movies')
      .then((response) => {
        response.data.map((movie) => {
          movie.rating = movie.fresh_votes / (movie.fresh_votes + movie.rotten_votes);
          movie.rating = Math.floor(movie.rating * 100);
          if (movie.rating >= 75) {
            movie.icon = './images/certified_fresh.png'
          } else if (movie.rating >= 60) {
            movie.icon = './images/fresh.png'
          } else {
            movie.icon = './images/rotten.jpeg'
          }
        })
        this.setState({
        movieData: response.data,
        currentMovie: response.data[0]
      }, () => {
      axios.get('/genres')
        .then((resp) => {
          this.setState({
            genres: resp.data
          }, () => {
            var url = Number(document.URL.substring(document.URL.length - 3));
            // document.split('/')
            this.switchMovie(url);
          })
        }) 
      })
    })
    axios.get('/topTen')
        .then((res) => {
          this.setState({
            topTen: res.data
          })
        })

   this.switchMovie = this.switchMovie.bind(this);
  }

  switchMovie (num) {
    num = num || 101;
    axios.get(`/movies/${num}`)
      .then((response) => {
        var movie = response.data;
        movie.rating = movie.fresh_votes / (movie.fresh_votes + movie.rotten_votes);
        movie.rating = Math.floor(movie.rating * 100);
        if (movie.rating >= 75) {
          movie.icon = './images/certified_fresh.png'
        } else if (movie.rating >= 60) {
          movie.icon = './images/fresh.png'
        } else {
          movie.icon = './images/rotten.jpeg'
        }
        this.setState({
          currentMovie: movie
        }, () => {
          this.state.genres.map((genreObj) => {
            if (genreObj.id == this.state.currentMovie.genre_id) {
              this.setState({
                currentGenre: genreObj.name
              })
            }
          })
          axios.get(`topTen/${this.state.currentMovie.genre_id}`)
            .then((res) => {
              this.setState({
                genreTopTen: res.data
              })
            })
        })
      })
      var array = [];
      for (var i = 0; i < 10; i++) {
        var random = Math.floor(Math.random() * 100);
        if (this.state.movieData[random]) {
            array.push(this.state.movieData[random]);
        }
      }
      this.setState({
        recommended: array
      })
  }

  render() {
    return (
      <Tabs defaultActiveKey={1}>
      <Tab eventKey={1} title={`How ${this.state.currentMovie.title} stacks up:`}>
        <CompareTab currentMovie={this.state.currentMovie} movies={this.state.movieData} topTen={this.state.topTen}/>
      </Tab>
      <Tab eventKey={2} title={`Top picks in ${this.state.currentGenre}:`}>
      <GenreTab currentMovie={this.state.currentMovie} movies={this.state.movieData} topTen={this.state.genreTopTen}/>
      </Tab>
      <Tab eventKey={3} title={`Recommended:`}>
        <RecommendTab currentMovie={this.state.currentMovie} ten={this.state.recommended}/>
      </Tab>
    </Tabs>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));