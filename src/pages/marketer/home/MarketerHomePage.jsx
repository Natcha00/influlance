import React from "react";
import { Layout, Row, Col, Button, Typography, Card, Divider } from "antd";
import { useNavigate } from "react-router-dom";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import BannerImage from "/Banner_Market.gif";

const { Content, Footer } = Layout;
const { Title, Paragraph } = Typography;

const MarketerHomePage = () => {
  const navigate = useNavigate();
  const screen = useBreakpoint();

  return (
    <>
      <Row gutter={12}>
        <Col>
          <Button
            type="primary"
            onClick={() => navigate("/profile-information")}
          >
            profile-information
          </Button>
        </Col>
        <Col>
          <Button type="primary" onClick={() => navigate("/marketer-profile")}>
            profile
          </Button>
        </Col>
        <Col>
          <Button
            type="primary"
            onClick={() => navigate("/marketer-work-space")}
          >
            work-space
          </Button>
        </Col>
        <Col>
          <Button type="primary" onClick={() => navigate("/finance")}>
            finance
          </Button>
        </Col>
      </Row>
      <Content style={{ padding: "50px", margin: "2rem 0" }}>
        {/* Hero Section */}
        <div
          style={{
            background: "linear-gradient(to right, #003554,#6096ba, #a9d6e5)",
            padding: "60px",
            borderRadius: "12px",
            position: "relative",
          }}
        >
          <Row justify="center" align="middle" gutter={24}>
            <Col span={12}>
              <Title level={1} style={{ color: "#fff" }}>
                ค้นหาอินฟลูเอนเซอร์ที่เหมาะสมสำหรับแคมเปญของคุณ
              </Title>
              <Paragraph style={{ color: "#fff", fontSize: "18px" }}>
                ยินดีต้อนรับสู่ Influlance!
                ที่นี่คุณสามารถค้นหาและร่วมงานกับอินฟลูเอนเซอร์ที่ตรงกับความต้องการของแบรนด์คุณ
                ไม่ว่าจะเป็นแคมเปญขนาดใหญ่หรือเล็ก
                เรามีอินฟลูเอนเซอร์มากมายที่พร้อมจะช่วยส่งเสริมแบรนด์ของคุณอย่างสร้างสรรค์และมีประสิทธิภาพ
              </Paragraph>
              <Button type="primary" size="large">
                เริ่มต้น
              </Button>
            </Col>
            <Col span={12}>
              <img
                src={BannerImage}// Adjust the path accordingly
                alt="Marketer"
                style={{
                  width: "130%",
                  borderRadius: "12px",
                  position: "absolute",
                  top: "-190px",
                  right: "-90px",
                  zIndex: 1,
                }}
              />
            </Col>
          </Row>
        </div>

        {/* Features Section */}
        <div style={{ marginTop: "50px" }}>
          <Divider orientation="left" style={{ fontSize: "24px" }}>
            ทำไมต้องใช้ Influlance?
          </Divider>
          <Row justify="center" gutter={[16, 16]}>
            <Col span={8}>
              <Card
                title="ประหยัดเวลาในการค้นหาและจ้างงาน"
                bordered={false}
                style={{
                  textAlign: "center",
                  background: "#f5f5f5",
                  borderRadius: "12px",
                }}
              >
                ไม่ต้องเสียเวลาในการค้นหาอินฟลูเอนเซอร์จากหลายช่องทาง เพราะ
                Influlance
                รวบรวมอินฟลูเอนเซอร์จากหลากหลายสายงานไว้ให้คุณเลือกในที่เดียว
                คุณสามารถสร้างแคมเปญ ระบุความต้องการ
                และรับใบสมัครจากอินฟลูเอนเซอร์ที่ตรงกับงานของคุณโดยตรง
              </Card>
            </Col>
            <Col span={8}>
              <Card
                title="การทำงานที่โปร่งใสและควบคุมได้ง่าย"
                bordered={false}
                style={{
                  textAlign: "center",
                  background: "#f5f5f5",
                  borderRadius: "12px",
                }}
              >
                คุณสามารถติดตามความคืบหน้าของแคมเปญได้อย่างง่ายดาย
                ตั้งแต่การเลือกอินฟลูเอนเซอร์ การส่งงาน
                ไปจนถึงการตรวจสอบผลงานและการชำระเงิน
                ระบบมีการบันทึกและแสดงสถานะทุกขั้นตอนอย่างชัดเจน
                ช่วยให้คุณควบคุมการทำงานและงบประมาณได้เต็มที่
              </Card>
            </Col>
            <Col span={8}>
              <Card
                title="จัดการการชำระเงินง่ายและปลอดภัย"
                bordered={false}
                style={{
                  textAlign: "center",
                  background: "#f5f5f5",
                  borderRadius: "12px",
                }}
              >
                ระบบการชำระเงินผ่านเครดิตช่วยให้การทำธุรกรรมระหว่างคุณกับอินฟลูเอนเซอร์เป็นไปอย่างราบรื่นและปลอดภัย
                คุณสามารถเติมเครดิตไว้ในระบบและชำระเงินเมื่อแคมเปญเสร็จสิ้นได้โดยไม่ต้องกังวลเรื่องความปลอดภัย
              </Card>
            </Col>
          </Row>
        </div>
      </Content>
    </>
  );
};

export default MarketerHomePage;
