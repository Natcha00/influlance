import React, { useState } from "react";
import {
  Form,
  Input,
  Upload,
  Button,
  Tag,
  Select,
  message,
  Row,
  Col,
  Typography,
  ConfigProvider,
  Image,
  Card,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import CommunicationsImage from "/communications.png";

const { Option } = Select;
const { Title } = Typography;
const ProfileInformationPage = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  const handleUpload = (info) => {
    const { file, fileList } = info;
    if (file.status === "done") {
      message.success(`${file.name} uploaded successfully.`);
    } else if (file.status === "error") {
      message.error(`${file.name} upload failed.`);
    }
    setFileList(fileList);
  };

  const onFinish = (values) => {
    console.log("Form values: ", values);
  };

  return (
    <>
      <Row justify="center" gutter={30} align={"middle"}>
        <Col xs={24} md={12}>
          <Image
            src={CommunicationsImage}
            width={"100%"}
            height={"100%"}
            preview={false}
          />
        </Col>
        <Col xs={24} md={12}>
          <Card title={"Profile Information"}>
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
                    label="ชื่อจริง"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your first name",
                      },
                    ]}
                  >
                    <Input placeholder="Enter your first name" />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  {/* Last Name */}
                  <Form.Item
                    name="lastName"
                    label="นามสกุล"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your last name",
                      },
                    ]}
                  >
                    <Input placeholder="Enter your last name" />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={10}>
                <Col span={12}>
                  {/* Facebook Username */}
                  <Form.Item name="facebook" label="Facebook Link">
                    <Input placeholder="Facebook username" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  {/* Instagram Username */}
                  <Form.Item name="instagram" label="Instagram Username">
                    <Input placeholder="Instagram username" />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={10}>
                <Col span={12}>
                  {/* X (Twitter) Username */}
                  <Form.Item name="x" label="X (Twitter) Username">
                    <Input placeholder="X (Twitter) username" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  {/* TikTok Username */}
                  <Form.Item name="tiktok" label="TikTok Username">
                    <Input placeholder="TikTok username" />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={10}>
                <Col span={12}>
                  {/* Influencer Categories */}
                  <Form.Item
                    name="categories"
                    label="ฉันเป็น Influencer"
                    rules={[
                      {
                        required: true,
                        message: "Please select at least one category",
                      },
                    ]}
                  >
                    <Select mode="multiple" placeholder="เลือกประเภท">
                      <Option value="fashion">Fashion</Option>
                      <Option value="tech">Technology</Option>
                      <Option value="beauty">Beauty</Option>
                      <Option value="lifestyle">Lifestyle</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="profilePicture"
                    label="รูปโปรไฟล์"
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
                      <Button
                        type="primary"
                        variant="outlined"
                        icon={<UploadOutlined />}
                      >
                        คลิกเพื่ออัปโหลด
                      </Button>
                    </Upload>
                  </Form.Item>
                </Col>
              </Row>

              <Row justify={"end"}>
                {/* Submit Button */}
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    บันทึก
                  </Button>
                </Form.Item>
              </Row>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ProfileInformationPage;
