// LoginPage.js
import React from 'react';
import { Form, Input, Button, Row, Col, Typography, Divider, Card } from 'antd';
import { GoogleOutlined, AppleOutlined } from '@ant-design/icons';

const { Title } = Typography;

const LoginPage = () => {
    // ฟังก์ชันจัดการการส่งฟอร์ม
    const onFinish = (values) => {
        console.log('Login values: ', values);
        // สามารถเพิ่มการตรวจสอบหรือส่งข้อมูลไปยัง backend ได้ที่นี่
    };

    return (
        <Row justify="center" >
            <Col xs={0} md={12} style={{ background: 'grey' }}>

            </Col>
            <Col xs={24} md={12}>
                <Card title="Login">

                    <Form
                        name="login"
                        layout="vertical"
                        onFinish={onFinish}
                    >
                        {/* Email */}
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    type: 'email',
                                    message: 'The input is not valid E-mail!',
                                },
                                {
                                    required: true,
                                    message: 'Please input your E-mail!',
                                },
                            ]}
                        >
                            <Input placeholder="Enter your email" />
                        </Form.Item>

                        {/* Password */}
                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                        >
                            <Input.Password placeholder="Enter your password" />
                        </Form.Item>

                        {/* ปุ่ม Login */}
                        <Form.Item>
                            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                                Login
                            </Button>
                        </Form.Item>
                    </Form>

                    {/* OAuth Options */}
                    <Divider>Or Login with</Divider>
                    <Row justify="center" gutter={16}>
                        <Col>
                            <Button
                                icon={<GoogleOutlined />}
                                style={{ backgroundColor: '#DB4437', color: '#fff' }}
                            >
                                Google
                            </Button>
                        </Col>
                        <Col>
                            <Button
                                icon={<AppleOutlined />}
                                style={{ backgroundColor: '#000', color: '#fff' }}
                            >
                                Apple
                            </Button>
                        </Col>
                    </Row>
                </Card>
            </Col>
        </Row>
    );
};

export default LoginPage;
