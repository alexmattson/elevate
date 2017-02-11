import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import PollList from './PollList';

export class DefaultPage extends Component {
  static propTypes = {
    polls: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.handleGetPolls = ::this.handleGetPolls;
  }

  handleGetPolls() {
    this.props.actions.getPolls();
  }

  render() {
    let { count, getPollsPending, polls, getPollsError } = this.props.polls;

    return (
      <div className="poll-default-page">
        Welcome to the Poll Page

        <button className="btn-get-polls" disabled={getPollsPending} onClick={this.handleGetPolls}>
          {getPollsPending ? 'Geting...' : 'Get reactjs topics'}
        </button>

        <PollList polls={polls} />
      </div>

    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    polls: state.polls,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DefaultPage);
