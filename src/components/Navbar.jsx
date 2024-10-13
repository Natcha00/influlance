import { Menu, Layout, Row, Col, Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { IoMdMenu } from "react-icons/io";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";

const { Header } = Layout;

function Navbar() {
  const navigate = useNavigate();
  const screen = useBreakpoint();
  const menuItems = [
    {
      label: <div onClick={() => navigate("/")}>Home</div>,
      key: "home",
    },
    {
      label: <div onClick={() => navigate("/login")}>Login</div>,
      key: "login",
    },
    {
      label: <div onClick={() => navigate("/register")}>Register</div>,
      key: "register",
    },
  ];
  return (
    <Header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: screen.xs ? "0 1rem" : "0 16rem",
      }}
    >
      <Row style={{ width: "100%" }} justify={"space-between"} align={"middle"}>
        <Col xs={18} sm={6}>
          <div className="logo" onClick={() => navigate("/")} />
        </Col>

        <Col xs={0} sm={18}>
          <Menu
            style={{ justifyContent: "flex-end" }}
            theme="dark"
            mode="horizontal"
            selectable={false}
            items={menuItems}
          />
        </Col>

        <Col
          xs={6}
          sm={0}
          style={{ textAlign: "right", display: "flex", justifyContent: "end",display:screen.xs?"block":"none" }}
        >
          <Button
            type="text"
            icon={<IoMdMenu style={{ fontSize: "24px", color: "white" }} />}
            onClick={() => {}}
          />
        </Col>
      </Row>
    </Header>
  );
}

export default Navbar;
