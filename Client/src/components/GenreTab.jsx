import React from "react";
import axios from "axios";
import {Table} from "react-bootstrap";

class GenreTab extends React.Component {
  constructor(props) {
    super(props);

    };

  render() {
    return (
      <Table striped condensed hover>
       
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

export default GenreTab;