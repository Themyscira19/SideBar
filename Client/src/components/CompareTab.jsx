import React from "react";

class CompareTab extends React.Component {
  constructor(props) {
    super(props);

    };

  render() {
    return (

      <h2> {console.log(this.props.movies, this.props.currentMovie)} This is how {this.props.currentMovie.title} stacks up: </h2>
    );
  }
}

export default CompareTab;