'use strict';

import { d3Chart } from './d3Chart';

export class Chart extends React.Component {

  constructor(props){
    super(props);
    this.title = 'New Customers';
    this.data = this.props.data;
    this.idx = 0;
  }

  componentDidMount(){
    this.chartContainer = document.querySelector('#chart-container');
    d3Chart.update(this.chartContainer, this.props.data, this.title);
  }

  componentWillUnmount(){
    d3Chart.remove();
  }

  render(){
    return (
      <div id='chart-container' className='chart-container'></div>
    )
  }
}
