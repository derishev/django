import React, {useEffect, useState} from 'react'
import {Link, useParams} from "react-router-dom";


const ProjectItem = ({item, deleteProject}) => {
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
            <td>
                <button
                    className="btn btn-outline-danger"
                    onClick={() => deleteProject(item.id)}
                >Delete
                </button>
            </td>
        </tr>
    )
}


const ProjectList = ({items, deleteProject, isAuth, searchTextChanged}) => {
    const linkNewProject = isAuth ? <Link to="/projects/create">New Project</Link> : '';

    return (
        <div className="main-container">
            <div>
                <form className="form-inline mt2">
                    <input type="text" placeholder="Search"
                           onChange={(event) => {
                               searchTextChanged(event.target.value)
                           }}/>
                </form>
            </div>
            <table className={"table table-bordered table-hover"}>
                <thead className={"table-light"}>
                <tr>
                    <th>
                        ID
                    </th>
                    <th>
                        Name project
                    </th>
                    <th>
                        Users
                    </th>
                    <th>
                        Link to repository
                    </th>
                    <th>
                        Actions
                    </th>
                </tr>
                </thead>
                <tbody>
                {items.map((item, index) => <ProjectItem
                    item={item}
                    key={index}
                    deleteProject={deleteProject}
                />)}
                </tbody>
            </table>
            <div>
                {linkNewProject}
            </div>
        </div>
    )
}

function ProjectDetail({getProject, item}) {
    let {id} = useParams();
    const [state, setState] = useState({
        "id": null,
        "users": [],
        "name": "",
        "href": ""
    });

    useEffect(() => {
        getProject(id);
        setState(item);
    }, [state, id])

    return (
        <div className="main-container">
            <h2>Информация о проекте {item?.name}</h2>
            <div className="text-start">
                <p>
                    <mark>Участники проекта:</mark>
                    {item?.users?.join(', ')}</p>
                <p>
                    <mark>Наименование проекта:</mark>
                    {item?.name}</p>
                <a href={item?.href} target="_blank" rel="noreferrer noopener">Ссылка на репозиторий</a>
            </div>
        </div>
    )
}


export {ProjectList, ProjectDetail};