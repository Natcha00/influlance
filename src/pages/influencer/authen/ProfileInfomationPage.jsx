import React, { useState } from 'react';
import { Form, Input, Upload, Button, Tag, Select, message, Row, Col, Typography } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { Option } = Select;
const { Title } = Typography;
const ProfileInformationPage = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  const handleUpload = (info) => {
    const { file, fileList } = info;
    if (file.status === 'done') {
      message.success(`${file.name} uploaded successfully.`);
    } else if (file.status === 'error') {
      message.error(`${file.name} upload failed.`);
    }
    setFileList(fileList);
  };

  const onFinish = (values) => {
    console.log('Form values: ', values);
  };

  return (
    <Row justify="center" style={{ padding: '50px' }}>
      <Col span={16}>
        <Title level={2} style={{ textAlign: 'center' }}>Profile Information</Title>
        <Form
          form={form}
          name="influencerProfile"
          layout="vertical"
          onFinish={onFinish}
        >
          {/* Upload Profile Picture */}
          <Row gutter={10}>

            <Col span={12}>
              {/* First Name */}
              <Form.Item
                name="firstName"
                label="First Name"
                rules={[{ required: true, message: 'Please enter your first name' }]}
              >
                <Input placeholder="Enter your first name" />
              </Form.Item>
            </Col>

            <Col span={12}>
              {/* Last Name */}
              <Form.Item
                name="lastName"
                label="Last Name"
                rules={[{ required: true, message: 'Please enter your last name' }]}
              >
                <Input placeholder="Enter your last name" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={10}>
            <Col span={12}>
              {/* Facebook Username */}
              <Form.Item
                name="facebook"
                label="Facebook Username"
              >
                <Input placeholder="Facebook username" />
              </Form.Item>
            </Col>
            <Col span={12}>
              {/* Instagram Username */}
              <Form.Item
                name="instagram"
                label="Instagram Username"
              >
                <Input placeholder="Instagram username" />
              </Form.Item>

            </Col>
          </Row>

          <Row gutter={10}>
            <Col span={12}>
              {/* X (Twitter) Username */}
              <Form.Item
                name="x"
                label="X (Twitter) Username"
              >
                <Input placeholder="X (Twitter) username" />
              </Form.Item>
            </Col>
            <Col span={12}>
              {/* TikTok Username */}
              <Form.Item
                name="tiktok"
                label="TikTok Username"
              >
                <Input placeholder="TikTok username" />
              </Form.Item>
            </Col>
          </Row>


          <Row gutter={10}>
            <Col span={12}>
              {/* Influencer Categories */}
              <Form.Item
                name="categories"
                label="Categories"
                rules={[{ required: true, message: 'Please select at least one category' }]}
              >
                <Select mode="multiple" placeholder="Select categories">
                  <Option value="fashion">Fashion</Option>
                  <Option value="tech">Technology</Option>
                  <Option value="beauty">Beauty</Option>
                  <Option value="lifestyle">Lifestyle</Option>
                </Select>
              </Form.Item>
            </Col>

          </Row>

          <Row>
            <Col span={12}>
              <Form.Item
                name="profilePicture"
                label="Upload Profile Picture"
                valuePropName="fileList"
                getValueFromEvent={({ fileList }) => fileList}
              >
                <Upload
                  name="profilePicture"
                  listType="picture"
                  action="/upload" // your backend upload URL here
                  fileList={fileList}
                  onChange={handleUpload}
                >
                  <Button type='primary' ghost icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
              </Form.Item>
            </Col>
            <Col span={12}>
              {/* Submit Button */}
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Save Profile
                </Button>
              </Form.Item>
            </Col>

          </Row>

        </Form>
      </Col>

    </Row>
  );
};

export default ProfileInformationPage;