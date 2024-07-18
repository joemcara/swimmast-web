import { Divider } from '@mantine/core'
import { IconUser } from '@tabler/icons-react'
import React from 'react'


function CustomSection(props) {
    return (
        <section className='flex justify-center items'>
            <div className='bg-system-section-white absolute top-16 w-5/6 lg:top-12 lg:w-3/4 self-center lg:min-h-5/6 p-8 rounded-md'>
                <div className='flex gap-2 justify-between items-center'>
                    <div className='flex items-center'>
                        {props.icon}
                        <h1 className='text-xl lg:text-4xl font-bold'>{props.title}</h1>
                    </div>
                    {props.searchBar}
                </div>
                <Divider my={32} size={5} color='#818DA3' />
                {props.children}
            </div>
        </section>
    )
}

export default CustomSection