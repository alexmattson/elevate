import React, { Component, PropTypes } from 'react';
import routeConfig from '../common/routeConfig';
import Navbar from '../components/Navbar';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.node,
  };

  render() {
    let style = (this.props.routes[0].path === '/' && ! window.currentUser) ? {backgroundColor: '#6CB2DD'} : {backgroundColor: '#fbfbfc'};    
    return (
      <div className="app" style={style}>
        <Navbar routes={routeConfig} />
        <div className="page-container">
          {this.props.children}
        </div>
      </div>
    );
  }
}
