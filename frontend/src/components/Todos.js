import React from 'react'


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


const TodoList = ({items}) => {
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

export default TodoList;
