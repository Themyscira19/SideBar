import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import CompareTab from "./components/CompareTab.jsx";
import GenreTab from "./components/GenreTab.jsx";
import RecommendTab from "./components/RecommendTab.jsx";
import {Tabs, Tab} from 'react-bootstrap';

// var 'http://18.222.207.221:9004' = 'http://18.222.207.221:9004' || 'http://localhost:9004';

var tabStyle = {
  maxWidth: '375px',
  overflowWrap: 'true'
};

var allStyle = {
  fontWeight: 'normal',
  maxWidth: '375px',
  color: 'black',
  overflowWrap: 'true',
  borderWidth: '1px',
  borderStyle: 'ridge',
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
    axios.get('http://18.222.207.221:9004/movies/')
      .then((response) => {
        response.data.map((movie) => {
          movie.rating = movie.fresh_votes / (movie.fresh_votes + movie.rotten_votes);
          movie.rating = Math.floor(movie.rating * 100);
          if (movie.rating >= 75) {
            movie.icon = './sidebar/images/certified_fresh.png'
          } else if (movie.rating >= 60) {
            movie.icon = './sidebar/images/fresh.png'
          } else {
            movie.icon = './sidebar/images/rotten.jpeg'
          }
        })
        this.setState({
        movieData: response.data,
        currentMovie: response.data[0]
      }, () => {
      axios.get('http://18.222.207.221:9004/genres/')
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
    axios.get('http://18.222.207.221:9004/topTen/')
        .then((res) => {
          this.setState({
            topTen: res.data
          })
        })

   this.switchMovie = this.switchMovie.bind(this);
  }

  switchMovie (num) {
    num = num || 101;
    axios.get(`http://18.222.207.221:9004/movies/${num}`)
      .then((response) => {
        var movie = response.data;
        movie.rating = movie.fresh_votes / (movie.fresh_votes + movie.rotten_votes);
        movie.rating = Math.floor(movie.rating * 100);
        if (movie.rating >= 75) {
          movie.icon = './sidebar/images/certified_fresh.png'
        } else if (movie.rating >= 60) {
          movie.icon = './sidebar/images/fresh.png'
        } else {
          movie.icon = './sidebar/images/rotten.jpeg'
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
          axios.get(`http://18.222.207.221:9004/topTen/${this.state.currentMovie.genre_id}`)
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
      <Tabs id='tabs' defaultActiveKey={1} style={allStyle} generateChildId='true'>
      <Tab id='1' eventKey={1} title={'Compare:'} style={tabStyle} bsStyle='fuckreact'>
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