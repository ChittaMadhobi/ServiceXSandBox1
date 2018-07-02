import React, { Component } from 'react';
// We have to fetch from redux and hence import connect
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import ProfileAbout from './ProfileAbout';
import ProfileCreds from './ProfileCreds';
import ProfileGithub from './ProfileGithub';
import ProfileHeader from './ProfileHeader';
import Spinner from '../common/Spinner';

import { getProfileByHandle } from '../../actions/profileActions';

class Profile extends Component {
  componentDidMount() {
    // console.log(
    //   'Profile componentDidMount [this.props.match.params.handle]' +
    //     this.props.match.params.handle
    // );
    // console.log('------------------------------------------');
    if (this.props.match.params.handle) {
      this.props.getProfileByHandle(this.props.match.params.handle);
      // console.log(
      //   'INSIDE -- this.props.match.params.handle: ' +
      //     this.props.match.params.handle
      // );
    }
  }

  // To redirect if someone gives fake profile name in URL (e.g. localhost:3000/profile/testxx)
  // then it redirects it to a error-page (not found) instead of spinner
  componentWillReceiveProps(nextProps) {
    // console.log(
    //   'Profile onClick View Profile - nextProp= ' + JSON.stringify(nextProps)
    // );
    // console.log('==============================================');
    // console.log(
    //   'Profile onClick View Profile - nextProp.profile= ' +
    //     JSON.stringify(nextProps.profile)
    // );
    if (nextProps.profile.profile === null && this.props.profile.loading) {
      this.props.history.push('/not-found');
    }
  }

  render() {
    const { profile, loading } = this.props.profile;

    // console.log('Profile - in render profile : ' + JSON.stringify(profile));
    // console.log(' ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
    // console.log('Profile - in render loading : ' + loading);
    let profileContent;

    if (profile === null || loading) {
      profileContent = <Spinner />;
    } else {
      profileContent = (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/profiles" className="btn btn-light mb-3 float-left">
                Back to Profiles
              </Link>
            </div>
            <div className="col-md-6" />
          </div>
          <ProfileHeader profile={profile} />
          <ProfileAbout profile={profile} />
          <ProfileCreds
            education={profile.education}
            experience={profile.experience}
          />
          {profile.githubusername ? (
            <ProfileGithub username={profile.githubusername} />
          ) : null}
          <br />
          <br />
          <br />
        </div>
      );
    }

    return (
      <div className="profile">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{profileContent}</div>
          </div>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  getProfileByHandle: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfileByHandle }
)(Profile);
