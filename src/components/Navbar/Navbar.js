import React, {Component} from 'react';
import '../../../node_modules/materialize-css/dist/css/materialize.min.css';
import './Navbar.css';
import $ from 'jquery';
import '../../../node_modules/material-icons/iconfont/material-icons.css';

class Navbar extends Component {

  componentDidMount() {
    $(document)
      .ready(function () {
        $(".button-collapse").sideNav({
          menuWidth: 160,
          edge: 'left',
          closeOnClick: true,
          draggable: true,
          onOpen: function (el) {},
          onClose: function (el) {}
        });
      })
  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <a href="/" className="brand-logo">Web <span>Shop</span></a>
          <ul className="right hide-on-med-and-down">
            <li>
              <a
                className="waves-effect waves-light  waves-effect waves-light modal-trigger"
                href="#register">
                <i className="material-icons left">create</i>Register</a>
            </li>
            <li>
              <a
                className="waves-effect waves-light  waves-effect waves-light modal-trigger"
                href="#login">
                <i className="material-icons left">lock</i>Login</a>
            </li>
          </ul>
          <ul className="side-nav" id="mobile-demo">
            <li>
              <a
                className="waves-effect waves-light waves-effect waves-light modal-trigger"
                href="#register">Register</a>
            </li>
            <li>
              <a
                className="waves-effect waves-light waves-effect waves-light modal-trigger"
                href="#login">Login</a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;