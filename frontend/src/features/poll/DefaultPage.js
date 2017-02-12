import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import PollList from './PollList';

// import { sub } from '../../common/pubnub/pubnub';

export class DefaultPage extends Component {
  static propTypes = {
    polls: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  state = {
    poll: ''
  }

  constructor(props) {
    super(props);
    this.handleGetPolls = ::this.handleGetPolls;
    this.handleChange = ::this.handleChange;
    this.subscribe = ::this.subscribe;
  }

  handleGetPolls() {
    this.props.actions.getPolls();
  }

  subscribe() {
    this.props.actions.sub(this.state.poll);
  }

  handleChange(e) {
    this.setState({poll: e.target.value});
  }

  render() {
    let { count, getPollsPending, polls, getPollsError } = this.props.polls;

    return (
      <div className="poll-default-page">
        Welcome to the Poll Page!!!!

        <input onChange={this.handleChange} />
        <button onClick={this.subscribe}>
          Subscribe
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
    pubnub: state.pubnub
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
