import React from 'react'
import snachesOrcasLogo from '../assets/snachesOrcasLogo.png';
import CustomNavLink from '../components/CustomNavLink';
import { Accordion, Group } from '@mantine/core';
import { Icon123, IconAddressBook, IconLogout, IconPlus, IconSwimming, IconUser, IconUserEdit, IconUserFilled } from '@tabler/icons-react';
import { CustomAccordionItem } from '../components/CustomAccordion';

const iconSize = 35;

const icons = {
    "SWIMMER": <IconUser size={iconSize} />,
    "COURSE": <IconSwimming size={iconSize} />,
    "REGISTER": <IconAddressBook size={iconSize} />,
    "UPDATE": <IconUserEdit size={iconSize} />,
    "LOGOUT": <IconLogout size={iconSize} />,

}

function Menu() {
    return (
        <div className='bg-system-menu-gray w-72 min-h-screen fixed top-0 left-0 flex flex-col items-center hidden lg:flex text-white' >
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
                        pl={12}
                        icon={icons["SWIMMER"]}
                    />
                    <CustomNavLink
                        to="/cursos"
                        text="Cursos"
                        pl={12}
                        icon={icons["COURSE"]}
                    />
                    <CustomAccordionItem
                        value="register"
                        label="Registrar"
                        icon={icons["REGISTER"]}
                    >
                        <CustomNavLink
                            to="/registrar"
                            text="Registrar nadador"
                            pl={20}
                        />
                        <CustomNavLink
                            to="/registrar"
                            text="Registrar usuario"
                            pl={20}
                        />
                    </CustomAccordionItem>
                    <CustomAccordionItem
                        value="update"
                        label="Actualizar"
                        icon={icons["UPDATE"]}
                    >
                        <CustomNavLink
                            to="/actualizar"
                            text="Actualizar nadador"
                            pl={20}
                        />
                        <CustomNavLink
                            to="/actualizar"
                            text="Actualizar usuario"
                            pl={20}
                        />
                    </CustomAccordionItem>
                </Accordion>
                <div className='absolute bottom-0'>
                    <CustomNavLink
                        text="Cerrar sesión"
                        to="/logout"
                        icon={icons["LOGOUT"]}
                        pl={12}
                    />
                </div>
            </nav>

        </div>
    )
}

export default Menu