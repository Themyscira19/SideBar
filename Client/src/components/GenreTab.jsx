import React from "react";
import axios from "axios";
import {Table} from "react-bootstrap";

var lineStyle = {
  color: 'black',
  'font-size': '14px',
  'text-decoration': 'none',
  'font-family': 'Franklin Gothic FS Book, sans-serif',
  'border-top': '0px'
}

class GenreTab extends React.Component {
  constructor(props) {
    super(props);

    };

  render() {
    return (
      <div>
      <h5> Top picks in {this.props.genre}: </h5>
      <Table condensed hover>
       
        <tbody>
        {this.props.topTen.map((movie) => {
            movie.rating = movie.fresh_votes / (movie.fresh_votes + movie.rotten_votes);
            movie.rating = Math.floor(movie.rating * 100);
            if (movie.rating >= 75) {
              movie.icon = './sidebar/images/certified_fresh.png'
            } else if (movie.rating >= 60) {
              movie.icon = './sidebar/images/fresh.png'
            } else {
              movie.icon = './sidebar/images/rotten.jpeg'
            }
          return(
            <tr id={movie.movieId}>
              <th style={lineStyle}> <img src={`${movie.icon}`} width='16px' height='16px'/> </th>
              <th style={lineStyle}> <a href={`?${movie.movieId}`} style={lineStyle}> {Math.floor(movie.rating)}% </a> </th>
              <th style={lineStyle}> <a href={`?${movie.movieId}`} style={lineStyle}> {movie.title} </a> </th>
              <th style={lineStyle}> <a href={`?${movie.movieId}`} style={lineStyle}> {movie.release_date} </a> </th>
            </tr>
          )}
        )}
        </tbody>
       </Table>
       </div>
    );
  }
}

export default GenreTab;