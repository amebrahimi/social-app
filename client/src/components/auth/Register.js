import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {registerUser} from "../../actions/authActions";
import PropTypes from 'prop-types';
import TextFieldGroup from "../common/TextFieldGroup";


class Register extends Component {
    // Creating Component State
    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
            password2: '',
            errors: {}
        }
    }

    onChange = e => {
        this.setState({[e.target.name]: e.target.value});
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({errors: nextProps.errors});
        }
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        }
    }

    onSubmit = e => {
        e.preventDefault();

        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        };

        this.props.registerUser(newUser, this.props.history);
    };

    render() {

        const {errors} = this.state;

        return (
            <div className="register">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Sign Up</h1>
                            <p className="lead text-center">Create your DevConnector account</p>
                            <form noValidate onSubmit={this.onSubmit}>
                                <TextFieldGroup placeholder="Name"
                                                onChange={this.onChange}
                                                value={this.state.name}
                                                name="name"
                                                error={errors.name}/>

                                <TextFieldGroup placeholder="Email"
                                                type="email"
                                                onChange={this.onChange}
                                                value={this.state.email}
                                                name="email"
                                                info="This site uses Gravatar so if you want a profile image, use a Gravatar email"
                                                error={errors.email}/>

                                <TextFieldGroup placeholder="Password"
                                                type="password"
                                                onChange={this.onChange}
                                                value={this.state.password}
                                                name="password"
                                                error={errors.password}/>

                                <TextFieldGroup placeholder="Confirm Password"
                                                type="password"
                                                onChange={this.onChange}
                                                value={this.state.password2}
                                                name="password2"
                                                error={errors.password2}/>
                                <input type="submit" className="btn btn-info btn-block mt-4"/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};


const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, {
    registerUser
})(withRouter(Register));