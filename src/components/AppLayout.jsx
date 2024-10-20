import React, { useEffect } from "react";
import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint'
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { setIsAuth } from "../slices/authSlice";

function AppLayout({ children }) {
  const screen = useBreakpoint()
  const dispatch = useDispatch()
  useEffect(() => {
    if (!!Cookies.get('email')) {
      dispatch(setIsAuth(true))

    }
  }, [Cookies.get('email')])
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content style={{ padding: screen.sm ? '2rem 14rem' : '1rem' }}>{children}</Content>
    </Layout>
  );
}

export default AppLayout;
