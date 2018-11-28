import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

class ProfileGithub extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clientId: 'f80a86809f7fc7e6c5f1',
            clientSecret: '7f0e67a42359f03426ec9a230d76ce932686c03f',
            count: 5,
            sort: 'created:asc',
            repos: []
        };
    }

    componentDidMount() {
        const {userName} = this.props;
        const {count, sort, clientId, clientSecret} = this.state;

        fetch(`https://api.github.com/users/${userName}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`)
            .then(res => res.json())
            .then(data => {
                this.setState({repos: data});
            }).catch(err => console.log(err));
    }

    render() {
        const {repos} = this.state;
        const repoItems = repos.map(repo => (
            <div key={repo.id} className="card card-body mb-2">
                <div className="row">
                    <div className="col-md-6">
                        <h4>
                            <Link to={repo.html_url} className="text-info" target="_blank" rel="noopener noreferrer">
                                {repo.name}
                            </Link>
                        </h4>
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
            <div>
                <hr/>
                <h3 className="mb-4">Latest Github Repos</h3>
                {repoItems}
            </div>
        );
    }
}

ProfileGithub.propTypes = {
    userName: PropTypes.string.isRequired
};

export default ProfileGithub;