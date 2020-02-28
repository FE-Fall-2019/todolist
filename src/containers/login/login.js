import React, { Component } from 'react';
import { Form, Alert, Button } from 'react-bootstrap';
import { API } from '../../config';
import { login } from '../../reducers/user/userActions'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            hasError: false
        }
    }

    handleEmail = event => {
        this.setState({ email: event.target.value });
    }

    handlePassword = event => {
        this.setState({ password: event.target.value });
    }

    handleSubmit = event => {
        event.preventDefault();

        // call api
        const requestOptions = {
            method: "POST",
            body: JSON.stringify(this.state),
            headers: {"Content-Type": "application/json"}
        }

        fetch(API + 'login', requestOptions)
            .then(res => {
                if (res.status !== 200) {
                    throw new Error("Login Failed");
                }
                return res.json()
            })
            .then(response => {
                // save response to the redux state
                localStorage.setItem("user", response.email);
                console.log(response);
                this.props.login(response);
                // navigate to main page
                this.props.history.push('/');
            })
            .catch(err => {
                this.setState({ hasError: true })
            })

    }

    render() {
        return (
            <div className="container">
                {this.state.hasError ? 
                    <Alert variant="danger" onClick={() => this.setState({ hasError: false })}>Login failed</Alert> : ""}
                <Form onSubmit={this.handleSubmit}>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="text"
                        value={this.state.email}
                        onChange={this.handleEmail}
                    />
                    <br />
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={this.state.password}
                        onChange={this.handlePassword}
                    />
                    <br />
                    <Button type="submit" variant="outline-primary">Login</Button>
                </Form>
                <br />
                <Link to="/register">Register new user</Link>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user
})

const mapDispatchToProps = {
    login
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)