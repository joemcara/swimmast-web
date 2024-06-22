import React, { useEffect } from 'react'
import Menu from './Menu'
import { Outlet } from 'react-router-dom'
import Layout from '../components/Layout'
import MenuMovil from './MenuMovil'

function Base() {
    useEffect(() => {
        if (window.localStorage.getItem('token') === null) window.location.href = '/login'
    }, [])
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