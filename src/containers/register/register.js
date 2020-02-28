import React, { Component } from 'react';
import { Form, Alert, Button } from 'react-bootstrap';
import { API } from '../../config';
import { connect } from 'react-redux';

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            repassword: "",
            hasError: false
        }
    }

    handleEmail = event => {
        this.setState({ email: event.target.value });
    }

    handlePassword = event => {
        this.setState({ password: event.target.value });
    }

    handleRepassword = event => {
        this.setState({ repassword: event.target.value })
    }

    handleSubmit = event => {
        event.preventDefault();

        if (this.state.password !== this.state.repassword) {
            this.setState({ hasError: true, errorMessage: "Passwords don't match"});
            return;
        }

        // call api
        const requestOptions = {
            method: "POST",
            body: JSON.stringify(this.state),
            headers: {"Content-Type": "application/json"}
        }

        fetch(API + 'register', requestOptions)
            .then(res => {
                if (res.status !== 201) {
                    throw new Error("Register Failed");
                }
                return res.json()
            })
            .then(response => {
                // navigate to login page
                this.props.history.push('/login');
            })
            .catch(err => {
                this.setState({ hasError: true, errorMessage: "Register failed" })
            })

    }

    render() {
        return (
            <div className="container">
                {this.state.hasError ? 
                    <Alert variant="danger" onClick={() => this.setState({ hasError: false })}>{this.state.errorMessage}</Alert> : ""}
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
                    <Form.Label>Re-enter Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={this.state.repassword}
                        onChange={this.handleRepassword}
                    />
                    <br />
                    <Button type="submit" variant="outline-primary">Register</Button>
                </Form>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user
})

const mapDispatchToProps = {
    
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Register)