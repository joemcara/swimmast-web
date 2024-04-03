import React from 'react'

function Section(props) {
    return (
        <section className='flex justify-center'>
            <div className='bg-system-section-white absolute top-24 w-3/4 self-center h-5/6 p-8 rounded-md'>
                <h1 className='text-2xl font-semibold'>{props.title}</h1>
                {props.children}
            </div>
        </section>
    )
}

export default Section