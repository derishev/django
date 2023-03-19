import {useLocation} from "react-router-dom";
import React from "react";

export default function PageNotFound404() {
    const url = useLocation();
    return (
        <div className="main-container">
            <h3 className="text-danger">Страница по адресу {`<${url.pathname}>`} не найдена</h3>
        </div>
    )
}