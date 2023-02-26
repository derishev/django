import './App.css';
import React from 'react';

import Header from "./components/Header";
import {BrowserRouter as Router, Route, Routes, useLocation, Navigate} from "react-router-dom";
import {ProjectList, ProjectDetail} from "./components/Projects";
import UserList from "./components/Users";
import TodoList from "./components/Todos";
import Footer from "./components/Footer";

// ----------------------------------------------------------------------------

function App() {
    return (
        <div className="App wrapper">
            <Router>
                <Header/>
                <Routes>
                    <Route exact path="/" element={<ProjectList/>}/>
                    <Route exact path="/users" element={<UserList/>}/>
                    <Route exact path="/todos" element={<TodoList/>}/>
                    <Route exact path="/projects/:id" element={<ProjectDetail/>}/>

                    <Route path="/projects" element={<Navigate replace to="/" />} />
                    <Route exact path="*" element={<PageNotFound404/>}/>
                </Routes>
            </Router>
            <Footer/>
        </div>
    )
}

// ----------------------------------------------------------------------------
/**
 * The function of rendering page content when the path is incorrect.
 */
function PageNotFound404() {
    const url = useLocation();
    return (
        <div>
            <h3>Страница по адресу {`<${url.pathname}>`} не найдена</h3>
        </div>
    )
}

// ----------------------------------------------------------------------------
export default App;
