import React from "react";
import {
  Layout,
  Menu,
  Button,
  Typography,
  Row,
  Col,
  Card,
  Divider,
  Tag,
  Image,
} from "antd";
import { useNavigate } from "react-router-dom";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import BannerImage from "/Banner_Influ.gif";

const { Header, Content, Footer } = Layout;
const { Title, Paragraph } = Typography;

const InfluencerHomePage = () => {
  const navigate = useNavigate();
  const screen = useBreakpoint();
  return (
    <>
      {/* <Row gutter={12}>
        <Col>
          <Button
            type="primary"
            onClick={() => navigate("/profile-information")}
          >
            profile-information
          </Button>
        </Col>
        <Col>
          <Button type="primary" onClick={() => navigate("/profile")}>
            profile
          </Button>
        </Col>
        <Col>
          <Button type="primary" onClick={() => navigate("/content-feed")}>
            content-feed
          </Button>
        </Col>
        <Col>
          <Button type="primary" onClick={() => navigate("/work-space")}>
            work-space
          </Button>
        </Col>
        <Col>
          <Button type="primary" onClick={() => navigate("/finance")}>
            finance
          </Button>
        </Col>
      </Row> */}
      {/* Content */}

      <Content>
        {/* Hero Section */}
        <div
          style={{
            background: "linear-gradient(to right, #e05780, #eaf2d7)",
            padding: "1.5rem",
            borderRadius: "12px",
          }}
        >
          <Row justify="center" align="middle" gutter={24}>
            <Col
              xs={24}
              md={12}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Title
                level={3}
                style={{
                  color: "#fff",
                  textAlign: screen.xs ? "center" : undefined,
                }}
              >
                สมัครเป็น <span style={{ color: "#FFCE1B" }}>Influencer</span>{" "}
                กับเรา <br />
                เพื่อเชื่อมต่อคุณกับแบรนด์ที่ถูกใจ
              </Title>
              <Paragraph
                style={{
                  color: "#fff",
                  fontSize: "14px",
                  textAlign: screen.xs ? "center" : undefined,
                }}
              >
                ยินดีต้อนรับสู่ Influlance!
                ที่นี่คือที่ที่คุณสามารถเชื่อมต่อกับแบรนด์ที่กำลังมองหาคุณ
                ไม่ว่าคุณจะเป็นอินฟลูเอนเซอร์ที่มีประสบการณ์หรือเพิ่งเริ่มต้น
                คุณจะพบโอกาสที่เหมาะสมสำหรับการสร้างรายได้จากความสามารถของคุณ
              </Paragraph>
              <Button
                type="primary"
                size="large"
                style={{ justifySelf: "center" }}
              >
                เริ่มต้น
              </Button>
            </Col>
            <Col xs={24} md={12}>
              <img
                src={BannerImage}
                alt="Marketer"
                style={{
                  width: "100%",
                  borderRadius: "12px",
                }}
              />
            </Col>
          </Row>
        </div>

        {/* Features Section */}
        <div style={{ marginTop: "50px" }}>
          <Divider orientation="left" style={{ fontSize: "24px" }}>
            ทำไมต้องใช้ Influlance?
          </Divider>
          <Row justify="center" gutter={[16, 16]}>
            <Col xs={24} md={8}>
              <Card
                title="โอกาสการทำงานที่หลากหลาย"
                bordered={false}
                style={{
                  textAlign: "center",
                  background: "#141414",
                  color: "#fff",
                }}
              >
                อินฟลูเอนเซอร์สามารถเข้าถึงงานจากแบรนด์ต่างๆ
                ที่ตรงกับความสนใจและความสามารถ ช่วยเพิ่มโอกาสในการทำงาน
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card
                title="จัดการงานอย่างเป็นระบบ"
                bordered={false}
                style={{
                  textAlign: "center",
                  background: "#141414",
                  color: "#fff",
                }}
              >
                Influlance ช่วยให้คุณจัดการงานได้อย่างเป็นระเบียบในที่เดียว
                ลดความยุ่งยากในการสื่อสารกับหลายๆ แบรนด์
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card
                title="ระบบการชำระเงินที่ปลอดภัย"
                bordered={false}
                style={{
                  textAlign: "center",
                  background: "#141414",
                  color: "#fff",
                }}
              >
                เว็บไซต์มีระบบเครดิตที่ช่วยให้การชำระเงินเป็นไปอย่างสะดวกและปลอดภัย
                อินฟลูเอนเซอร์มั่นใจว่าจะได้รับค่าตอบแทนตามที่ตกลงกันไว้หลังจากส่งมอบงาน
              </Card>
            </Col>
          </Row>
        </div>
      </Content>
    </>
  );
};

export default InfluencerHomePage;
