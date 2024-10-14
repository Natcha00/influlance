import React from 'react'
import { Navigate } from 'react-router-dom'
import Cookies from 'js-cookie'

const ProtectedNoAuthRoute = ({ children }) => {
    const accessToken = Cookies.get("accessToken")

    if (accessToken) {
        return <Navigate to="/" />
    }

    return (
        <div>{children}</div>
    )
}

export default ProtectedNoAuthRoute