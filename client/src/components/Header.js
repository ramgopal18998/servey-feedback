import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments';

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return <a href="/auth/google">Login with Google</a>;
      default:
        return [
          <li key="1">
            <Payments />
          </li>,
          <li key="4"><Link to={"/surveys"}>DashBoard</Link></li>,
          <li key="3" style = {{margin: '0 10px'}}>Credits:&nbsp;&nbsp;{this.props.auth.credits}</li>,
          <li key="2"><a href="/api/logout">Logout</a></li>
        ];
    }
  }
  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <Link to={this.props.auth ? '/surveys' : '/'} className="brand-logo">
            Emaily
          </Link>
          <ul className="right">
            <li>{this.renderContent()}</li>
          </ul>
        </div>
      </nav>
    );
  }
}
function mapStateToProps(state) {
  return { auth: state.auth };
}
export default connect(mapStateToProps)(Header);
