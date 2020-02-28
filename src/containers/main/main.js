import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navbar, Nav, NavDropdown, Form, Button, Alert } from 'react-bootstrap';
import { API } from '../../config';
import { addTodo, loadTodo, completeTodo } from '../../reducers/user/userActions';

class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "",
            todoList: [],
            loading: true
        }
    }

    handleTitleChange = event => {
        this.setState({ title: event.target.value});
    }

    handleCreate = event => {
        event.preventDefault();

        if (this.state.title.length == 0) {
            return;
        }

        const newTodo = {
            userId: this.props.user.userId,
            title: this.state.title
        }

        const requestOptions = {
            method: "POST",
            body: JSON.stringify(newTodo),
            headers: {"Content-Type": "application/json"}
        }

        fetch(API + "todo/create", requestOptions)
            .then(res => {
                if (res.status !== 201) {
                    throw new Error("Not created.");
                }
                return res.json();
            })
            .then(response => {
                // save to global state
                this.props.addTodo(response);
            })
    }

    completeTodo = todo => {
        const requestOptions = {
            method: "PUT",
            body: JSON.stringify(todo),
            headers: {"Content-Type": "application/json"}
        }

        fetch(API + 'todo/complete', requestOptions)
            .then(res => {
                return res.json()
            })
            .then(response => {
                this.props.completeTodo(response);
            })
    }

    deleteTodo = todo => {
        return;
    }

    componentDidMount() {
        let user = localStorage.getItem('user');
        if (!user) {
            this.props.history.push('/login');
        }

        console.log(this.props.user.userId);

        fetch(API + 'todo/' + this.props.user.userId)
            .then(res => {
                if (res.status !== 200) {
                    throw new Error();
                }
                return res.json();
            })
            .then(response => {
                this.setState({ loading: false });
                this.props.loadTodo(response);
            })
            .catch(err => {
                console.log(err);
            })
    }

    logout = () => {
        localStorage.clear();
        this.props.history.push('/login');
    }

    render() {
        if (this.state.loading) {
            return (
                <div></div>
            )
        }
        return (
            <div>
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand>Todo List</Navbar.Brand>
                    <Navbar.Text>Welcome {this.props.user.email}!</Navbar.Text>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                        <NavDropdown title="Filter" id="basic-nav-dropdown">
                            <NavDropdown.Item onClick={this.displayIncomplete}>Incomplete Todos</NavDropdown.Item>
                            <NavDropdown.Item onClick={this.displayCompleted}>Completed Todos</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={this.logout}>Logout</NavDropdown.Item>
                        </NavDropdown>
                        </Nav>
                        <Form inline>
                        <Form.Control type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-success">Search</Button>
                        </Form>
                    </Navbar.Collapse>
                </Navbar>
                <div className="container">
                    <div className="create-todo">
                        <Form onSubmit={this.handleCreate}>
                            <Form.Label>Whatchoo wanna do?</Form.Label>
                            <Form.Control
                                type="text"
                                value={this.state.title}
                                onChange={this.handleTitleChange}
                            />
                            <br />
                            <Button variant="outline-secondary" type="submit">Create</Button>
                        </Form>
                    </div>
                    <div className="todo-list" style={{ marginTop: 20}}>
                        {this.props.user.todoList.length == 0 ? 
                            <Alert variant="success">You done! Go Home.</Alert> : ""}
                        {this.props.incompleteList.map(t => (
                            <div key={t.id}>
                                {t.title}
                                <br />
                                <Button onClick={() => this.completeTodo(t)}>Complete</Button><br />
                                <Button onClick={() => this.deleteTodo(t)} variant="outline-danger">Delete</Button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
    completedList: state.user.todoList.filter(t => t.completed),
    incompleteList: state.user.todoList.filter(t => !t.completed)
})

const mapDispatchToProps = {
    addTodo,
    loadTodo,
    completeTodo
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Main)