import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import PropTypes from 'prop-types';
import {getProfileByHandle} from '../../actions/profileActions'
import ProfileHeader from "./ProfileHeader";
import ProfileCreds from "./ProfileCreds";
import ProfileGithub from "./ProfileGithub";
import ProfileAbout from "./ProfileAbout";

class Profile extends Component {

    componentDidMount() {
        if (this.props.match.params.handle) {
            this.props.getProfileByHandle(this.props.match.params.handle)
        }
    }

    render() {
        return (
            <div>
                <ProfileHeader/>
                <ProfileAbout/>
                <ProfileCreds/>
                <ProfileGithub/>
            </div>
        );
    }
}

Profile.propTypes = {
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile
});

export default connect(mapStateToProps, {getProfileByHandle})(Profile);