// RegisterPage.js
import React from 'react';
import { Form, Input, Button, Row, Col, Typography, Divider, Card, message, Image } from 'antd';
import { GoogleOutlined, AppleOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { setRegisterInfo } from '../../../slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { useCheckEmailMutation } from '../../../api/influencer/authApi';
import RegisterInflu from '/register_influ.png'

const { Title } = Typography;

const RegisterPage = () => {
  const [checkEmail, { isLoading }] = useCheckEmailMutation()

  const dispatch = useDispatch()
  const navigate = useNavigate()
  // ฟังก์ชันในการจัดการการส่งฟอร์ม
  const onFinish = async (values) => {
    try {
      // สามารถเพิ่มการนำค่าฟอร์มไปใช้งาน เช่น ส่งไปยัง backend หรือไปหน้าถัดไปได้
      const resp = await checkEmail({ email: values.email }).unwrap()

      if (resp) {
        navigate('/influencer/profile-information', { state: { email: values.email, password: values.password } })
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

  const onFinishFailed = (errorInfo) => {
    message.error(errorInfo)
  }
  return (
    <Row justify="center" align={'middle'}>
      <Col xs={0} md={12} >
        <Image src={RegisterInflu} width={'100%'} preview={false} />
      </Col>
      <Col xs={24} md={12}>
        <Card title={"Register"}>
          <Form
            name="register"
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            initialValues={{
              email: "Natcha@test.com",
              password: "1234",
              'confirm-password': '1234'
            }}
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

            {/* Confirm Password */}
            <Form.Item
              label="Confirm Password"
              name="confirm-password"
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('The two passwords do not match!'));
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Confirm your password" />
            </Form.Item>

            {/* ปุ่ม Next */}
            <Form.Item>
              <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                Next
              </Button>
            </Form.Item>
          </Form>

        </Card>

      </Col>
    </Row>
  );
};

export default RegisterPage;
