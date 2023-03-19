import React from 'react'

export default class ProjectForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            projectData: {
                name: '',
                href: '',
                users: []
            }
        }
    }

    handleChange(event) {
        const projectData = this.state.projectData;
        if (event.target.name === 'users') {
            //
            const selected = document.querySelectorAll('#select-users option:checked');
            projectData[event.target.name] = Array.from(selected).map(el => el.value);
        } else {
            projectData[event.target.name] = event.target.value
        }
        this.setState({'projectData': projectData});
    }

    handleSubmit(event) {
        event.preventDefault();
        // console.log(this.state.projectData)
        this.props.createProject(this.state.projectData);
    }

    render() {
        return (
            <div className="main-container">
                <form onSubmit={(event) => this.handleSubmit(event)}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name project</label>
                        <input type="text" name="name" className="form-control"
                               onChange={(event) => this.handleChange(event)}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="href" className="form-label">Link to repository</label>
                        <input type="text" name="href" className="form-control"
                               onChange={(event) => this.handleChange(event)}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="users" className="form-label">Users</label>
                        <select className="form-select" name="users" multiple id="select-users"
                                onChange={(event) => this.handleChange(event)}>
                            {this.props.users.map((user, key) => (
                                <option value={user.username} key={key}>{user.username}</option>
                            ))}
                        </select>
                    </div>
                     <div className="mb-3">
                        <input className="btn btn-success" type="submit" value="Submit"/>
                    </div>
                </form>
            </div>
        );
    }
}