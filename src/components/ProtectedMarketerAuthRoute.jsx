import React from 'react'
import { Navigate } from 'react-router-dom'
import Cookies from 'js-cookie'

const ProtectedMarketerAuthRoute = ({ children }) => {
    const accessToken = Cookies.get("accessToken")
    const role = Cookies.get("role")
    if (!accessToken) {
        return <Navigate to="/marketer/login" />
    }

    if (role == "influencer") {
        return <Navigate to="/influencer" />
    }

    return (
        <div>{children}</div>
    )
}

export default ProtectedMarketerAuthRoute