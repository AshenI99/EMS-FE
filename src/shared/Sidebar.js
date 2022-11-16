import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from '../helpers/withRouterHelper';
import {JWTReader} from "../helpers/JWTReader";

class Sidebar extends Component {

  state = {};

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    document.querySelector('#sidebar').classList.remove('active');
    Object.keys(this.state).forEach(i => {
      this.setState({[i]: false});
    });
  }

  render () {
    return (
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <ul className="nav mt-5">

          <li className={ this.isPathActive('/exams') ? 'nav-item active' : 'nav-item' }>
            <Link className="nav-link" to="/exams">
              <span className="menu-title">Exams</span>
              <i className="mdi mdi-book-open-page-variant menu-icon"></i>
            </Link>
          </li>

          {JWTReader(localStorage.getItem("token"))?.isAdmin ?
              <>
                <li className={ this.isPathActive('/create-exam') ? 'nav-item active' : 'nav-item' }>
                  <Link className="nav-link" to="/create-exam">
                    <span className="menu-title">Create Exams</span>
                    <i className="mdi mdi-book-open-page-variant menu-icon"></i>
                  </Link>
                </li>
              </>
          :
              <>
                <li className={ this.isPathActive('/my-exams') ? 'nav-item active' : 'nav-item' }>
                  <Link className="nav-link" to="/my-exams">
                    <span className="menu-title">My Exams</span>
                    <i className="mdi mdi-book-open-page-variant menu-icon"></i>
                  </Link>
                </li>

                <li className={ this.isPathActive('/my-results') ? 'nav-item active' : 'nav-item' }>
                  <Link className="nav-link" to="/my-results">
                    <span className="menu-title">My Results</span>
                    <i className="mdi mdi-book-open-page-variant menu-icon"></i>
                  </Link>
                </li>
              </>
          }

        </ul>
      </nav>
    );
  }

  isPathActive(path) {
    return this.props.location.pathname.startsWith(path);
  }

  componentDidMount() {
    this.onRouteChanged();
    // add class 'hover-open' to sidebar navitem while hover in sidebar-icon-only menu
    const body = document.querySelector('body');
    document.querySelectorAll('.sidebar .nav-item').forEach((el) => {
      
      el.addEventListener('mouseover', function() {
        if(body.classList.contains('sidebar-icon-only')) {
          el.classList.add('hover-open');
        }
      });
      el.addEventListener('mouseout', function() {
        if(body.classList.contains('sidebar-icon-only')) {
          el.classList.remove('hover-open');
        }
      });
    });
  }

}

export default withRouter(Sidebar);