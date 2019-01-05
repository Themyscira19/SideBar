import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import CompareTab from "./components/CompareTab.jsx";
import GenreTab from "./components/GenreTab.jsx";
import RecommendTab from "./components/RecommendTab.jsx";
import {Tabs, Tab} from 'react-bootstrap';

var API_URL = process.env.API_URL || 'http://localhost:9004';

var tabStyle = {
  fontWeight: 'strong',
  maxWidth: '350px',
  overflowWrap: 'true'
};

var allStyle = {
  fontWeight: 'strong',
  maxWidth: '350px',
  color: 'black',
  'overflow-wrap': 'true',
  'border-width': '1px',
  'border-style': 'ridge'
};

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
    axios.get(API_URL + '/movies/')
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
      axios.get(API_URL + '/genres/')
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
    axios.get(API_URL + '/topTen/')
        .then((res) => {
          this.setState({
            topTen: res.data
          })
        })

   this.switchMovie = this.switchMovie.bind(this);
  }

  switchMovie (num) {
    num = num || 101;
    axios.get(API_URL + `/movies/${num}`)
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
          axios.get(API_URL + `/topTen/${this.state.currentMovie.genre_id}`)
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
      <Tabs id='tabs' defaultActiveKey={1} style={allStyle} generatechild='true'>
      <Tab id='1' eventKey={1} title={'Compare:'} style={tabStyle}>
        <CompareTab currentMovie={this.state.currentMovie} movies={this.state.movieData} topTen={this.state.topTen}/>
      </Tab>
      <Tab id='2' eventKey={2} title={'In this genre:'} style={tabStyle}>
      <GenreTab currentMovie={this.state.currentMovie} movies={this.state.movieData} topTen={this.state.genreTopTen} genre={this.state.currentGenre}/>
      </Tab>
      <Tab id='3' eventKey={3} title={`Recommended:`} style={tabStyle}>
        <RecommendTab currentMovie={this.state.currentMovie} ten={this.state.recommended}/>
      </Tab>
    </Tabs>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("sidebar"));