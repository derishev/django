import React from 'react'


const UserItem = ({item}) => {
    return (
        <tr>
            <td>
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
        <div className="main-container">
            <table className="table table-bordered table-hover">
                <thead className="table-light">
                <tr>
                    <th>
                        Username
                    </th>
                    <th>
                        First name
                    </th>
                    <th>
                        Last name
                    </th>
                    <th>
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