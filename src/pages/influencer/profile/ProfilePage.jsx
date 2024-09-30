import React from 'react';
import { Avatar, Button, Card, Row, Col, Collapse, theme, Divider } from 'antd';
import { FacebookOutlined, InstagramOutlined, TwitterOutlined, VideoCameraOutlined } from '@ant-design/icons';

const ProfilePage = () => {
    const { token } = theme.useToken();
    const panelStyle = {
        background: token.Collapse.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        border: 'none',
    };
    const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
  
`;
    const items = [
        {
            key: '1',
            label: 'This is panel header 1',
            children: <p>{text}</p>,
            style: panelStyle
        },
    ];
    const onChange = (key) => {
        console.log(key);
    };
    return (
        <div style={{ minHeight: '100vh', padding: '40px' }}>
            <Row align={'middle'}>
                {/* Right Section: Profile Card */}
                <Col span={12} style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ 'width': "300px", "height": "300px", background: "grey" }}></div>
                    {/* <Avatar
                        size={200}
                        src="https://placeimg.com/200/200/people"
                        style={{ marginBottom: '20px' }}
                    /> */}
                    <h2 style={{ fontSize: '32px', color: '#fff' }}>PIN PIN</h2>
                </Col>
                {/* Left Section: Profile Info */}
                <Col span={12}>
                    <h1 style={{ fontSize: '48px', fontWeight: 'bold' }}>Name social</h1>

                    {/* Social Media Links */}
                    <div style={{ fontSize: '20px' }}>
                        <p><FacebookOutlined /> facebook.com/influencer</p>
                        <p><InstagramOutlined /> instagram.com/influencer</p>
                        <p><TwitterOutlined /> x.com/influencer</p>
                        <p><VideoCameraOutlined /> tiktok.com/@influencer</p>
                    </div>

                    {/* Portfolio Button */}
                    <Button
                        size="large"
                        type="primary"
                        style={{
                            background: 'linear-gradient(to right, #8E2DE2, #4A00E0)',
                            color: '#fff',
                            marginBottom: '40px',
                        }}
                    >
                        Portfolio
                    </Button>


                </Col>


            </Row>
            {/* Pinned Works Section */}
            <h2 style={{ fontSize: '36px', marginBottom: '20px' }}>Portfolio</h2>
            <Row gutter={16}>
                <Col span={16}>
                    <div style={{ 'minHeight': "300px", 'width': "100%", "height": "100%", background: "grey" }}></div>
                </Col>
                <Col span={8}>
                    <Collapse
                        style={{
                            background: token.colorBgContainer,
                        }}
                        items={items}
                        defaultActiveKey={['1']}
                        onChange={onChange} />
                </Col>
            </Row>
            <Divider />
            <Row gutter={16} style={{ 'marginBlock': '0.5rem' }}>
                <Col span={16}>
                    <div style={{ 'minHeight': "300px", 'width': "100%", "height": "100%", background: "grey" }}></div>
                </Col>
                <Col span={8}>
                    <Collapse
                        style={{
                            background: token.colorBgContainer,
                        }}
                        items={items}
                        defaultActiveKey={['1']}
                        onChange={onChange} />
                </Col>
            </Row>
            <Divider />
            <Row gutter={16} style={{ 'marginBlock': '0.5rem' }}>
                <Col span={16}>
                    <div style={{ 'minHeight': "300px", 'width': "100%", "height": "100%", background: "grey" }}></div>
                </Col>
                <Col span={8}>
                    <Collapse
                        style={{
                            background: token.colorBgContainer,
                        }}
                        items={items}
                        defaultActiveKey={['1']}
                        onChange={onChange} />
                </Col>
            </Row>
        </div>
    );
};

export default ProfilePage;
