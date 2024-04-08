import React from 'react'
import Menu from './Menu'
import { ActionIcon, Avatar } from '@mantine/core'
import { IconCaretDown } from '@tabler/icons-react'
import { Outlet } from 'react-router-dom'
import Layout from '../components/Layout'

function Base() {
    return (
        <div className=''>
            <Menu />
            <div className='ml-72 min-h-screen'>
            <Layout/>
                <Outlet />
            </div>
        </div>
    )
}

export default Base