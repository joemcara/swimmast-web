import React from 'react'
import { NavLink } from 'react-router-dom';

function CustomNavLink(props) {
    const navItemStyles = "pl-2 h-12 flex items-center text-lg";
    return (
        <NavLink
            to={props.to}
            className={({ isActive }) => isActive ? `${navItemStyles} bg-system-menu-light-blue` : navItemStyles}
        >
            {props.text}
        </NavLink>
    )
}

export default CustomNavLink