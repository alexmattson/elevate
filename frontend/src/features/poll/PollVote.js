import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { addVote, addResults } from './redux/actions';

// import { getPubnub } from '../../common/pubnub/pubnub';

// import { sub } from '../../common/pubnub/pubnub';
import PubNub from 'pubnub';

const PUBLISH_KEY = 'pub-c-0644c683-0882-4d28-b6ac-81acf63ba847';
const SUBDCRIBE_KEY = 'sub-c-6cbc7d16-f09c-11e6-9283-02ee2ddab7fe';


const pubnub = new PubNub({
  publishKey : PUBLISH_KEY,
  subscribeKey : SUBDCRIBE_KEY
});


class PollVote extends React.Component {
  static propTypes = {
    polls: PropTypes.object.isRequired,
    // actions: PropTypes.object.isRequired,
  };

  state = {
    poll: '',
    vote: '',
    email: '',
    subscribed: false,
    pollName: ''
  }

  constructor(props) {
    super(props);
    this.handleGetPolls = ::this.handleGetPolls;
    this.handleChange = ::this.handleChange;
    this.handleChange2 = ::this.handleChange2;
    this.handleChange3 = ::this.handleChange3;
    this.handleVote = ::this.handleVote;
    this.subscribe = ::this.subscribe;
    this.publish = ::this.publish;
  }

  handleGetPolls() {
    this.props.actions.getPolls();
  }

  // subscribe() {
  //   this.props.actions.sub();
  // }

  componentWillReceiveProps(nextProps) {
      console.log(this.props);
      const poll = nextProps.currentPoll;
      if (this.props.router.params.id && !this.state.subscribed) {
        this.subscribe(poll);
        this.setState({subscribed: true});
      }
  }

  subscribe(poll) {
    //   const pollId = this.props.router.params.id;
    const pollId = this.props.router.params.id
    if (pollId) {
      pubnub.subscribe({
        channels: [`${pollId}-result`],
        message: this.props.addVote
      });

      console.log(`${pollId}-result`);
      console.log('subscribed');

      pubnub.addListener({
        message: (data) => {
          console.log('PUBNUB:' + data);
          const message = data.message;
          if (data.channel.match(/result/)) {
            this.props.addResults(message);
            this.setState({pollName: this.props.currentPoll.name})
          }
          // if (data.message.vote) {
          //   this.props.addVote(data.message.vote);
          // }
        }
      });

    }

    // pubnub.publish({
    //   message: {
    //     "poll_id": poll,
    //     "results": true
    //   },
    //   channel: 'voting-channel'
    // });
  }

  publish(e){
    e.preventDefault();
    let poll = this.props.router.params.id;
    let email = this.state.email;
    let vote = this.state.vote;
    // debugger;

    pubnub.publish({
      message: {
        "poll_id": poll,
        "email": email,
        "vote": vote,
        "pollName": this.props.pollName
      },
      channel: 'voting-channel'
    });
    this.setState({pollName: this.props.currentPoll.name})
  }


  handleChange(e) {
    this.setState({poll: e.target.value});
  }

  handleChange2(e) {
    this.setState({email: e.target.value});
  }

  handleChange3(e) {
    e.preventDefault();
    this.setState({vote: e.target.value});
  }

  handleVote(e) {
    e.preventDefault();
    this.setState({vote: e.target.value});
  }


  // <input onChange={this.handleChange} />
  // <button onClick={this.subscribe}>
  //   Subscribe
  // </button>

  render() {
    return (
      <div>
          <h1>{this.state.pollName}</h1>
        <br></br>
        <label>
          Email Address:
          <input onChange={this.handleChange2} />
        </label>
        <br />
        Vote:
        <button onClick={this.handleVote} value="yes">
          Yes
        </button>
        <button onClick={this.handleVote} value="no">
          No
        </button>

        <br />
        <button onClick={this.publish}>
          Vote
        </button>
        <br/>
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
    addResults: (results) => dispatch(addResults(results))
  };
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PollVote);
