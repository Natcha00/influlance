import React from 'react'
import { Layout } from 'antd'


function AppLayout({ children }) {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            {children}
        </Layout>
    )
}

export default AppLayout