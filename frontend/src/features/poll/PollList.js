import React, { PureComponent, PropTypes } from 'react';

export default class PollList extends PureComponent {
  static propTypes = {
    polls: PropTypes.array
  };

  static defaultProps = {
    polls: [],
  };

  render() {
    return (
      <ul className="poll-polls-list">
        {
          this.props.polls.length > 0 ?
            this.props.polls.map(item => <li key={item.data.id}><a href={item.data.url}>{item.data.title}</a></li>)
            : <li className="no-items-tip">No items yet.</li>
        }
      </ul>
    );
  }
}
