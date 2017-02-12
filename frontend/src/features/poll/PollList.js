import React, { Component, PropTypes } from 'react';

export default class PollList extends Component {
  static propTypes = {
  };

  static defaultProps = {
    polls: [],
  };

  constructor(props) {
    super(props);
    this.renderPolls = ::this.renderPolls;
  }

  renderPolls() {
    let polls = this.props.polls
    let pollIds = Object.keys(polls);

    return pollIds.map(pollId => (
        <li>
          <ul>
            <h1>{polls[pollId]}</h1>
            {polls[pollId].events.map(event => (<li>event</li>))}
          </ul>
        </li>
      )
    )
  }

  render() {
    return (
      <ul className="poll-polls-list">
        {this.renderPolls()}
      </ul>
    );
  }
}
