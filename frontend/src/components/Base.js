import React from "react";
import {useLocation} from "react-router-dom";

function getResponseStatus(response) {
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return response;
}

function PageNotFound404() {
    const url = useLocation();
    return (
        <div>
            <h3>Страница по адресу {`<${url.pathname}>`} не найдена</h3>
        </div>
    )
}

export {getResponseStatus, PageNotFound404};