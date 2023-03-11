import React, {useEffect, useState} from 'react'
import {Link, useParams} from "react-router-dom";


const ProjectItem = ({item}) => {
    return (
        <tr>
            <td>
                {item.id}
            </td>
            <td>
                <Link to={`/projects/${item.id}`}>{item.name}</Link>
            </td>
            <td>
                {item.users.join(', ')}
            </td>
            <td>
                <a href={item.href} target="_blank" rel="noreferrer noopener"
                   className={"text-secondary"}>{item.href}</a>
            </td>
        </tr>
    )
}


const ProjectList = ({items}) => {
    return (
        <div className={"container"}>
            <table className={"table table-bordered table-hover"}>
                <thead className={"table-light"}>
                <tr>
                    <th scope={"col"}>
                        ID
                    </th>
                    <th scope={"col"}>
                        Name project
                    </th>
                    <th scope={"col"}>
                        Users
                    </th>
                    <th scope={"col"}>
                        Link to repository
                    </th>
                </tr>
                </thead>
                <tbody>
                {items.map((item, index) => <ProjectItem item={item} key={index}/>)}
                </tbody>
            </table>
        </div>
    )
}

const ProjectDetail = ({headers}) => {
    let {id} = useParams();
    const [state, setState] = useState({
        "id": null,
        "users": [],
        "name": "",
        "href": ""
    });


    useEffect(() => {
        fetch(`http://127.0.0.1:8000/projects/${id}`, {headers})
            .then(response => response.json())
            .then((res) => setState(res)).catch(error => console.log(error))
    }, [id])

    return (
        <div className={"container"}>
            <h2>Информация о проекте {state.name}</h2>
            <div className="text-start">
                <p>
                    <mark>Участники проекта:</mark>
                    {state.users.join(', ')}</p>
                <p>
                    <mark>Наименование проекта:</mark>
                    {state.name}</p>
                <a href={state.href} target="_blank" rel="noreferrer noopener">Ссылка на репозиторий</a>
            </div>
        </div>
    )
}

export {ProjectList, ProjectDetail};
