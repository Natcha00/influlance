import { Menu, Layout, Row, Col, Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { IoMdMenu } from "react-icons/io";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import { useDispatch, useSelector } from "react-redux";
import { setIsAuth } from "../slices/authSlice";
import Cookies from "js-cookie";
import Logo from "/Logo.png";
import Banner from "/pic_beauty.png";

const { Header } = Layout;

function Navbar() {
  const navigate = useNavigate();
  const screen = useBreakpoint();
  const { isAuth } = useSelector((state) => state.auth);
  const email = Cookies.get("email");
  const dispatch = useDispatch();

  const menuItems = [
    {
      label: <div onClick={() => navigate("/login")}>เข้าสู่ระบบ</div>,
      isAuth: false,
    },
    {
      label: <div onClick={() => navigate("/register")}>สมัครสมาชิก</div>,
      isAuth: false,
    },
    {
      label: <div onClick={() => navigate("/content-feed")}>ค้นหางาน</div>,
      isAuth: true,
    },
    {
      label: <div onClick={() => navigate("/work-space")}>งานของฉัน</div>,
      isAuth: true,
    },
    {
      label: <div onClick={() => navigate("finance")}>จัดการบัญชี</div>,
      isAuth: true,
    },
    {
      label: <div onClick={() => navigate("profile")}>{email}</div>,
      isAuth: true,
    },
    {
      label: (
        <div
          onClick={() => {
            Cookies.remove("accessToken");
            Cookies.remove("email");
            dispatch(setIsAuth(false));
            navigate("/login"); // Optional: Redirect after logout
          }}
        >
          ออกจากระบบ
        </div>
      ),
      isAuth: true,
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
          <img
            src={Logo}
            alt="Logo"
            style={{ height:"150px", width:"250px", top:"px"}}
             onClick={() => navigate("/")}
          />
         
        </Col>

        <Col xs={0} sm={18}>
          <Menu
            style={{ justifyContent: "flex-end" }}
            theme="dark"
            mode="horizontal"
            selectable={false}
            items={menuItems.filter((item) => item.isAuth === isAuth)} // Filter based on authentication
          />
        </Col>

        <Col
          xs={6}
          sm={0}
          style={{
            textAlign: "right",
            display: screen.xs ? "flex" : "none",
            justifyContent: "end",
          }}
        >
          <Button
            type="text"
            icon={<IoMdMenu style={{ fontSize: "24px", color: "white" }} />}
            onClick={() => {}} // Add a function here to handle mobile menu toggle
          />
        </Col>
      </Row>
    </Header>
  );
}

export default Navbar;
