import React, { useEffect } from 'react'

function Logout() {
    useEffect(() => {
        window.localStorage.clear();
        window.location.href = "/login"
    }, [])
    return (
        <div>Logout</div>
    )
}

export default Logout