import React, { useEffect } from 'react'
import snachesOrcasLogo from '../assets/snachesOrcasLogo.png';
import CustomNavLink from '../components/CustomNavLink';
import { Accordion } from '@mantine/core';
import { IconAddressBook, IconEdit, IconFileDescription, IconLogout, IconSchool, IconSwimming, IconUser, IconUserEdit } from '@tabler/icons-react';
import { CustomAccordionItem } from '../components/CustomAccordionItem';
import { useLocation } from 'react-router-dom';

const iconSize = 35;

const icons = {
    "SWIMMER": <IconUser size={iconSize} />,
    "COURSE": <IconSchool size={iconSize} />,
    "REGISTER": <IconFileDescription size={iconSize} />,
    "UPDATE": <IconEdit size={iconSize} />,
    "LOGOUT": <IconLogout size={iconSize} />,

}

function Menu() {
    let location = useLocation();
    return (
        <div className='bg-system-menu-gray w-64 min-h-screen fixed top-0 left-0 flex flex-col items-center hidden lg:flex text-white' >
            <div className='flex flex-col items-center mb-8'>
                <a href="/">
                    <img alt="snaches-orcas" src={snachesOrcasLogo} className='h-40 w-40 object-contain' />
                </a>
                <h3 className='text-3xl  font-semibold'>ADMIN</h3>
            </div>
            <nav className='flex flex-col text-white w-full '>
                <Accordion defaultValue={["register", "update"]} multiple >
                    <CustomNavLink
                        to="/"
                        text="Nadadores"
                        padding={"pl-8"}
                        icon={icons["SWIMMER"]}
                    />
                    <CustomNavLink
                        to="/cursos"
                        text="Cursos"
                        padding={"pl-8"}
                        icon={icons["COURSE"]}
                    />
                    <CustomAccordionItem
                        value="register"
                        label="Registrar"
                        icon={icons["REGISTER"]}
                        backgroundColor={location.pathname.includes("registrar") ? "#818DA3" : "#2C3E50"}
                    >
                        <CustomNavLink
                            to="/registrar-nadador"
                            text="Registrar nadador"
                            padding={"pl-16"}
                        />
                        <CustomNavLink
                            to="/registrar-curso"
                            text="Registrar curso"
                            padding={"pl-16"}
                        />
                    </CustomAccordionItem>
                    <CustomAccordionItem
                        value="update"
                        label="Actualizar"
                        icon={icons["UPDATE"]}
                        backgroundColor={location.pathname.includes("actualizar") ? "#818DA3" : "#2C3E50"}
                    >
                        <CustomNavLink
                            to="/actualizar-nadador"
                            text="Actualizar nadador"
                            padding={"pl-16"}
                        />
                        <CustomNavLink
                            to="/actualizar-curso"
                            text="Actualizar curso"
                            padding={"pl-16"}
                        />
                    </CustomAccordionItem>
                </Accordion>
                <div className='absolute bottom-0'>
                    <CustomNavLink
                        text="Cerrar sesión"
                        to="/logout"
                        icon={icons["LOGOUT"]}
                        padding={"pl-8"}
                    />
                </div>
            </nav>

        </div>
    )
}

export default Menu