import React from 'react'
import Menu from './Menu'
import { Outlet } from 'react-router-dom'
import Layout from '../components/Layout'
import MenuMovil from './MenuMovil'

function Base() {
    return (
        <div className=''>
            <Menu />
            <MenuMovil />
            <div className='lg:ml-72 min-h-screen'>
                <Layout />
                <Outlet />
            </div>
        </div>
    )
}

export default Base