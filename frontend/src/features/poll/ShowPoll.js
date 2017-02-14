import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { addVote, addResults, getPoll } from './redux/actions';
import PollList from './PollList';
import PollResult from './PollResult';
import PollVote from './PollVote';
import Chart from './d3Wrapper';
// import { getPubnub } from '../../common/pubnub/pubnub';

// import { sub } from '../../common/pubnub/pubnub';
import PubNub from 'pubnub';

const PUBLISH_KEY = 'pub-c-0644c683-0882-4d28-b6ac-81acf63ba847';
const SUBDCRIBE_KEY = 'sub-c-6cbc7d16-f09c-11e6-9283-02ee2ddab7fe';


const pubnub = new PubNub({
  publishKey : PUBLISH_KEY,
  subscribeKey : SUBDCRIBE_KEY
});


class ShowPoll extends Component {
  static propTypes = {
    polls: PropTypes.object.isRequired,
    // actions: PropTypes.object.isRequired,
  };



  constructor(props) {
    super(props);

  }


  componentDidMount() {

    const pollId = this.props.router.params.id;

    if (pollId) {
      this.props.getPoll(pollId);
    }
  }




  render() {
    let { pubnub } = this.props;

    return (
      <div className="poll-default-page">
        Show Poll
        <PollResult />
        <PollVote router={this.props.router} pollName={this.props.currentPoll.name}/>

        <Chart />

        <PollList polls={pubnub.polls} />
      </div>

    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    polls: state.polls,
    pubnub: state.pubnub,
    currentPoll: state.polls.currentPoll
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
    addVote: (vote) => dispatch(addVote(vote)),
    addResults: (results) => dispatch(addResults(results)),
    getPoll: (pollId) => dispatch(getPoll(pollId))
  };
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShowPoll);
