import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class Header extends Component {

  renderLinks() {
    if (this.props.authenticated) {
      return (<li className="header-item">
        <Link className="header-link" to="/dashboard">Dashboard</Link>        
        <Link className="header-link" to="/calendar">Calendar</Link>        
        <Link className="header-link" to="/new-task">New Task</Link>        
        <Link className="header-link" to="/signout">Sign Out</Link>
      </li>);
    } else {
      return [
        <li className="header-item" key={1}>
          <Link className="header-link" to="/get-started">Get Started</Link>
        </li>
      ];
    }
  }

  render() {
    return (
      <header className="header">
        <Link to="/" className="header-logo">
            <img src="http://res.cloudinary.com/stellar-pixels/image/upload/v1486929017/logo_l9b0p5.svg" alt="" className="img-logo"/>        
        </Link>
        <ul className="header-nav">
          {this.renderLinks()}
        </ul>
      </header>
    );
  }
}

export default (Header);