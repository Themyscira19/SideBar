import React from "react";
import axios from "axios";
import {Table} from "react-bootstrap";

class CompareTab extends React.Component {
  constructor(props) {
    super(props);

    };



  render() {
    return (
      <Table condensed hover>
        <thead>
          <tr> 
          <th> <img src={`${this.props.currentMovie.icon}`} width='16px' height='16px'/> </th>
            <th> {this.props.currentMovie.rating}%  </th>
            <th> {this.props.currentMovie.title}  </th>
            <th> {this.props.currentMovie.release_date} </th>
          </tr>
        </thead>
        <tbody>
        {this.props.topTen.map((movie) => {
          movie.rating = movie.fresh_votes / (movie.fresh_votes + movie.rotten_votes);
          movie.rating = Math.floor(movie.rating * 100);
          if (movie.rating >= 75) {
            movie.icon = './images/certified_fresh.png'
          } else if (movie.rating >= 60) {
            movie.icon = './images/fresh.png'
          } else {
            movie.icon = './images/rotten.jpeg'
          }
          return(
            <tr id={movie.movieId}>
              <th>  <img src={`${movie.icon}`} width='16px' height='16px'/>   </th>
              <th> <a href={`?${movie.movieId}`}> {Math.floor(movie.rating)}% </a> </th>
              <th> <a href={`?${movie.movieId}`}> {movie.title} </a> </th>
              <th> <a href={`?${movie.movieId}`}> {movie.release_date} </a> </th>
            </tr>
          )}
        )}
        </tbody>
       </Table>
    );
  }
}

export default CompareTab;