import { Text, TextInput } from '@mantine/core'
import React, { lazy, useEffect } from 'react'
import { CustomButton, LoginPasswordInput, LoginTextInput } from '../components/CustomInputs'
import snachesOrcasLogo from '../assets/snachesOrcasLogo.png';
import { NavLink } from 'react-router-dom';
import loginImage1 from '../assets/loginImage1.png'
import loginImage2 from '../assets/loginImage2.png'
import loginImage3 from '../assets/loginImage3.png'


function Login() {
    function login() {
        window.localStorage.setItem('token', 'token')
        window.location.href = '/'
    }
    return (
        <main className='h-screen grid bg-system-section-white sm:grid-cols-6'>
            <section className="sm:col-span-3 flex flex-col items-center gap-y-6 justify-center ">
                <img alt="snaches-orcas" src={snachesOrcasLogo} className='h-48 w-48 object-contain' />
                <h1 className='text-button-color font-semibold text-6xl mb-8'>SWIMMAST</h1>
                <div className='w-full flex flex-col items-center gap-6'>
                    <LoginTextInput label='Usuario' placeholder='Ingrese su usuario' />
                    <LoginPasswordInput label='Contraseña' placeholder='Ingrese su contraseña' />
                    <CustomButton text='INGRESAR' onClick={login} />
                </div>
            </section>
            <section className='h-32 hidden sm:col-span-3 sm:flex h-screen sm:flex-col justify-end items-end'>
                <img src={loginImage1} loading='lazy' alt="loginImage1" className='h-2/6 w-full object-fit' />
                <img src={loginImage2} loading='lazy' alt="loginImage2" className='h-2/6 w-full object-fit' />
                <img src={loginImage3} loading='lazy' alt="loginImage3" className='h-2/6 w-full object-fit' />
            </section>
        </main>
    )
}

export default Login