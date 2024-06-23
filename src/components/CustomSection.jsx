import React from 'react'


function CustomSection(props) {
    return (
        <section className='flex justify-center'>
            <div className='bg-system-section-white absolute top-16 w-5/6 lg:top-24 lg:w-3/4 self-center lg:min-h-5/6 p-8 rounded-md'>
                <h1 className='text-xl lg:text-3xl font-semibold mb-8'>{props.title}</h1>
                {props.children}
            </div>
        </section>
    )
}

export default CustomSection