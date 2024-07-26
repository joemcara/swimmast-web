import { Text } from '@mantine/core';
import { IconAddressBook, IconHelicopterLanding, IconLogout, IconReceipt, IconRegistered, IconStatusChange, IconSwimming, IconUpload, IconUser, IconUserEdit } from '@tabler/icons-react';
import React from 'react'
import { NavLink } from 'react-router-dom';




function CustomNavLink(props) {
    const navItemStyles = `${props.padding} h-12 flex items-center gap-2 ${props.icon ? "text-lg font-bold" : "text-md font-semibold"}`;
    return (
        <NavLink
            to={props.to}
            className={({ isActive }) => isActive ? `${navItemStyles} bg-[#818DA3]` : navItemStyles}
        >
            {props.icon}
            {props.text}
        </NavLink>
    )
}

export default CustomNavLink