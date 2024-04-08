import React from 'react'
import { NavLink } from 'react-router-dom'
import snachesOrcasLogo from '../assets/snachesOrcasLogo.png';
import CustomNavLink from '../components/CustomNavLink';
function Menu() {
    const navItemStyles = "pl-12 h-12 flex items-center text-lg";
    return (
        <div className='bg-system-menu-blue w-72 min-h-screen fixed top-0 left-0 flex flex-col gap-6 items-center hidden lg:flex' >
            <a href="/">
                <img alt="snaches-orcas" src={snachesOrcasLogo} className='mt-8 h-56 w-56 object-contain' />
            </a>
            <h3 className='text-3xl text-white font-semibold'>ADMIN</h3>
            <nav className='flex flex-col text-white w-full gap-4'>
                <CustomNavLink
                    to="/"
                    text="Inicio"
                    pl={12}
                />
                <CustomNavLink
                    to="/registrar"
                    text="Registrar"
                    pl={12}
                />
                <CustomNavLink
                    to="/actualizar"
                    text="Actualizar"
                    pl={12}
                />
                <CustomNavLink
                    to="/cursos"
                    text="Cursos"
                    pl={12}
                />
            </nav>
        </div>
    )
}

export default Menu