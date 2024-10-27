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
  InputNumber,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import CommunicationsImage from "/communications.png";
import { useLocation, useNavigate } from "react-router-dom";
import { categories } from '../../../shared/mockup/category'
import { useMeQuery, useRegisterMutation } from "../../../api/marketer/authApi";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { setIsAuth } from "../../../slices/authSlice";
import TextArea from "antd/es/input/TextArea";
import DraggerUpload from "../../../components/DraggerUpload";

const { Option } = Select;
const { Title } = Typography;

const MarketerProfileInformationPage = () => {
  const location = useLocation();
  const navigate = useNavigate()
  const [fileList, setFileList] = useState([])
  const [fileList2, setFileList2] = useState([])
  const { email, password } = location.state || {}; // Retrieve email and password from state
  if (!email || !password) {
    navigate('/marketer/register')
  }
  const dispatch = useDispatch()
  const [register, { isLoading }] = useRegisterMutation()
  const { data, isLoading: isLoadingMe, refetch: me } = useMeQuery()

  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      console.log("Form values: ", values);
      const resp = await register({
        email,
        password,
        ...values,
        profilePicture: values.profilePicture[0].url,
        brandPicture: values.brandPicture[0].url,
      }).unwrap()

      if (resp) {
        Cookies.set('accessToken', resp.accessToken)
        const respMe = await me().unwrap()
        if (respMe) {
          Cookies.set('email', respMe.email)
          dispatch(setIsAuth(true))
          message.success('เข้าสู่ระบบเรียบร้อยแล้ว')
        }
        setTimeout(() => {
          navigate('/marketer')
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

    message.success("สมัครสมาชิกสำเร็จ")
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
              name="marketerProfile"
              layout="vertical"
              onFinish={onFinish}
              initialValues={{
                firstName: "marketer",
                lastName: "001",
                facebook: "facebook.com/marketer",
                instagram: "instagram.com/marketer",
                x: "x.com/marketer",
                tiktok: "tiktok.com/@marketer",
                profilePicture: [
                  {
                    uid: "-1",
                    url: "https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg",
                    thumbUrl: "https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg",
                    status: "done"
                  }
                ],
                categories: ["fashion", "lifestyle"],
                yourInfo: "กิน เที่ยว เล่นเกม หนัง"
              }}
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
                  {/* marketer Categories */}
                  <Form.Item
                    name="categories"
                    label="ฉันเป็น marketer"
                    rules={[
                      {
                        required: true,
                        message: "Please select at least one category",
                      },
                    ]}
                  >
                    <Select mode="multiple" placeholder="เลือกประเภท" options={categories} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="profilePicture"
                    label="รูปโปรไฟล์"
                    valuePropName="fileList"
                  >
                    <DraggerUpload fileList={fileList} setFileList={setFileList} form={form} name={"profilePicture"} />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={10}>
                <Col span={12}>
                  <Form.Item
                    name="brand"
                    label="ชื่อ brand"
                    rules={[
                      {
                        required: true,
                        message: "กรุณากรอกชื่อ brand",
                      },
                    ]}
                  >
                    <Input placeholder="กรุณากรอกชื่อ brand" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="brandPicture"
                    label="รูป brand"
                    valuePropName="fileList"
                  >
                    <DraggerUpload fileList={fileList2} setFileList={setFileList2} form={form} name={"brandPicture"} />
                  </Form.Item>
                </Col>
              </Row>


              <Row gutter={10}>
                <Col span={24}>
                  <Form.Item
                    name="yourInfo"
                    label="อธิบายเกี่ยวกับตัวเอง"

                  >
                    <TextArea placeholder="อธิบายเกี่ยวกับตัวเอง" />
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
      </Row >
    </>
  );
};

export default MarketerProfileInformationPage;
