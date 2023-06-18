import React, { useEffect, useState } from "react";
import { Route, Navigate } from 'react-router-dom';
import Login from "../pages/Login/login";

//function to retrieve token from local storage
const getToken = () => {
    if (typeof window === undefined) return false;
    else if (localStorage.getItem('token') || sessionStorage.getItem('token')) return localStorage.getItem('token') || sessionStorage.getItem('token');
    else return false;
};

//attach token to request header
// const attachTokenToHeaders = (headers) => {
//     const token = getToken();
//     if(token) {
//         headers['Authorization'] = `Bearer ${token}`;
//     }
//     return headers;
// };

const checkRole = (role) => {
    const token = getToken();
    if (token) {
        const decodedToken = decodeToken(token);
        const userRole = decodedToken.role;

        if (userRole === role) {
            return true;
        }
    }
}

const checkRoles = (roles) => {
    const token = getToken();
    if (token) {
        const decodedToken = decodeToken(token);
        const userRole = decodedToken.role;
        console.log('hano ni oggy!', roles, userRole);
        if (roles.find((role) => role === userRole)) {
            return true;
        }
    }
}

export const PublicRouteChecker = ({ element: Component, roles }) => {
    return <>
        {checkRoles(roles) ? <Navigate to="/dashboard" /> : <Component />}
    </>
};


export const ProtectedRoute = ({ element: Component, role }) => {
    return <>
        {checkRole(role) ? <Component /> : <Navigate to="/login" />}
    </>
};

const decodeToken = (token) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    const decodedToken = JSON.parse(window.atob(base64));
    return decodedToken;
};