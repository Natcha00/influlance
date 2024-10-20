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
            background: "linear-gradient(to left, #ffafcc, #E0479E)",
            padding: "1.5rem",
            borderRadius: "12px",
          }}
        >
          <Row justify="center" align="middle" gutter={24}>
            <Col xs={24} md={12} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Title level={2} style={{ color: "#fff", textAlign: screen.xs ? "center" : undefined }}>
                สมัครเป็น <span style={{ color: "#FFCE1B" }}>Influencer</span> กับเรา <br />
                เพื่อเชื่อมต่อคุณกับแบรนด์ที่ถูกใจ
              </Title>
              <Paragraph style={{ color: "#fff", fontSize: "18px", textAlign: screen.xs ? "center" : undefined }}>
                ยินดีต้อนรับสู่ Influlance!
                ที่นี่คือที่ที่คุณสามารถเชื่อมต่อกับแบรนด์ที่กำลังมองหาคุณ
                ไม่ว่าคุณจะเป็นอินฟลูเอนเซอร์ที่มีประสบการณ์หรือเพิ่งเริ่มต้น
                คุณจะพบโอกาสที่เหมาะสมสำหรับการสร้างรายได้จากความสามารถของคุณ
              </Paragraph>
              <Button type="primary" size="large" style={{ justifySelf: 'center' }}>
                เริ่มต้น
              </Button>
            </Col>
            <Col xs={24} md={12}>
              <img
                src={BannerImage}
                alt="Marketer"
                style={{
                  width: "100%",
                  borderRadius: "12px"
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
