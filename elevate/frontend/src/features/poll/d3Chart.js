import * as d3 from 'd3';

export const d3Chart = {};

const svgWidth = 500;
const svgHeight = 310;

//set chart margins as % of svg dimensions
const chartMargin = {
  top:    0.10 * svgHeight,
  right:  0.05 * svgWidth,
  bottom: 0.10 * svgHeight,
  left:   0.05 * svgWidth
};

//set chart size based on chart margins and svg dimantions
const chartWidth = svgWidth - (chartMargin.right + chartMargin.left);
const chartHeight = svgHeight - (chartMargin.top + chartMargin.bottom);

d3Chart.create = function(htmlElement, props){
  // calculate domains and ranges from data passed in props
  const xDomain = getXDomain(props.data);
  const xRange = [0, chartWidth];
  const yDomain = getYDomain(props.data);
  const yRange = getYRange(props.data);

  //generate scales from domains and ranges
  const yScale = d3.scaleOrdinal(yRange).domain(yDomain);
  const xScale = d3.scaleBand().rangeRound(xRange).padding(0.1).domain(xDomain);

  //generate d3 axes from d3 scales
  const yAxis = d3.axisLeft().scale(yScale);
  const xAxis = d3.axisBottom(xScale);

  const barWidth = xScale.bandwidth().toString();
  const yInterval = chartHeight / (yDomain.length - 1);
  const yMax = Math.max(...props.data);

  //creates svg element and appends to html element passed in as argument
  this.svg =  d3.select(htmlElement)
                .append('svg')
                .attr('class', 'svg-container')
                .attr('preserveAspectRatio', 'xMinYMin meet')
                .attr('viewBox', `0 0 ${svgWidth} ${svgHeight}`)
                .style('background', 'white');

  //creates and centers title
  const titleDimensions = measure(props.title, 'chart-title');
  const middle = chartWidth / 2;
  const titleRight = (middle - titleDimensions.width / 2).toString();
  const titleVertical = (7 * svgHeight / 100).toString();
  this.svg.append('text')
          .text(props.title)
          .attr('class', 'chart-title')
          .attr('x', titleRight)
          .attr('y', titleVertical);

  //appends element that will contain the data bars
  this.chart = this.svg.append('g').attr('class', 'chart-display')
                       .attr('transform', `translate(${chartMargin.left},${chartMargin.top})`);
  //append y axis
  this.chart.append('g').attr('class', 'axis')
            .call(yAxis);
  //append x axis
  this.chart.append('g')
            .attr('class', 'axis')
            .attr('transform', `translate(0 ,${chartHeight})`) //puts axis on bottom of chart
            .attr('id', 'xAxis')
            .call(xAxis);

  // this.bars = this.chart.append('g');

  const yCoord = val => yScale(yMax - val - 1).toString();
  const xCoord = idx => xScale(xDomain[idx]).toString();

  const drawBar = (val, idx) => {
    this.chart.append('rect').attr('class', 'bar')
    .attr('x', `${xCoord(idx)}`)
    .attr('y', `${yScale(val)}`)
    .attr('width', barWidth)
    .attr('height', `${yInterval * val}`);
  };
  // debugger;
  props.data.forEach( (value, index) => { drawBar(value, index); } );

  //label only some bars
  // //TODO: make this responsive to data length
  // //TODO: add for y axis
  // let xTicks = document.querySelector('#xAxis').querySelectorAll('.tick');
  // for (var i = 0; i < xTicks.length; i++) {
  //   if(i%5){
  //     xTicks[i].style.display = 'none';
  //   }
  // }
};

d3Chart.update = function(htmlElement, data, title){
  // debugger;
  if ( !data || !htmlElement ){return;}
  if(this.svg){ this.svg.remove(); } //remove old
  let newProps = {data: data, title: title}
  this.create(htmlElement, newProps);
}

d3Chart.remove = function(){
  this.svg.remove();
}

// create domains and ranges from array of data
// dataArr must be an array of integers

// returns an array of the most recent n days (where n is the length of
// the data array) as strings in the format 'Jan 15'
const getXDomain = (dataArr) => {
  return ['yes', 'no'];
  // const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  // let domain = []
  // let oneDay = 1000 * 60 * 60 * 24 // 1 day in ms
  // let today = new Date();
  // let numDays = dataArr.length - 1;
  // //start at first day of range
  // let dateObj = new Date( today - numDays * oneDay );
  // //loop through until today and create axis label from date object
  // for(var i = 0; i < dataArr.length; i++){
  //   let month = dateObj.getMonth();
  //   let day = dateObj.getDate();
  //   let dateLabel = months[month] + ' ' + day.toString();
  //   domain.push(dateLabel);
  //   //step forward one day
  //   dateObj = new Date(dateObj - (-oneDay) ); // why dont I just add you ask...
  // }
  // return domain;
}

// returns array of all integers in range (0..MAX(ARR))
const getYDomain = (dataArr) => {
  let domain = []
  let max = Math.max(...dataArr);
  for(var i = max; i >= 0; i--){
    domain.push(i);
  }
  if (max === 0){ return [0, 0];}
  return domain;
}

// returns an array of pixel values evenly distributed over the chart
// height for each integer in the y domain
const getYRange = (dataArr) => {
  let range = [];
  let max = Math.max(...dataArr);
  let fraction =  1 / max;
  for(var i = 0; i <= max; i++){
    range.push(i * fraction * chartHeight);
  }
  if (max === 0){ return [0, chartHeight]; }
  return range;
}

// measures text to center text element on chart
function measure(text, classname) {
  if(!text || text.length === 0){ return {height: 0, width: 0}; }
  // debugger;

  let container = d3.select('body').append('svg').attr('class', classname);
  container.append('text').text(text).attr({x: -1000, y: -1000});

  let box = container.node().getBBox();
  container.remove();

  return {height: box.height, width: box.width};
}
