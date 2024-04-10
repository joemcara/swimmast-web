import React, { useEffect } from 'react'

function PageNotFound() {
    useEffect(() => {
        setTimeout(() => {
            window.location.replace("/");
        }, 500)
    }, [])
    return (
        <div className='fixed w-screen h-screen bg-system-menu-blue top-0 left-0 flex items-center justify-center'>
            <h1 className='text-3xl text-system-section-white'>404 NOT FOUND</h1>
        </div>
    )
}

export default PageNotFound