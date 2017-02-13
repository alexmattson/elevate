import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { addVote, addResults } from './redux/actions';
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

// pubnub.addListener({
//   message: function(data){
//     console.log("New Message!!", this.props.addVote(data.vote);
//   }
// });

export class DefaultPage extends Component {
  static propTypes = {
    polls: PropTypes.object.isRequired,
    // actions: PropTypes.object.isRequired,
  };

  // state = {
  //   poll: '',
  //   vote: '',
  //   email: ''
  // }

  constructor(props) {
    super(props);
    // this.handleGetPolls = ::this.handleGetPolls;
    // this.handleChange = ::this.handleChange;
    // this.handleChange2 = ::this.handleChange2;
    // this.handleChange3 = ::this.handleChange3;
    // this.handleVote = ::this.handleVote;
    // this.subscribe = ::this.subscribe;
    // this.publish = ::this.publish;
  }

  // handleGetPolls() {
  //   this.props.actions.getPolls();
  // }

  // subscribe() {
  //   this.props.actions.sub();
  // }

  // subscribe(e) {
  //   e.preventDefault();
  //   let poll = this.state.poll;
    // debugger;


    // pubnub.subscribe({
    //     channels: [`voting-channel`, `${poll}-result`],
    //     message: this.props.addVote
    // });
    //
    // console.log('subscribed');
    //
    // pubnub.addListener({
    //   message: (data) => {
    //     console.log(data);
    //     const message = data.message;
    //     if (data.channel.match(/result/)) {
    //       this.props.addResults(message);
    //     }
    //     // if (data.message.vote) {
    //     //   this.props.addVote(data.message.vote);
    //     // }
    //   }
    // });

    // pubnub.publish({
    //   message: {
    //     "poll_id": poll,
    //     "results": true
    //   },
    //   channel: 'voting-channel'
    // });
  // }

  // publish(e){
  //   e.preventDefault();
  //   let poll = this.state.poll;
  //   let email = this.state.email;
  //   let vote = this.state.vote;
  //   // debugger;
  //
  //   pubnub.publish({
  //     message: {
  //       "poll_id": poll,
  //       "email": email,
  //       "vote": vote
  //     },
  //     channel: 'voting-channel'
  //   });
  //
  // }
  //
  //
  // handleChange(e) {
  //   this.setState({poll: e.target.value});
  // }
  //
  // handleChange2(e) {
  //   this.setState({email: e.target.value});
  // }
  //
  // handleChange3(e) {
  //   e.preventDefault();
  //   this.setState({vote: e.target.value});
  // }
  //
  // handleVote(e) {
  //   e.preventDefault();
  //   this.setState({vote: e.target.value});
  // }

  render() {
    let { pubnub } = this.props;

    return (
      <div className="poll-default-page">
        Welcome to the Poll Page!!!!

        <PollVote />

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
    pubnub: state.pubnub
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
    addVote: (vote) => dispatch(addVote(vote)),
    addResults: (results) => dispatch(addResults(results))
  };
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DefaultPage);
