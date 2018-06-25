import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
//import axios from 'axios';
//import classnames from 'classnames';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  // If someone use URL host:port/register ... it should not take to register if already so
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }
  // If props changes from last to next, this function gets invoked automatically
  // We then load errors (of component state - in constructor) with the next
  // errors in application state (received from backend)
  componentWillReceiveProps(nextProps) {
    //console.log('componentWillReceiveProps ---' + JSON.stringify(nextProps));
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };
    //console.log('ABCD 1: ' + JSON.stringify(newUser));

    this.props.registerUser(newUser, this.props.history);

    // axios
    //   .post('/api/users/register', newUser)
    //   .then(res => console.log('res: ' + res.data))
    //   .catch(err => this.setState({ errors: err.response.data }));
  }

  render() {
    const { errors } = this.state;
    // Same  as const errors = this.state.errors; {} pulls it out

    // lets get the user >> const user = this.props.auth.user This is same as
    // const { user } = this.props.auth; // used for testing

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">
                Create your DevConnector account
              </p>
              <form noValidate onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="Name"
                  name="name"
                  type="text"
                  value={this.state.name}
                  onChange={this.onChange}
                  error={errors.name}
                />

                <TextFieldGroup
                  placeholder="Email Address"
                  name="email"
                  type="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  error={errors.email}
                  info="For your profile image to show up, use Gravatar email for now"
                />

                <TextFieldGroup
                  placeholder="Password"
                  name="password"
                  type="password"
                  value={this.state.password}
                  onChange={this.onChange}
                  error={errors.password}
                />

                <TextFieldGroup
                  placeholder="Confirm Password"
                  name="password2"
                  type="password"
                  value={this.state.password2}
                  onChange={this.onChange}
                  error={errors.password2}
                />
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// We take the name of the component.
Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

// If we want to get any of the state in our component then we have to create a funtion to mapStateToProps ..
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
// Puttig auth-state into a property called auth
// Then we can use it like this.props.auth.user etc.
// state.auth (auth property) comes from root reducer ... and then put
// mapStateToProps in connect to work. The auth on left of : is used in this component and can be named whatever

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
