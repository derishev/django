import React from 'react'
// ----------------------------------------------------------------------------

const TodoItem = ({item}) => {
    return (
        <tr>
            <td>
                {item.author.username}
            </td>
            <td>
                {item.text}
            </td>
            <td>
                {item.createdAt}
            </td>
            <td>
                {item.updatedAt}
            </td>
            <td>
                {item.project}
            </td>
        </tr>
    )
}


class TodoList extends React.Component {
    state = {
        isLoaded: false,
        todos: []
    }

    componentDidMount() {
        fetch('http://127.0.0.1:8000/todos/')
            .then(response => response.json())
            .then(
                (res) => {
                    this.setState({
                        isLoaded: true,
                        todos: res.results
                    });
                }
            ).catch(error => console.log(error))
    }

    render() {
        const items = this.state.todos;
        return (
            <div className={"container"}>
                <table className={"table table-bordered table-hover"}>
                    <thead className={"table-light"}>
                    <tr>
                        <th scope={"col"}>
                            Author
                        </th>
                        <th scope={"col"}>
                            Text
                        </th>
                        <th scope={"col"}>
                            createdAt
                        </th>
                        <th scope={"col"}>
                            updatedAt
                        </th>
                        <th scope={"col"}>
                            project
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {items.map((item, index) => <TodoItem item={item} key={index}/>)}
                    </tbody>
                </table>
            </div>
        )
    }
}

// ----------------------------------------------------------------------------
export default TodoList;
