import {NavLink} from "react-router-dom";
import React from "react";

export default function Header() {
    return (
        <div className={"header container"}>
            <nav className={"navbar navbar-expand-lg navbar-light fw-bolder"}>
                <ul className={"navbar-nav me-auto mb-2 mb-lg-0"}>
                    <li className={"nav-item"}>
                        <NavLink to={"/"} className="nav-link">Projects</NavLink>
                    </li>
                    <li className={"nav-item"}>
                        <NavLink to={"/users"} className="nav-link">Users</NavLink>
                    </li>
                    <li className={"nav-item"}>
                        <NavLink to={"/todos"} className="nav-link">Todos</NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    )
}
