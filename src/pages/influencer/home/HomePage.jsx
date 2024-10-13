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
import "./style.css";
import { useNavigate } from "react-router-dom";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";

const { Header, Content, Footer } = Layout;
const { Title, Paragraph } = Typography;

const HomePage = () => {
  const navigate = useNavigate();
  const screen = useBreakpoint();
  return (
    <>
      <Row gutter={12}>
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
      {/* Content */}

      <Row style={{ margin: "2rem 0" }}>
        <Image
          preview={false}
          width={"100%"}
          height={400}
          src="error"
          fallback="picture/BannerTest.png"
        />
      </Row>

      <Row
        justify={screen.xs ? "center" : "start"}
        gutter={[0, 0]}
        style={{ margin: "2rem 0" }}
      >
        <Col xs={24} md={18}>
          <Title level={2}>ยินดีต้อนรับเข้าสู่ Influlance</Title>
          <Paragraph>
            Influlance
            เป็นตลาดกลางที่เชื่อมต่อและทำให้แบรนด์กับอินฟลูเอนเซอร์สามารถทำงานร่วมกันได้
            ไม่ว่าคุณจะเป็นแบรนด์ที่ต้องการโปรโมตสินค้าหรือเป็นอินฟลูเอนเซอร์ที่กำลังมองหาโอกาสใหม่
            ๆ Influlance ทำให้ทุกอย่างง่ายและมีประสิทธิภาพ
          </Paragraph>
          {/* <Button type="primary" size="large">
                Get Started
              </Button> */}
        </Col>
      </Row>

      {/* Job Recommendations */}
      <>
        <Divider
          orientation="left"
          style={{ fontSize: "20px", margin: "2rem 0" }}
        >
          Newest Jobs For You
        </Divider>
        <Row justify="center" gutter={[16, 16]} style={{ margin: "2rem 0" }}>
          {/* Job Card Example */}
          {[...Array(6)].map((_, index) => (
            <Col key={index} xs={12} md={8}>
              <Card
                title="UX Designer"
                extra={<span>$200K</span>}
                actions={[
                  <Button type="primary">Apply</Button>,
                  <span>24 Applied</span>,
                ]}
                bordered={false}
                style={{
                  textAlign: "center",
                  background: "#141414",
                  color: "#fff",
                }}
              >
                <Tag color="blue">Fulltime</Tag>
                <Tag color="purple">Onsite</Tag>
                <Paragraph style={{ color: "#fff" }}>
                  Advoti Digital Agency
                </Paragraph>
              </Card>
            </Col>
          ))}
        </Row>
      </>

      {/* Footer */}
      {/* <Footer style={{ textAlign: "center" }}>
        Influlance ©2024 Created by Your Team
      </Footer> */}
    </>
  );
};

export default HomePage;
