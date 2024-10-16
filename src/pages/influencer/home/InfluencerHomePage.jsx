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
import BannerImage from '/BannerTest.png'

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
            background: "linear-gradient(to right, #7367F0, #E0479E)",
            padding: "60px",
            borderRadius: "12px",
          }}
        >
          <Row justify="center" align="middle" gutter={24}>
            <Col span={12}>
              <Title level={1} style={{ color: "#fff" }}>
                Reach Millions with Influlance
              </Title>
              <Paragraph style={{ color: "#fff", fontSize: "18px" }}>
                Start your campaign and connect with the best influencers in the
                industry to maximize your brand's reach.
              </Paragraph>
              <Button type="primary" size="large">
                Start Your Campaign
              </Button>
            </Col>
            <Col span={12}>
              <img
                src="https://source.unsplash.com/random/800x600"
                alt="Marketer"
                style={{ width: "100%", borderRadius: "12px" }}
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
      </Content>
    </>
  );
};

export default InfluencerHomePage;
