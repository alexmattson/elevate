import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Hello, RedditList } from './index';
import * as actions from './redux/actions';
import PollsSvg from './PollsSvg';
import Header from './header';

import Typist from 'react-typist';


export class DefaultPage extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.handlePlusOne = ::this.handlePlusOne;
    this.handleMinusOne = ::this.handleMinusOne;
    this.handleReset = ::this.handleReset;
    this.handleFetchReddit = ::this.handleFetchReddit;
  }

  handlePlusOne() {
    this.props.actions.counterPlusOne();
  }

  handleMinusOne() {
    this.props.actions.counterMinusOne();
  }

  handleReset() {
    this.props.actions.resetCounter();
  }

  handleFetchReddit() {
    debugger;
    this.props.actions.fetchRedditReactjsList();
  }

  render() {
    const { count, fetchRedditReactjsListPending, redditReactjsList, fetchRedditReactjsListError } = this.props.home;
    let cursor = {show: true,blink: true,element: '|',hideWhenDone: true,hideWhenDoneDelay: 3000};            
    return (
      <div className="page-home">
          <Header />  
          <div className="c c-splash">
              <div className="c-temp">
                  <div className="hl-wrap">
                      <Typist className="hl hl-flushed" cursor={cursor} avgTypingDelay={20} stdTypingDelay={0} >
                          Create polls for your people and see what your people say
                      </Typist>
                  </div>
                  <button className="btn btn-primary">Get Started</button>
              </div>

              <div className="img-wrap">
                  <PollsSvg />
              </div>
          </div>            
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    home: state.home,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DefaultPage);
