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
            {window.localStorage.getItem("token") && <>
                <Menu />
                <MenuMovil />
                <div className='lg:ml-64 bg-[#F1F3F5] min-h-screen pt-4'>
                    {/* <Layout /> */}
                    <Outlet />
                </div>
            </>}
        </div>
    )
}

export default Base