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
      <Row gutter={12}>
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
      </Row>
      {/* Content */}

      <Content style={{ padding: "50px", margin: "2rem 0" }}>
        {/* Hero Section */}
        <div
          style={{
            background: "linear-gradient(to right, #ffafcc, #E0479E)",
            padding: "60px",
            borderRadius: "12px",
          }}
        >
          <Row justify="center" align="middle" gutter={24}>
            <Col span={12}>
              <Title level={1} style={{ color: "#fff" }}>
                เชื่อมต่อกับแบรนด์ที่ถูกใจ
              </Title>
              <Paragraph style={{ color: "#fff", fontSize: "18px" }}>
                ยินดีต้อนรับสู่ Influlance!
                ที่นี่คือที่ที่คุณสามารถเชื่อมต่อกับแบรนด์ที่กำลังมองหาคุณ
                ไม่ว่าคุณจะเป็นอินฟลูเอนเซอร์ที่มีประสบการณ์หรือเพิ่งเริ่มต้น
                คุณจะพบโอกาสที่เหมาะสมสำหรับการสร้างรายได้จากความสามารถของคุณ
              </Paragraph>
              <Button type="primary" size="large">
                เริ่มต้น
              </Button>
            </Col>
            <Col span={12}>
              <img
                src={BannerImage}
                alt="Marketer"
                style={{
                  width: "100%",
                  borderRadius: "12px",
                  position: "absolute",
                  top: "-150px",
                  right: "-40px",
                  zIndex: 1,
                }}
              />
            </Col>
          </Row>
        </div>

        {/* Job Recommendations */}
        <>
          <Divider
            orientation="left"
            style={{ fontSize: "20px", margin: "2rem 0" }}
          >
            แนะนำสำหรับคุณ
          </Divider>
          <Row justify="center" gutter={[16, 16]} style={{ margin: "2rem 0" }}>
            {/* Job Card Example */}
            {[...Array(6)].map((_, index) => (
              <Col key={index} xs={12} md={8}>
                <Card
                  title="ชื่องาน"
                  extra={<span>฿2000</span>}
                  actions={[<Button type="primary">เพิ่มเติม</Button>]}
                  bordered={false}
                  style={{
                    textAlign: "center",
                    background: "#141414",
                    color: "#fff",
                  }}
                >
                  <Paragraph style={{ color: "#fff" }}>ชื่อแบรนด์</Paragraph>
                  <Tag>ประเภทงาน</Tag>
                  <Tag>ประเภทงาน</Tag>
                </Card>
              </Col>
            ))}
          </Row>
        </>

        {/* Footer */}
        {/* <Footer style={{ textAlign: "center" }}>
        Influlance ©2024 Created by Your Team
      </Footer> */}
      </Content>
    </>
  );
};

export default InfluencerHomePage;
