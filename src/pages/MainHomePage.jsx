import React from "react";
import { Layout, Button, Typography, Row, Col, Card } from "antd";
import { useNavigate } from "react-router-dom";
import PIC from "/Influencer.png";
import Picinflu from "/Logoinflu.png";
import Picmarket from "/market.png";
import Pic2 from "/pic_beauty.png";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const MainHomePage = () => {
  const navigate = useNavigate();
  const screen = useBreakpoint();
  return (
    <>
      {/* Main Content */}
      <Content>
        {/* Hero Section */}

        <Row justify="center" align="middle" gutter={[12, 12]} style={{
          background: "linear-gradient(to bottom, #003554, #fabec0)",
          padding: "1.5rem",
          borderRadius: "12px",
          marginTop: '2rem'
        }}>
          <Col xs={24} md={0} style={{ justifyItems: "center", alignItems: 'center' }}>
            <img
              src={PIC}
              style={{
                width: "100%",
                // position: "absolute",
                // top: "100%",
                // right: "55%",
                // transform: "translate(50%, -55%)", /* Move the element back by half its size */
                // zIndex: 1,
              }}
            />
          </Col>
          <Col xs={24} md={12}>
            <Title
              level={2}
              style={{
                color: '#fff',
                textAlign: screen.xs ? "center" : undefined
              }}

            >
              เชื่อมต่อแบรนด์และอินฟลูเอนเซอร์
              อย่างง่ายดาย
            </Title>

            <Paragraph style={{ color: "#ffff", fontSize: "16px",textAlign: screen.xs ? "center" : undefined }}>
              ค้นหาและร่วมงานกับอินฟลูเอนเซอร์ที่เหมาะสมสำหรับแคมเปญของคุณ
            </Paragraph>
          </Col>
          <Col xs={0} md={12} style={{ position: "relative", justifyItems: "center", alignItems: 'center' }}>
            <img
              src={PIC}
              style={{
                width: "110%",
                position: "absolute",
                top: "50%",
                right: "55%",
                transform: "translate(50%, -50%)", /* Move the element back by half its size */
                zIndex: 1,
              }}
            />
          </Col>

        </Row>

        {/* Welcome Section */}
        <Row justify="left" gutter={[16, 16]} style={{ marginTop: "40px" }}>
          <Col xs={24} md={12}>
            <Title level={2}>ยินดีต้อนรับสู่ Influlance</Title>
            <Paragraph style={ {fontSize: "14px"}}>
              Influlance
              เป็นตลาดกลางที่เชื่อมต่อและทำให้แบรนด์กับอินฟลูเอนเซอร์สามารถทำงานร่วมกันได้
              ไม่ว่าคุณจะเป็นแบรนด์ที่ต้องการโปรโมตสินค้าหรือเป็นอินฟลูเอนเซอร์ที่กำลังมองหาโอกาสใหม่
              ๆ Influlance ทำให้ทุกอย่างง่ายและมีประสิทธิภาพ
            </Paragraph>
          </Col>
        </Row>

        {/* Section 1 */}
        <Row justify="center" gutter={[16, 16]} style={{ marginTop: "40px" }}>
          <Col xs={24} md={12}>
            <Card
              hoverable
              style={{
                borderRadius: "20px",
                textAlign: "center",
                padding: "15px",
                background:
                  "linear-gradient(to bottom, #16425b, #ffafcc)",
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
                onClick={() => navigate("/influencer")}
              >
                เริ่มต้น
              </Button>
            </Card>
          </Col>
          <Col xs={24} md={12}>
            <Card
              hoverable
              style={{
                borderRadius: "20px",
                textAlign: "center",
                padding: "15px",
                background:
                  "linear-gradient(to bottom, #ffafcc, #16425b)",
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
                onClick={() => navigate("/marketer")}
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
