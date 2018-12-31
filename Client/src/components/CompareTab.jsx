import React from "react";
import axios from "axios";
import {Table} from "react-bootstrap";

class CompareTab extends React.Component {
  constructor(props) {
    super(props);

    };



  render() {
    return (
      <Table striped condensed hover>
        <thead>
          <tr> 
            <th> image </th>
            <th> {this.props.currentMovie.rating}%  </th>
            <th> {this.props.currentMovie.title}  </th>
            <th> {this.props.currentMovie.release_date} </th>
          </tr>
        </thead>
        <tbody>
        {this.props.topTen.map((movie) => {
          return(
            <tr id={movie.movieId}>
              <th> <a href={`?${movie.movieId}`}> image </a> </th>
              <th> <a href={`?${movie.movieId}`}> {Math.floor(movie.rating * 100)}% </a> </th>
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