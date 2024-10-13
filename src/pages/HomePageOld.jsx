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
} from "antd";
import "./style.css";
import { useNavigate } from "react-router-dom";

const { Header, Content, Footer } = Layout;
const { Title, Paragraph } = Typography;

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Navigation Buttons */}

      <Row gutter={12} justify={"center"}>
        <Col>
          <Button
            type="primary"
            onClick={() => navigate("profile-information")}
          >
            profile-information
          </Button>
        </Col>
        <Col>
          <Button type="primary" onClick={() => navigate("profile")}>
            profile
          </Button>
        </Col>
        <Col>
          <Button type="primary" onClick={() => navigate("content-feed")}>
            content-feed
          </Button>
        </Col>
        <Col>
          <Button type="primary" onClick={() => navigate("work-space")}>
            work-space
          </Button>
        </Col>
        <Col>
          <Button type="primary" onClick={() => navigate("finance")}>
            finance
          </Button>
        </Col>
      </Row>

      {/* Main Content */}
      {/* Introduction Section */}

      <Row justify="center" gutter={[16, 16]}>
        <Col span={12}>
          <Title level={2}>Welcome to Influlance</Title>
          <Paragraph>
            Influlance
            เป็นตลาดกลางที่เชื่อมต่อและทำให้แบรนด์กับอินฟลูเอนเซอร์สามารถทำงานร่วมกันได้
            ไม่ว่าคุณจะเป็นแบรนด์ที่ต้องการโปรโมตสินค้าหรือเป็นอินฟลูเอนเซอร์ที่กำลังมองหาโอกาสใหม่
            ๆ Influlance ทำให้ทุกอย่างง่ายและมีประสิทธิภาพ
          </Paragraph>
          <Button type="primary" size="large">
            Get Started
          </Button>
        </Col>
        <Col span={12}>
          <Image
            width={200}
            height={200}
            src="error"
            fallback="/Users/pinpin/Desktop/Hippo_influlance/Hippo_influlance/picture/BannerTest.png"
          />
        </Col>
      </Row>

      {/* Section 1 */}
      <Row justify="center" gutter={[16, 16]} style={{ marginTop: "40px" }}>
        <Col span={12}>
          <Card
            hoverable
            style={{
              borderRadius: "15px",
              textAlign: "center",
              padding: "30px",
            }}
            bodyStyle={{ backgroundColor: "#E3F5FF" }}
          >
            <img
              src="path_to_influencer_image"
              alt="Influencer"
              style={{ width: "100%", height: "auto", borderRadius: "15px" }}
            />
            <Title level={3} style={{ marginTop: "20px", color: "#00A8FF" }}>
              สมัครเป็น Influencer
            </Title>
            <Paragraph>รับงานรีวิวสินค้าจากแบรนด์คุณภาพได้ทันที</Paragraph>
            <Button type="primary" shape="round" size="large">
              เริ่มต้น
            </Button>
          </Card>
        </Col>
        <Col span={12}>
          <Card
            hoverable
            style={{
              borderRadius: "15px",
              textAlign: "center",
              padding: "30px",
            }}
            bodyStyle={{ backgroundColor: "#FFE3F5" }}
          >
            <img
              src="path_to_marketer_image"
              alt="Marketer"
              style={{ width: "100%", height: "auto", borderRadius: "15px" }}
            />
            <Title level={3} style={{ marginTop: "20px", color: "#FF00A8" }}>
              เปิดบัญชีเป็น Marketer
            </Title>
            <Paragraph>เพื่อเริ่มสร้างแคมเปญรีวิวสินค้า</Paragraph>
            <Button type="primary" shape="round" size="large">
              เริ่มต้น
            </Button>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default HomePage;
