import './App.css';
import React from 'react';
import axios from 'axios';

import UserList from "./components/Users";
import {TopHeading, Footer} from "./components/staticTags";


const URL = 'http://127.0.0.1:8000/'
const URN_USERS = 'api/users/'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'users': []
        };
    }

    componentDidMount() {
        axios.get(`${URL}${URN_USERS}`)
            .then(response => {
                const users = response.data
                this.setState(
                    {
                        'users': users
                    }
                )
            }).catch(error => console.log(error));
    }

    render() {
        return (
            <div className="App">
                <TopHeading />
                <UserList users={this.state.users} />
                <Footer />
            </div>
        )
    }
}


export default App;
