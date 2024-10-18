import React from "react";
import { Layout, Button, Typography, Row, Col, Card } from "antd";
import { useNavigate } from "react-router-dom";
import PIC from "/Influencer.png";
import Picinflu from "/Logoinflu.png";
import Picmarket from "/market.png";
import Pic2 from "/pic_beauty.png";
import Pic3 from "/fire.gif";

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const MainHomePage = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Main Content */}
      <Content style={{ padding: "50px", margin: "2rem 0" }}>
        {/* Hero Section */}
        <div
          style={{
            background: "linear-gradient(to right, #5A4FF5, #A582F7, #CE9FFC)",
            padding: "60px",
            borderRadius: "12px",
            position: "relative",
          }}
        >
          <Row justify="center" align="middle" gutter={24}>
            <Col span={12}>
              <Title level={1} style={{ color: "#fff" }}>
                เชื่อมต่อแบรนด์และอินฟลูเอนเซอร์อย่างง่ายดาย
              </Title>
              <Paragraph style={{ color: "#fff", fontSize: "18px" }}>
                ค้นหาและร่วมงานกับอินฟลูเอนเซอร์ที่เหมาะสมสำหรับแคมเปญของคุณ
              </Paragraph>
            </Col>
            <Col span={12}>
              <img
                src={PIC}
                style={{
                  width: "800px", // Adjust the size as needed
                  position: "absolute",
                  top: "-200px",
                  right: "-40px",
                  zIndex: 1,
                }}
              />
              {/* <img
                src={Pic3} // Use imported image here
                style={{
                  width: "800px", // Adjust the size as needed
                  position: "absolute",
                  top: "100px",
                  right: "-200px",
                  zIndex: 1,
                }} */}
              />
            </Col>
          </Row>
        </div>

        {/* Welcome Section */}
        <Row justify="left" gutter={[16, 16]} style={{ marginTop: "40px" }}>
          <Col span={12}>
            <Title level={2}>ยินดีต้อนรับสู่ Influlance</Title>
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
                borderRadius: "20px",
                textAlign: "center",
                padding: "15px",
                background:
                  "linear-gradient(to right, #5A4FF5, #A582F7, #CE9FFC)",
              }}
              bodyStyle={{ backgroundColor: "#000" }}
            >
              <img
                src={Picinflu} // Replace with actual image path
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
                borderRadius: "20px",
                textAlign: "center",
                padding: "15px",
                background:
                  "linear-gradient(to right, #CE9FFC, #A582F7, #5A4FF5)",
              }}
              bodyStyle={{ backgroundColor: "#000" }}
            >
              <img
                src={Picmarket} // Replace with actual image path
                alt="Marketer"
                style={{ width: "100%", height: "auto", borderRadius: "15px" }}
              />
              <Title level={3} style={{ marginTop: "20px", color: "#00A8FF" }}>
                เปิดบัญชีเป็น Marketer
              </Title>
              <Paragraph>เพื่อเริ่มสร้างแคมเปญรีวิวสินค้า</Paragraph>
              <Button
                type="primary"
                shape="round"
                size="large"
                onClick={() => navigate("/marketer-homepage")}
              >
                เริ่มต้น
              </Button>
            </Card>
          </Col>
        </Row>
      </Content>
    </>
  );
};

export default MainHomePage;
