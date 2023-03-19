import React from "react";
import {NavLink} from "react-router-dom";


function NavbarItem({name, href}) {
    return (
        <li className="nav-item">
            <NavLink to={href} className="nav-link">{name}</NavLink>
        </li>
    )
}

function AuthButton({auth, logout}) {
    if (auth.isAuth) {
        return (
            <button type="button" className="button-auth btn btn-outline-danger" onClick={() => logout()}>
                &laquo;{auth.username}&raquo; Logout
            </button>
        )
    } else {
        return (
            <button type="button" className="button-auth btn btn-outline-success" onClick={() => {window.location.href = '/login'}}>
                Login
            </button>
        )
    }
}

function Header({navbarItems, auth, logout}) {
    return (
        <div className="header-container">
            <nav className="navbar navbar-expand-lg navbar-light fw-bolder">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    {navbarItems.map((item) => <NavbarItem
                        name={item.name}
                        href={item.href}
                        key={item.name}
                    />)}
                </ul>
            </nav>
            <AuthButton auth={auth} logout={logout}/>
        </div>
    )
}


export default Header;