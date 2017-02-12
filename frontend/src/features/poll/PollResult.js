import React, { Component } from 'react';
import { connect } from 'react-redux';

class PollResult extends Component {
  constructor(props) {
    super(props);

    this.renderResults = ::this.renderResults;
  }

  renderResults() {
    const results = this.props.results;
    const resultLines = [];

    for (var key in results) {
      resultLines.push(<li key={key}>
        <span>{key}</span>: <span>{results[key]}</span>
      </li>);
    };

    return resultLines;
  }

  render() {
    
    return (
      <div>
        <h3>Poll Results</h3>
        <ul>
          { this.renderResults() }
        </ul>

      </div>
    )
  }


}


const mapStateToProps = state => {
  const results = state.polls.results.votingData;

  return { results };
};

export default connect(
  mapStateToProps,
  {}
)(PollResult);
