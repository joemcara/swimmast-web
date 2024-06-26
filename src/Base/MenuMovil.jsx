import { ActionIcon, Drawer } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconMenu2, IconX } from '@tabler/icons-react'
import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import CustomNavLink from '../components/CustomNavLink'

function MenuMovil() {
    const [opened, { open, close }] = useDisclosure(false)
    let location = useLocation();
    useEffect(() => {
        close();
    }, [location])
    return (
        <>
            <div className='lg:hidden flex gap-2 items-center pt-2'>
                <ActionIcon onClick={open} className='lg:invisible visible' bg={"transparent"}>
                    <IconMenu2 color='#000' />
                </ActionIcon>
                <h1>Swimmast</h1>
            </div>
            <Drawer onClose={close} opened={opened} size={"10rem"} withCloseButton={false} styles={{
                content: { backgroundColor: "#15192F", color: "#fff" },
                body: { padding: 0, paddingTop: "12px" }
            }}
            >
                <div className='flex flex-col gap-8 w-full bg-system-menu-blue h-full'>
                    <div className='flex gap-2 items-center'>
                        <ActionIcon onClick={close} bg={"transparent"} >
                            <IconX color='#fff' />
                        </ActionIcon>
                        <h1>Swimmast</h1>
                    </div>
                    <nav className='flex flex-col gap-8'>
                        <CustomNavLink to="/" text="Nadadores" />
                        <CustomNavLink to="/cursos" text="Cursos" />
                        <CustomNavLink to="/registrar" text="Registrar" />
                        <CustomNavLink to="/actualizar" text="Actualizar" />
                    </nav>
                    <div className='bg-black'>
                        <div onClick={
                            (e) => {
                                window.localStorage.removeItem('token')
                                window.location.href = '/login'
                            }

                        }>Log out</div>
                    </div>
                </div>
            </Drawer>
        </>
    )
}

export default MenuMovil