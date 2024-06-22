import { Text, TextInput } from '@mantine/core'
import React, { useEffect } from 'react'
import { CustomButton, LoginPasswordInput, LoginTextInput } from '../components/CustomInputs'
import snachesOrcasLogo from '../assets/snachesOrcasLogo.png';
import { NavLink } from 'react-router-dom';

function Login() {
    function login() {
        window.localStorage.setItem('token', 'token')
        window.location.href = '/'

    }
    return (
        <div className='h-screen grid bg-system-section-white sm:grid-cols-7'>
            <div className="sm:col-span-4 flex flex-col items-center justify-center gap-6">
                <img alt="snaches-orcas" src={snachesOrcasLogo} className='mt-8 h-32 w-32 object-contain' />
                <h1 className='text-button-color font-semibold text-5xl mb-8'>SWIMMAST</h1>
                <LoginTextInput label='Usuario' placeholder='Ingrese su usuario' />
                <LoginPasswordInput label='Contraseña' placeholder='Ingrese su contraseña' />
                <CustomButton text='INGRESAR' onClick={login} />
                <NavLink to={"/logout"}>
                    <p className='underline text-gray-400' >
                        ¿No tienes cuenta?, crea una
                    </p>
                </NavLink>
            </div>
        </div>
    )
}

export default Login