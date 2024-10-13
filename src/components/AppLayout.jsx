import React from "react";
import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint'

function AppLayout({ children }) {
    const screen = useBreakpoint()
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content style={{padding:screen.sm?'2rem 16rem':'1rem'}}>{children}</Content>
    </Layout>
  );
}

export default AppLayout;
