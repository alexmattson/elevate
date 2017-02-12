import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class Navbar extends Component {

  renderLinks() {
    if (this.props.authenticated) {
      return (<li className="navbar-item">
        <Link className="navbar-link" to="/dashboard">Dashboard</Link>        
        <Link className="navbar-link" to="/calendar">Calendar</Link>        
        <Link className="navbar-link" to="/new-task">New Task</Link>        
        <Link className="navbar-link" to="/signout">Sign Out</Link>
      </li>);
    } else {
      return [
        <li className="navbar-item" key={1}>
          <Link className="navbar-link" to="/get-started">Get Started</Link>
        </li>
      ];
    }
  }

  render() {
    return (
      <header className="navbar">
        <Link to="/" className="navbar-logo">
            <img src="http://res.cloudinary.com/stellar-pixels/image/upload/v1486929017/logo_l9b0p5.svg" alt="" className="img-logo"/>        
        </Link>
        <ul className="navbar-nav">
          {this.renderLinks()}
        </ul>
      </header>
    );
  }
}

export default Navbar;