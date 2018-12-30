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
      currentMovie: {title: "example", movieId: 100, release_date: "10/28/1927", fresh_votes: 50, rotten_votes: 50, genre_id: 15}
    };

   this.switchTab = this.switchTab.bind(this);
   this.switchMovie = this.switchMovie.bind(this);
  }

  componentDidMount() {
    axios.get('/movies')
      .then((response) => {this.setState({
        movieData: response.data,
        currentMovie: response.data[0]
      }, () => {
        var url = Number(document.URL.substring(document.URL.length - 3));
        // document.split('/')
        this.switchMovie(url);
      })})
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
        this.setState({
          currentMovie: response.data
        })
      })
  }

  render() {
    return (
      <Tabs defaultActiveKey={2} id="uncontrolled-tab-example">
      <Tab eventKey={1} title="Tab 1">
        <CompareTab currentMovie={this.state.currentMovie} movies={this.state.movieData}/>
      </Tab>
      <Tab eventKey={2} title="Tab 2">
        Tab 2 content
      </Tab>
      <Tab eventKey={3} title="Tab 3">
        Tab 3 content
      </Tab>
    </Tabs>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));