import React from 'react'
import Menu from './Menu'
import { ActionIcon, Avatar } from '@mantine/core'
import { IconCaretDown } from '@tabler/icons-react'
import { Outlet } from 'react-router-dom'
import MenuMovil from './MenuMovil'

function Base() {
    return (
        <div className=''>
            <Menu />
            <MenuMovil />
            <div className='lg:ml-72 min-h-screen'>
                <Outlet />
            </div>
        </div>
    )
}

export default Base