import { Menu, Layout, Row, Col, Button } from "antd";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
  const location = useLocation()

  const mainPath = [
    {
      label: <div onClick={() => navigate("/influencer")}>ฉันเป็น Influencer</div>,
      isAuth: false,
    },
    {
      label: <div onClick={() => navigate("/marketer")}>ฉันเป็น Marketer</div>,
      isAuth: false,
    },
  ]

  const influItems = [
    {
      label: <div onClick={() => navigate("/influencer/login")}>เข้าสู่ระบบ</div>,
      isAuth: false,
    },
    {
      label: <div onClick={() => navigate("/influencer/register")}>สมัครสมาชิก</div>,
      isAuth: false,
    },
    {
      label: <div onClick={() => navigate("/influencer/content-feed")}>ค้นหางาน</div>,
      isAuth: true,
    },
    {
      label: <div onClick={() => navigate("/influencer/work-space")}>งานของฉัน</div>,
      isAuth: true,
    },
    {
      label: <div onClick={() => navigate("/influencer/finance")}>จัดการบัญชี</div>,
      isAuth: true,
    },
    {
      label: <div onClick={() => navigate("/influencer/profile")}>{email}</div>,
      isAuth: true,
    },
    {
      label: (
        <div
          onClick={() => {
            Cookies.remove("accessToken");
            Cookies.remove("email");
            Cookies.remove("role");
            dispatch(setIsAuth(false));
            navigate("/influencer/login"); // Optional: Redirect after logout
          }}
        >
          ออกจากระบบ
        </div>
      ),
      isAuth: true,
    },
  ];

  const marketerItems = [
    {
      label: <div onClick={() => navigate("/marketer/login")}>เข้าสู่ระบบ</div>,
      isAuth: false,
    },
    {
      label: <div onClick={() => navigate("/marketer/register")}>สมัครสมาชิก</div>,
      isAuth: false,
    },
    {
      label: <div onClick={() => navigate("/marketer/work-space")}>งานของฉัน</div>,
      isAuth: true,
    },
    {
      label: <div onClick={() => navigate("/marketer/finance")}>จัดการบัญชี</div>,
      isAuth: true,
    },
    {
      label: <div onClick={() => navigate("/marketer/profile")}>{email}</div>,
      isAuth: true,
    },
    {
      label: (
        <div
          onClick={() => {
            Cookies.remove("accessToken");
            Cookies.remove("email");
            Cookies.remove("role");
            dispatch(setIsAuth(false));
            navigate("/marketer/login"); // Optional: Redirect after logout
          }}
        >
          ออกจากระบบ
        </div>
      ),
      isAuth: true,
    },
  ]

  return (
    <Header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: screen.xs ? "0 1rem" : "0 14rem"
      }}
    >
      <Row style={{ cursor: 'pointer', width: "100%" }} justify={"space-between"} align={"middle"}>
        <Col xs={18} sm={4} style={{ display: 'flex', width: '100%', height: "100%" }}>
          <img
            src={Logo}
            alt="Logo"
            style={{ height: "100px", width: "95px" }}
            onClick={() => {
              if (location.pathname == '/') {
                navigate('/')
              } else if (location.pathname.includes('influencer')) {
                navigate('/influencer')
              } else if (location.pathname.includes('marketer')) {
                navigate('/marketer')
              } else {
                navigate('/')
              }
            }}
          />

        </Col>

        <Col xs={0} sm={20}>
          <Menu
            style={{ justifyContent: "flex-end" }}
            theme="dark"
            mode="horizontal"
            selectable={false}
            items={location.pathname == '/' ?
              mainPath :
              location.pathname.includes('influencer') ?
                influItems.filter((item) => item.isAuth === isAuth) :
                location.pathname.includes('marketer') ?
                  marketerItems.filter((item) => item.isAuth === isAuth) :
                  mainPath
            } // Filter based on authentication
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
            onClick={() => { }} // Add a function here to handle mobile menu toggle
          />
        </Col>
      </Row>
    </Header>
  );
}

export default Navbar;
