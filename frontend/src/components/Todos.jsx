import React from 'react'
import {Link} from "react-router-dom";


const TodoItem = ({item, deleteTodo}) => {
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
            <td>
                <button
                    className="btn btn-outline-danger"
                    onClick={() => deleteTodo(item.url)}
                >Delete</button>
            </td>
        </tr>
    )
}


const TodoList = ({items, deleteTodo, isAuth}) => {
    const linkNewTodos = isAuth ? <Link to="/todos/create">New ToDo</Link> : '';
    return (
        <div className="main-container">
            <table className="table table-bordered table-hover">
                <thead className="table-light">
                <tr>
                    <th>
                        Author
                    </th>
                    <th>
                        Text
                    </th>
                    <th>
                        CreatedAt
                    </th>
                    <th>
                        UpdatedAt
                    </th>
                    <th>
                        Project
                    </th>
                    <th>
                        Actions
                    </th>
                </tr>
                </thead>
                <tbody>
                {items.map((item, index) => <TodoItem
                    item={item}
                    key={index}
                    deleteTodo={deleteTodo}
                />)}
                </tbody>
            </table>
            <div>
                {linkNewTodos}
            </div>
        </div>
    )
}

export default TodoList;