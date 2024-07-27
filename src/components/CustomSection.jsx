import { ActionIcon, Divider, TextInput } from '@mantine/core'
import { getHotkeyHandler } from '@mantine/hooks';
import { IconSearch, IconUser } from '@tabler/icons-react'
import React from 'react'
import { CustomSelect } from './CustomInputs';


function CustomSection(props) {
    const handleKeyDown = (event) => {
        if (props.filter?.search) props.getData()
    };
    const SEARCH = <ActionIcon onClick={props.getData} bg={"transparent"} >
        <IconSearch color='#818DA3' />
    </ActionIcon>

    return (
        <section className='flex justify-center '>
            <div className='bg-system-section-white w-5/6 lg:w-11/12 self-center lg:min-h-5/6 p-4 rounded-md'>
                <div className='flex gap-2 justify-between items-center'>
                    <div className='flex items-center gap-2'>
                        {props.icon}
                        <h1 className='text-xl lg:text-3xl font-bold'>{props.title}</h1>
                    </div>
                    {
                        props.update
                    }
                    {props.searchBar && <TextInput
                        placeholder={props.searchBar}
                        className='w-2/6'
                        radius={"sm"}
                        rightSection={SEARCH}
                        onChange={(e) => props.filter?.setSearch(e.currentTarget.value)}
                        onKeyDown={getHotkeyHandler([
                            ['Enter', handleKeyDown]
                        ])}
                    />}
                </div>
                <Divider my={6} size={5} color='#818DA3' />
                {props.children}
            </div>
        </section>
    )
}

export default CustomSection