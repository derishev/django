import React from "react";
import './ToDoListApp.css';
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate
} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import axios from "axios";
import Cookies from "universal-cookie/lib";
import {ProjectDetail, ProjectList} from "./components/Projects";
import PageNotFound404 from "./components/PageNotFound404";
import LoginForm from "./components/LoginForm";
import UserList from "./components/Users";
import TodoList from "./components/Todos";
import ProjectForm from "./components/ProjectForm";
import TodoForm from "./components/TodoForm";


// ----------------------------------------------------------------------------
const BASE_API_URL = "http://127.0.0.1:8000/api/";
const BASE_NAME_COOKIES = "ToDoList";
// ----------------------------------------------------------------------------
export default class ToDoListApp extends React.Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
        this.getProject = this.getProject.bind(this);
        this.createProject = this.createProject.bind(this);
        this.createTodo = this.createTodo.bind(this);
        this.searchTextChanged = this.searchTextChanged.bind(this);
        this.state = {
            auth: {username: "", isAuth: false},
            navbarItems: [
                {name: "Projects", href: "/"},
                {name: "Users", href: "/users"},
                {name: "Todos", href: "/todos"}
            ],
            project: {},
            projects: [],
            searchText: "",
            searchList: [],
            todos: [],
            users: [],
        }
    }

    getHeaders() {
        let headers = {'Content-Type': 'application/json'}
        if (this.state.auth.isAuth) {
            const cookies = new Cookies()
            headers['Authorization'] = `Token ${cookies.get(`${BASE_NAME_COOKIES}token`)}`;
        }
        return headers
    }

    loadData() {
        if (this.state.auth.isAuth) {
            const headers = this.getHeaders();

            // ToDo Можно написать единую функцию получения данных по имени
            axios.get(`${BASE_API_URL}projects/`, {headers})
                .then(response => {
                    this.setState({projects: response.data.results, searchList: response.data.results})
                })
                .catch(error => console.log(error))

            axios.get(`${BASE_API_URL}users/`, {headers})
                .then(response => {
                    this.setState({users: response.data.results})
                })
                .catch(error => console.log(error))

            axios.get(`${BASE_API_URL}todos/`, {headers})
                .then(response => {
                    this.setState({todos: response.data.results})
                })
                .catch(error => console.log(error))
        } else {
            this.setState({projects: [], users: [], todos: []})
        }
    }

    createProject(projectData) {
        if (!this.state.auth.isAuth) return null;
        const headers = this.getHeaders();
        axios.post(`${BASE_API_URL}projects/`, projectData, {headers})
            .then(response => {
                let newProject = response.data;
                this.setState(
                    {projects: [...this.state.projects, newProject]}
                );
                window.location.href = '/';
            })
            .catch(error => console.log(error))
    }

    createTodo(todoData) {
        if (!this.state.auth.isAuth) return null;
        const headers = this.getHeaders();
        axios.post(`${BASE_API_URL}todos/`, todoData, {headers})
            .then(response => {
                let newTodo = response.data;
                this.setState(
                    {todos: [...this.state.todos, newTodo]}
                );
                window.location.href = '/todos';
            })
            .catch(error => console.log(error))
    }

    deleteProject(id) {
        const headers = this.getHeaders();
        axios.delete(`${BASE_API_URL}projects/${id}/`, {headers})
            .then(() => {
                this.setState({projects: this.state.projects.filter((item) => item.id !== id)})
            })
            .catch(error => console.log(error));
    }

    findProject(text) {
        let filterProjects = this.state.searchList
        if (text !== '') {
            filterProjects = filterProjects.filter((item) => item.name.includes(text));
        }
        this.setState({projects: filterProjects})
    }

    searchTextChanged(text) {
        this.setState({searchText: text});
        this.findProject(text);
    }

    deleteTodo(url) {
        const headers = this.getHeaders();
        axios.delete(`${url}`, {headers})
            .then(() => {
                this.setState({todos: this.state.todos.filter((item) => item.url !== url)})
            })
            .catch(error => console.log(error))
    }

    setAuthState(username, isAuth) {
        this.setState(
            {auth: {username: username, isAuth: isAuth}},
            () => this.loadData()
        )
    }

    login(username, password) {
        axios.post(`${BASE_API_URL}token-auth/`, {username: username, password: password})
            .then(response => {
                const cookies = new Cookies();
                cookies.set(`${BASE_NAME_COOKIES}token`, response.data.token);
                cookies.set(`${BASE_NAME_COOKIES}username`, username);
                this.setAuthState(username, true);
            }).catch(error => {
            console.log(error);
            alert("Check username and password");
        })
    }

    logout() {
        const cookies = new Cookies();
        cookies.remove(`${BASE_NAME_COOKIES}token`);
        cookies.remove(`${BASE_NAME_COOKIES}username`);
        this.setAuthState('', false)
        window.location.href = '/login';
    }

    getTokenFromStorage() {
        const cookies = new Cookies()
        const isAuth = !!cookies.get(`${BASE_NAME_COOKIES}token`)
        const username = cookies.get(`${BASE_NAME_COOKIES}username`)
        this.setAuthState(username, isAuth)
    }

    getProject(id) {
        if (!this.state.auth.isAuth) return null;
        const headers = this.getHeaders();
        axios.get(`${BASE_API_URL}projects/${id}/`, {headers})
            .then(response => {
                this.setState({project: response.data})
            })
            .catch(error => {
                console.log(error)
            })
    }

    componentDidMount() {
        this.getTokenFromStorage();
    }

    render() {
        return (
            <div className="wrapper">
                <Router>
                    <Header
                        auth={this.state.auth}
                        logout={this.logout}
                        navbarItems={this.state.navbarItems}
                    />
                    <Routes>
                        <Route exact path="/" element={
                            <ProjectList
                                items={this.state.projects}
                                deleteProject={(id) => this.deleteProject(id)}
                                isAuth={this.state.auth.isAuth}
                                searchTextChanged={this.searchTextChanged}
                            />
                        }/>
                        <Route exact path="/users" element={<UserList items={this.state.users}/>}/>
                        <Route exact path="/todos" element={
                            <TodoList
                                items={this.state.todos}
                                deleteTodo={(url) => this.deleteTodo(url)}
                                isAuth={this.state.auth.isAuth}
                            />
                        }/>
                        <Route exact path="/projects/:id" element={
                            <ProjectDetail
                                getProject={this.getProject}
                                item={this.state.project}
                            />
                        }/>
                        <Route exact path="/login" element={
                            this.state.auth.isAuth ? <Navigate replace to="/"/> :
                                <LoginForm login={(username, password) => this.login(username, password)}/>
                        }/>
                        <Route path="/projects/create" element={
                            <ProjectForm
                                users={this.state.users}
                                createProject={this.createProject}
                            />
                        }/>
                        <Route path="/todos/create" element={
                            <TodoForm
                                projects={this.state.projects}
                                createTodo={this.createTodo}
                            />
                        }/>
                        <Route path="/projects" element={<Navigate replace to="/"/>}/>
                        <Route exact path="*" element={<PageNotFound404/>}/>
                    </Routes>
                    <Footer/>
                </Router>
            </div>
        )
    }
}