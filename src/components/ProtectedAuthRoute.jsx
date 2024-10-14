import React from 'react'
import { Navigate } from 'react-router-dom'
import Cookies from 'js-cookie'

const ProtectedAuthRoute = ({ children }) => {
    const accessToken = Cookies.get("accessToken")

    if (!accessToken) {
        return <Navigate to="/login" />
    }

    return (
        <div>{children}</div>
    )
}

export default ProtectedAuthRoute