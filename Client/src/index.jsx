import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import CompareTab from "./components/CompareTab.jsx";
import {Tabs, Tab} from 'react-bootstrap';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentView: "compareTab",
      movieData: [],
      currentMovie: {title: "example", movieId: 100, release_date: "10/28/1927", fresh_votes: 50, rotten_votes: 50, genre_id: 15},
      topTen: [],
      genres: [],
      currentGenre: 'Example-Genre'
    };
    axios.get('/movies')
      .then((response) => {
        response.data.map((movie) => {
          movie.rating = movie.fresh_votes / (movie.fresh_votes + movie.rotten_votes);
          movie.rating = Math.floor(movie.rating * 100);
          if (movie.rating >= 75) {
            movie.icon = ''
          } else if (movie.rating >= 60) {
            movie.icon = ''
          } else {
            movie.icon = ''
          }
        })
        this.setState({
        movieData: response.data,
        currentMovie: response.data[0]
      }, () => {
        var url = Number(document.URL.substring(document.URL.length - 3));
        // document.split('/')
        this.switchMovie(url);
      }, () => {
      axios.get('/genres')
        .then((resp) => {
          this.setState({
            genres: resp.data
          }, () => {
            this.state.genres.map((genreObj) => {
              if (genreObj.usable_id = this.currentMovie.genre_id) {
                this.setState({
                  currentGenre: genreObj.name
                })
              }
            })
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

   this.switchTab = this.switchTab.bind(this);
   this.switchMovie = this.switchMovie.bind(this);
  }

  switchTab (tabName) {
    this.setState({
      currentView: tabName
    })
  }

  switchMovie (num) {
    num = num || 101;
    axios.get(`/movies/${num}`)
      .then((response) => {
        var movie = response.data;
        movie.rating = movie.fresh_votes / (movie.fresh_votes + movie.rotten_votes);
        movie.rating = Math.floor(movie.rating * 100);
        this.setState({
          currentMovie: movie
        }, () => {
          this.state.genres.map((genreObj) => {
            if (genreObj.usable_id = this.currentMovie.genre_id) {
              this.setState({
                currentGenre: genreObj.name
              })
            }
          })
        })
      })
  }

  render() {
    return (
      <Tabs defaultActiveKey={1}>
      <Tab eventKey={1} title={`How ${this.state.currentMovie.title} stacks up:`}>
        <CompareTab currentMovie={this.state.currentMovie} movies={this.state.movieData} topTen={this.state.topTen}/>
      </Tab>
      <Tab eventKey={2} title={`Top picks in ${this.state.currentGenre}:`}>
        Tab 2 content
      </Tab>
      <Tab eventKey={3} title={`Recommended:`}>
        Tab 3 content
      </Tab>
    </Tabs>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));