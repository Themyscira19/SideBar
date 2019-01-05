import React from "react";
import axios from "axios";
import {Table} from "react-bootstrap";

var lineStyle = {
  color: 'black',
  fontSize: '14px',
  textDecoration: 'none',
  fontFamily: 'Franklin Gothic FS Book, sans-serif',
  borderTop: '0px'
}

class RecommendTab extends React.Component {
  constructor(props) {
    super(props);
    
    };

  render() {
    return (
      <div>
      <h5> If you liked {this.props.currentMovie.title}, you might like: </h5>
      <Table condensed hover>
       
        <tbody>
        {this.props.ten.map((movie) => {
          return(
            <tr id={movie.movieId}>
              <th style={lineStyle}>  <img src={`${movie.icon}`} width='16px' height='16px'/>   </th>
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

export default RecommendTab;