import './App.css';
import React from 'react';

import Header from "./components/Header";
import {BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom";
import {ProjectList, ProjectDetail} from "./components/Projects";
import UserList from "./components/Users";
import TodoList from "./components/Todos";
import Footer from "./components/Footer";
import Login from "./components/Login";
import {getResponseStatus, PageNotFound404} from "./components/Base";
import Cookies from "universal-cookie/lib";


const SERVER_URL = 'http://127.0.0.1:8000/api/'


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: [],
            todos: [],
            users: [],
            todoUsername: ''
        }
    }

    isAuthenticated() {
        return !!this.state.todoToken;
    }

    getHeaders() {
        let headers = {
            'Content-Type': 'application/json'
        }
        if (this.isAuthenticated()) {
            headers['Authorization'] = `Token ${this.state.todoToken}`;
        }
        return headers
    }

    loadData() {
        if (!this.isAuthenticated()) {
            return;
        }

        const headers = this.getHeaders()
        fetch(`${SERVER_URL}projects/`, {headers})
            .then(getResponseStatus)
            .then(response => response.json())
            .then((response) => {
                    this.setState({projects: response.results})
                }
            ).catch(error => console.log(error));

        fetch(`${SERVER_URL}todos/`, {headers})
            .then(getResponseStatus)
            .then(response => response.json())
            .then((response) => {
                    this.setState({todos: response.results})
                }
            ).catch(error => console.log(error));

        fetch(`${SERVER_URL}users/`, {headers})
            .then(getResponseStatus)
            .then(response => response.json())
            .then((response) => {
                    this.setState({users: response.results})
                }
            ).catch(error => console.log(error));
    }

    setToken(token = '') {
        const cookies = new Cookies()
        cookies.set('todoToken', token)
        this.setState({'todoToken': token}, () => this.loadData())
    }

    logout() {
        this.setToken('');
        localStorage.setItem('todoUsername', '');
        window.location.href = '/login';
    }

    getServerToken(username, password) {
        fetch(`${SERVER_URL}token-auth/`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({username: username, password: password})
        })
            .then(response => response.json())
            .then(response => {
                this.setToken(response["token"])
            })
            .then(() => window.location.href = '/')
            .catch(error => console.log(error))

        localStorage.setItem('todoUsername', username);
    }

    getClientToken() {
        const cookies = new Cookies()
        const token = cookies.get('todoToken')
        this.setState({'todoToken': token}, () => this.loadData())
    }

    componentDidMount() {
        this.getClientToken();
        this.setState({'todoUsername': localStorage.getItem('todoUsername')})
    }

    render() {
        return (
            <div className="App wrapper content">
                <Router>
                    <div className={"container d-flex justify-content-between"}>
                        <Header/>
                        <div>
                            {this.isAuthenticated() ?
                                <button type="button" className={"btn btn-outline-danger"}
                                        onClick={() => this.logout()}>
                                    {this.state.todoUsername} Logout
                                </button> :
                                <button type="button" className={"btn btn-outline-success"} onClick={() => {
                                    window.location.href = '/login'
                                }}>
                                    Login
                                </button>
                            }
                        </div>
                    </div>
                    <Routes>
                        <Route exact path="/" element={<ProjectList items={this.state.projects}/>}/>
                        <Route exact path="/users" element={<UserList items={this.state.users}/>}/>
                        <Route exact path="/todos" element={<TodoList items={this.state.todos}/>}/>
                        <Route exact path="/projects/:id" element={<ProjectDetail headers={this.getHeaders()}/>}/>

                        <Route exact path="/login" element={
                            <Login callback={(username, password) => this.getServerToken(username, password)}/>
                        }/>

                        <Route path="/projects" element={<Navigate replace to="/"/>}/>
                        <Route exact path="*" element={<PageNotFound404/>}/>
                    </Routes>
                </Router>
                <Footer/>
            </div>
        )
    }
}

export default App;