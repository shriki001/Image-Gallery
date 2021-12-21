import React, { Component } from "react";
import { Redirect } from "react-router";
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from "react-redux";
import { SignIn, ResetErrors } from '../store/actions/authAction';

/*
* component that handle the login page
*/
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
    }

    handleChange = e => this.setState({ [e.target.id]: e.target.value })

    handleSubmit = e => {
        e.preventDefault();
        const { ResetErrors, SignIn } = this.props;
        ResetErrors();
        SignIn(this.state);
    };

    render() {
        const { authError, auth } = this.props;
        if (auth.uid) return <Redirect to={{ pathname: '/gallery' }} />;
        return (
            <div style={{ maxWidth: '50%', margin: '150px auto' }}>
                <form onSubmit={this.handleSubmit}>
                    <h2 className="sr-only">Login Form</h2>
                    <div className="illustration">
                        <h3>Image Gallery App</h3>
                    </div>
                    {authError ? <p className='red-text'>{authError}</p> : null}
                    <div className="form-group" style={{
                        background: 'white',
                        color: 'black'
                    }}>
                        <input className="form-control" type="email" id="email" placeholder="Email"
                            required onChange={this.handleChange} />
                    </div>
                    <div className="form-group password-wrapper" style={{
                        background: 'white',
                        color: 'black'
                    }}>
                        <input className="form-control input" type="password" id="password"
                            placeholder="Password"
                            required onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <button className="btn-primary btn-block notScale" type="submit">Log In</button>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        authError: state.auth.authError,
        auth: state.firebase.auth
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        SignIn: (creds) => dispatch(SignIn(creds)),
        ResetErrors: () => dispatch(ResetErrors())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
