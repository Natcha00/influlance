import React from 'react'
import { Navigate } from 'react-router-dom'
import Cookies from 'js-cookie'

const ProtectedInfluencerAuthRoute = ({ children }) => {
    const accessToken = Cookies.get("accessToken")
    const role = Cookies.get("role")
    if (!accessToken) {
        return <Navigate to="/influencer/login" />
    }

    if (role == "marketer") {
        return <Navigate to="/marketer" />
    }

    return (
        <div>{children}</div>
    )
}

export default ProtectedInfluencerAuthRoute