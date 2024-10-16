// LoginPage.js
import React from 'react';
import { Form, Input, Button, Row, Col, Typography, Divider, Card, message } from 'antd';
import { GoogleOutlined, AppleOutlined } from '@ant-design/icons';
import { useLoginMutation, useMeQuery } from '../../../api/authApi';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { setIsAuth } from '../../../slices/authSlice';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const LoginPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [login, { isLoading }] = useLoginMutation()
    const { data, isLoading: isLoadingMe, refetch: me } = useMeQuery()
    // ฟังก์ชันจัดการการส่งฟอร์ม
    const onFinish = async (values) => {
        try {
            const resp = await login(values).unwrap()
            if (resp) {
                Cookies.set('accessToken', resp.accessToken)
                const respMe = await me().unwrap()
                if (respMe) {
                    Cookies.set('email', respMe.email)
                    dispatch(setIsAuth(true))
                    message.success('เข้าสู่ระบบเรียบร้อยแล้ว')
                }
                setTimeout(() => {
                    navigate('/')
                }, 500)
            }

        } catch (error) {
            console.log(error)
            if (error.data) {
                message.error(error.data)
            } else {
                message.error("found issue")
            }
        }
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
