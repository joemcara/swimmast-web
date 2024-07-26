import React, { useEffect } from 'react'
import Menu from './Menu'
import { Outlet } from 'react-router-dom'
import Layout from '../components/Layout'
import MenuMovil from './MenuMovil'
import axios from 'axios'

function Base() {
    useEffect(() => {
        axios.get('administration/check_token_expiration/', { headers: { "Authorization": `Token ${window.localStorage.getItem("token")}` } }).then(res => {
            window.localStorage.setItem('user', res.data)
        }).catch(err => {
            console.log(err)
            window.localStorage.clear()
            window.location.href = '/login'
        })
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