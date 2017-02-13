import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class Header extends Component {

  renderLinks() {
    if (this.props.authenticated) {
      return (<li className="header-item">
        <Link className="header-link" to="/signout">Sign Out</Link>
      </li>);
    } else {
      return [
        <li className="header-item" key={1}>
          <Link className="header-link" to="/signin">Sign In</Link>
        </li>,
        <li className="header-item" key={2}>
          <Link className="header-link" to="/signup">Sign Up</Link>
        </li>
      ];
    }
  }

  render() {
    return (
      <header className="header">
        <Link to="/" className="header-logo">
            <img src="http://res.cloudinary.com/stellar-pixels/image/upload/v1486929017/logo_abrv_lb2yb5.svg" alt="" className="img-logo"/>        
        </Link>
        <ul className="header-nav">
          {this.renderLinks()}
        </ul>
      </header>
    );
  }
}

export default (Header);