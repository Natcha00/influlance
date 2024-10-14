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
import BannerImage from "/BannerTest.png";

const { Header, Content, Footer } = Layout;
const { Title, Paragraph } = Typography;

const MainHomePage = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Main Content */}
      {/* Introduction Section */}
      <Row style={{ margin: "2rem 0" }}>
        <Image preview={false}  width={1500} height={300} src={BannerImage} />
      </Row>

      <Row justify="left" gutter={[16, 16]}>
        <Col span={12}>
          <Title level={2}>Welcome to Influlance</Title>
          <Paragraph>
            Influlance
            เป็นตลาดกลางที่เชื่อมต่อและทำให้แบรนด์กับอินฟลูเอนเซอร์สามารถทำงานร่วมกันได้
            ไม่ว่าคุณจะเป็นแบรนด์ที่ต้องการโปรโมตสินค้าหรือเป็นอินฟลูเอนเซอร์ที่กำลังมองหาโอกาสใหม่
            ๆ Influlance ทำให้ทุกอย่างง่ายและมีประสิทธิภาพ
          </Paragraph>
          
        </Col>
      </Row>

      {/* Section 1 */}
      <Row justify="center" gutter={[16, 16]} style={{ marginTop: "40px" }}>
        <Col span={12}>
          <Card
            hoverable
            style={{
              borderRadius: "15px",
              textAlign: "center",
              padding: "25px",
              background:'linear-gradient(to right, #7367F0, #A582F7, #CE9FFC)'
            }}
            bodyStyle={{ backgroundColor: "#000" }}
          >
            <img
              src="path_to_influencer_image"
              alt="Influencer"
              style={{ width: "100%", height: "auto", borderRadius: "15px" }}
            />
            <Title level={3} style={{ marginTop: "20px", color: "#FF00A8" }}>
              สมัครเป็น Influencer 
            </Title>
            <Paragraph>รับงานรีวิวสินค้าจากแบรนด์คุณภาพได้ทันที</Paragraph>
            <Button
              type="primary"
              shape="round"
              size="large"
              onClick={() => navigate("/influencer-homepage")}
            >
              เริ่มต้น
            </Button>
          </Card>
        </Col>
        <Col span={12}>
          <Card
            hoverable
            style={{
              borderRadius: "15px",
              textAlign: "center",
              padding: "25px",
              background:'linear-gradient(to right, #CE9FFC, #A582F7, #7367F0)'
            }}
            bodyStyle={{ backgroundColor: "#000" }}
          >
            <img
              src="path_to_marketer_image"
              alt="Marketer"
              style={{ width: "100%", height: "auto", borderRadius: "15px" }}
            />
            <Title level={3} style={{ marginTop: "20px", color: "#00A8FF" }}>
              เปิดบัญชีเป็น Marketer
            </Title>
            <Paragraph>เพื่อเริ่มสร้างแคมเปญรีวิวสินค้า</Paragraph>
            <Button type="primary" shape="round" size="large">
              เริ่มต้น
            </Button>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default MainHomePage;
