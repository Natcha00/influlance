import React from "react";
import { Layout, Menu, Button, Typography, Row, Col, Card } from "antd";
import './style.css'
import { useNavigate } from "react-router-dom";
const { Header, Content, Footer } = Layout;
const { Title, Paragraph } = Typography;

const HomePage = () => {
    const navigate = useNavigate()
    return (
        <>
            <Row gutter={12}>
                <Col>
                    <Button type='primary' onClick={() => navigate('profile-information')}>
                        profile-information
                    </Button>
                </Col>
                <Col>
                    <Button type='primary' onClick={() => navigate('add-your-portfolio')}>
                        add-your-portfolio
                    </Button>
                </Col>
                <Col>
                    <Button type='primary' onClick={() => navigate('profile')}>
                        profile
                    </Button>
                </Col>
                <Col>
                    <Button type='primary' onClick={() => navigate('content-feed')}>
                        content-feed
                    </Button>
                </Col>
                <Col>
                    <Button type='primary' onClick={() => navigate('work-space')}>
                        work-space
                    </Button>
                </Col>
                <Col>
                    <Button type='primary' onClick={() => navigate('work-darft')}>
                        work-darft
                    </Button>
                </Col>
                <Col>
                    <Button type='primary' onClick={() => navigate('finance')}>
                        finance
                    </Button>
                </Col>
            </Row>
            {/* Content */}
            <Content style={{ padding: "0 50px", marginTop: 64 }}>
                <div
                  /*   className="site-layout-content" */
                >
                    <Row justify="center" gutter={[16, 16]}>
                        <Col span={12}>
                            <Title level={2}>Welcome to Influlance</Title>
                            <Paragraph>
                                Influlance is the marketplace where brands and influencers can
                                connect and collaborate. Whether you are a brand looking to
                                promote your products or an influencer looking for new
                                opportunities, Influlance makes it easy and efficient.
                            </Paragraph>
                            <Button type="primary" size="large">
                                Get Started
                            </Button>
                        </Col>
                        <Col span={12}>
                            <img
                                src="https://source.unsplash.com/random/800x600"
                                alt="Influlance"
                                style={{ width: "100%", height: "auto" }}
                            />
                        </Col>
                    </Row>
                </div>

                {/* Feature Section */}
                <div style={{ marginTop: 50 }}>
                    <Row justify="center" gutter={[16, 16]}>
                        <Col span={8}>
                            <Card title="Find Influencers" bordered={false}>
                                Browse through hundreds of influencers to find the perfect fit
                                for your campaign.
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card title="Post Jobs" bordered={false}>
                                Post jobs and receive applications from influencers who match
                                your needs.
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card title="Secure Payments" bordered={false}>
                                Secure payment system ensuring transparency and safety for both
                                brands and influencers.
                            </Card>
                        </Col>
                    </Row>
                </div>
            </Content>

            {/* Footer */}
            <Footer style={{ textAlign: "center" }}>
                Influlance Â©2024 Created by Your Team
            </Footer>
        </>
    );
};

export default HomePage;