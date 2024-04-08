import React, { Component, useEffect } from 'react';
import {Avatar} from "@mantine/core"
import { IconCaretDown } from '@tabler/icons-react';

function Layout() {


const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

        return (
            <div className='w-full h-32 top-0 left-0 px-16 bg-system-layout-green flex justify-between items-center z-0'>
                <text className='mb-7 text-white text-3xl '>Snaches Orcas</text>
                <div className="mb-7 bg-system-menu-blue flex items-center gap-6 px-2 rounded-3xl">
                    <Avatar size={50} />
                  <IconCaretDown color="white" fill="white" size={35} /> 
                </div>
            </div>
        );
}

export default Layout;