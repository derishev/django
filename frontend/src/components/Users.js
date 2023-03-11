import React from 'react'


const UserItem = ({item}) => {
    return (
        <tr>
            <td scope={"row"}>
                {item.username}
            </td>
            <td>
                {item.username}
            </td>
            <td>
                {item.firstName}
            </td>
            <td>
                {item.lastName}
            </td>
            <td>
                {item.email}
            </td>
        </tr>
    )
}

const UserList = ({items}) => {
    return (
        <div className={"container"}>
            <table className={"table table-bordered table-hover"}>
                <thead className={"table-light"}>
                <tr>
                    <th scope={"col"}>
                        Username
                    </th>
                    <th scope={"col"}>
                        First name
                    </th>
                    <th scope={"col"}>
                        Last name
                    </th>
                    <th scope={"col"}>
                        Email
                    </th>
                </tr>
                </thead>
                <tbody>
                {items.map((item, index) => <UserItem item={item} key={index}/>)}
                </tbody>
            </table>
        </div>
    )
}
// ----------------------------------------------------------------------------
export default UserList;