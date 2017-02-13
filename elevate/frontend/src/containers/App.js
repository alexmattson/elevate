import React, { Component, PropTypes } from 'react';
import routeConfig from '../common/routeConfig';
import Header from '../components/Header';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.node,
  };

  render() {
    return (
      <div className="app">
        <Header routes={routeConfig} />
        <div className="page-container">
          {this.props.children}
        </div>
      </div>
    );
  }
}
