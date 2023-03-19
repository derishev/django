import React from 'react'

export default class TodoForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            todoData: {
                text: '',
                project: null
            }
        }
    }

    handleChange(event) {
        const todoData = this.state.todoData;
        todoData[event.target.name] = event.target.value;
        this.setState({'todoData': todoData});
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log(this.state.todoData);
        this.props.createTodo(this.state.todoData);
    }

    render() {
        return (
            <div className="main-container">
                <form onSubmit={(event) => this.handleSubmit(event)}>
                    <div className="mb-3">
                        <label htmlFor="text" className="form-label">Note text</label>
                        <textarea name="text" className="form-control"
                        onChange={(event) => this.handleChange(event)}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="project" className="form-label">Project</label>
                        <select className="form-select" name="project"
                                onChange={(event) => this.handleChange(event)}>
                            <option value={null}> {null} </option>
                            {this.props.projects.map((project, key) => (
                                <option value={project.id} key={key}>{project.name}</option>
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