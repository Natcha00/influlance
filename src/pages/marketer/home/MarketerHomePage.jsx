import React from "react";
import { Layout, Row, Col, Button, Typography, Card, Divider } from "antd";
import { useNavigate } from "react-router-dom";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";

const { Content, Footer } = Layout;
const { Title, Paragraph } = Typography;

const MarketerHomePage = () => {
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
          <Button type="primary" onClick={() => navigate("/marketer-profile")}>
            profile
          </Button>
        </Col>
        {/* <Col>
          <Button type="primary" onClick={() => navigate("/create-work")}>
          create-work
          </Button>
        </Col>
        <Col>
          <Button type="primary" onClick={() => navigate("/check-work")}>
          check-work
          </Button>
        </Col> */}
        <Col>
          <Button type="primary" onClick={() => navigate("/marketer-work-space")}>
            work-space
          </Button>
        </Col>
        <Col>
          <Button type="primary" onClick={() => navigate("/finance")}>
            finance
          </Button>
        </Col>
      </Row>
      <Content style={{ padding: "50px", margin: "2rem 0" }}>
        {/* Hero Section */}
        <div
          style={{
            background: "linear-gradient(to right, #FFD700, #FFB6C1)",
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

        {/* Features Section */}
        <div style={{ marginTop: "50px" }}>
          <Divider orientation="left" style={{ fontSize: "24px" }}>
            Why Use Influlance?
          </Divider>
          <Row justify="center" gutter={[16, 16]}>
            <Col span={8}>
              <Card
                title="Find Influencers"
                bordered={false}
                style={{
                  textAlign: "center",
                  background: "#f5f5f5",
                  borderRadius: "12px",
                }}
              >
                Easily search and filter through thousands of influencers to
                find the perfect match for your brand.
              </Card>
            </Col>
            <Col span={8}>
              <Card
                title="Create Campaigns"
                bordered={false}
                style={{
                  textAlign: "center",
                  background: "#f5f5f5",
                  borderRadius: "12px",
                }}
              >
                Launch influencer marketing campaigns in just a few clicks with
                our intuitive platform.
              </Card>
            </Col>
            <Col span={8}>
              <Card
                title="Track Results"
                bordered={false}
                style={{
                  textAlign: "center",
                  background: "#f5f5f5",
                  borderRadius: "12px",
                }}
              >
                Track campaign performance and ROI in real-time with detailed
                analytics.
              </Card>
            </Col>
          </Row>
        </div>

        {/* Footer */}
        <Footer style={{ textAlign: "center", marginTop: "50px" }}>
          Influlance ©2024 Created by Your Team
        </Footer>
      </Content>
    </>
  );
};

export default MarketerHomePage;
