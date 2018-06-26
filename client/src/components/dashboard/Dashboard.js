import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCurrentProfile } from '../../actions/profileActions';
import Spinner from '../common/Spinner';

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent;

    if (profile === null || loading) {
      // Loading
      dashboardContent = <Spinner />;
    } else {
      // Check is logged in user has profile data.
      // Object.keys gets the  keys of the object. 0 means nothin exists
      if (Object.keys(profile).length > 0) {
        // There is a  profile
        dashboardContent = <h4> TODO: DISPLAY PROfiLE </h4>;
      } else {
        // There is no profile but logged in
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome {user.name} </p>
            <p>
              You have not yet setup a profile. Please enter and let's know you.
            </p>
            <Link to="./create-profile" className="btn btn-sm btn-info">
              Create Profile
            </Link>
          </div>
        );
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// We want to bring into Dashboard from Redux. For that we do
const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(Dashboard);
