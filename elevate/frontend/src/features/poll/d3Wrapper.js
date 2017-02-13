import React from 'react';
import { connect } from 'react-redux';
// 'use strict';

import { d3Chart } from './d3Chart';

class Chart extends React.Component {

  constructor(props){
    super(props);
    this.title = 'Vote Count';
    this.data = this.props.data;
    this.idx = 0;
  }

  componentDidMount(){
    this.chartContainer = document.querySelector('#chart-container');
  }

  componentWillUnmount(){
    d3Chart.remove();
  }


  componentWillReceiveProps(newProps){
    console.log(newProps);
    if ( !newProps.results ) { return; }
    let chartData = [this.props.results.yes, this.props.results.no];
    d3Chart.update(this.chartContainer, chartData, this.title);
  }

  render(){

    return (
      <div id='chart-container' className='chart-container'></div>
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
)(Chart);
