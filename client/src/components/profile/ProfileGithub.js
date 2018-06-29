import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class ProfileGithub extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientId: '26c196bacea7db10cf48',
      clientSecret: '0885cb690e07d2a93a6afb0891fb552fd9f7aa53',
      count: 5,
      sort: 'created: asc',
      repos: []
    };
  }

  componentDidMount() {
    // console.log(
    //   'ProfileGithub.js - componentDidMount props :' +
    //     JSON.stringify(this.props)
    // );
    const { username } = this.props;
    const { count, sort, clientId, clientSecret } = this.state;
    //console.log('username: ' + username + ' AND ${sort}=' + sort);
    //const urlx = `https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`;
    //console.log('urlx: ' + urlx);

    fetch(
      `https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`
    )
      .then(res => res.json())
      .then(data => {
        if (this.refs.myRef) {
          this.setState({ repos: data });
        }
      })
      .catch(err => console.log(err));
  }

  onGitClick(gitRepoUrl) {
    //console.log('onGitClick : ' + gitRepoUrl);
    window.open(gitRepoUrl, '_blank');
  }

  render() {
    const { repos } = this.state;

    const repoItems = repos.map(repo => (
      <div key={repo.id} className="card card-body mb-2">
        <div className="row">
          <div className="col-md-6">
            <h4>{repo.name}</h4>
            <button
              type="button"
              onClick={() => this.onGitClick(repo.html_url)}
              className="btn btn-outline-info btn-sm"
            >
              Git-Repo
            </button>

            <p>{repo.description}</p>
          </div>
          <div className="col-md-6">
            <span className="badge badge-info mr-1">
              Stars: {repo.stargazers_count}
            </span>
            <span className="badge badge-secondary mr-1">
              Watchers: {repo.watchers_count}
            </span>
            <span className="badge badge-success">
              Forks: {repo.forks_count}
            </span>
          </div>
        </div>
      </div>
    ));
    return (
      <div ref="myRef">
        <hr />
        <h3 className="mb-4">Latest Github Repos</h3>
        {repoItems}
        <br />
        <br />
      </div>
    );
  }
}

ProfileGithub.propTypes = {
  username: PropTypes.string.isRequired
};

export default ProfileGithub;
