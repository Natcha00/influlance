import { Menu, Layout } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import './style.css'

const { Header } = Layout;

function Navbar() {
    const navigate = useNavigate()
    const menuItems = [
        {
            label: <div onClick={() => navigate('/')}>Home</div>,
            key: "home",
        },
        {
            label: <div onClick={() => navigate('/login')}>Login</div>,
            key: "login"
        },
        {
            label: <div onClick={() => navigate('/register')}>Register</div>,
            key: "register"
        },
    ]
    return (
        <Header
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
        >
            <div className="logo" onClick={() => navigate('/')} />
            <Menu theme="dark" mode="horizontal" selectable={false} items={menuItems} />
        </Header>
    )
}

export default Navbar