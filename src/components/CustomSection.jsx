import React from 'react'


function CustomSection(props) {
    return (
        <section className='flex justify-center'>
            <div className='bg-system-section-white absolute top-24 w-3/4 self-center h-5/6 p-8 rounded-md'>
                <h1 className='text-3xl font-semibold mb-8'>{props.title}</h1>
                {props.children}
            </div>
        </section>
    )
}

export default CustomSection