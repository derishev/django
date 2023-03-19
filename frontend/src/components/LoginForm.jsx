import React from 'react';


export default class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
        }
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        // console.log('submitLoginState', this.state);
        this.props.login(this.state.username, this.state.password);
        event.preventDefault();
    }

    render() {
        return (
            <div className="main-container text-center">
                <form onSubmit={(event) => this.handleSubmit(event)}>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input type="text" name="username" id="username"
                               onChange={(event) => this.handleChange(event)}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" name="password" id="password"
                               onChange={(event) => this.handleChange(event)}/>
                    </div>
                    <div>

                        <input className="btn btn-success" type="submit" value="Submit"/>
                    </div>
                </form>
            </div>
        )
    }
}