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
      <Content>
        {/* Hero Section */}
        <div
          style={{
            background: "linear-gradient(to right, #003554, #eaf2d7)",
            padding: "1.5rem",
            borderRadius: "12px",
            minHeight: "300px",
          }}
        >
          <Row justify="center" align="middle" gutter={24}>
            <Col
              xs={24}
              md={12}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Title
                level={3}
                style={{
                  color: "#fff",
                  textAlign: screen.xs ? "center" : undefined,
                }}
              >
                เปิดบัญชีเป็น <span style={{ color: "#FFCE1B" }}>Marketer</span>{" "}
                กับเรา <br />
                เพื่อค้นหาอินฟลูเอนเซอร์ที่เหมาะสมสำหรับแคมเปญของคุณ
              </Title>
              <Paragraph
                style={{
                  color: "#fff",
                  fontSize: "14px",
                  textAlign: screen.xs ? "center" : undefined,
                }}
              >
                ยินดีต้อนรับสู่ Influlance!
                ที่นี่คุณสามารถค้นหาและร่วมงานกับอินฟลูเอนเซอร์ที่ตรงกับความต้องการของแบรนด์คุณ
                ไม่ว่าจะเป็นแคมเปญขนาดใหญ่หรือเล็ก
                เรามีอินฟลูเอนเซอร์มากมายที่พร้อมจะช่วยส่งเสริมแบรนด์ของคุณอย่างสร้างสรรค์และมีประสิทธิภาพ
              </Paragraph>
              <Button type="primary" size="large">
                เริ่มต้น
              </Button>
            </Col>
            <Col
              xs={24}
              md={12}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <img
                src={BannerImage} // Adjust the path accordingly
                alt="Marketer"
                style={{
                  width: "120%",
                  borderRadius: "12px",
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
            <Col xs={24} md={8}>
              <Card
                title="ประหยัดเวลาในการค้นหาและจ้างงาน"
                bordered={false}
                style={{
                  textAlign: "center",
                  background: "#141414",
                  color: "#fff",
                }}
              >
                Influlance
                รวบรวมอินฟลูเอนเซอร์ในหลากหลายสายงานไว้ให้เลือกในที่เดียว
                คุณสามารถสร้างแคมเปญและกำหนดความต้องการอินฟลูเอนเซอร์ที่ตรงกับความต้องการของคุณได้
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card
                title="ติดตามทุกความคืบหน้าของแคมเปญ"
                bordered={false}
                style={{
                  textAlign: "center",
                  background: "#141414",
                  color: "#fff",
                }}
              >
                คุณสามารถติดตามทุกขั้นตอนของแคมเปญ ตั้งแต่การเลือกอินฟลูเอนเซอร์
                การส่งงาน จนถึงการตรวจสอบผลงานและชำระเงิน
                ระบบของเราช่วยให้คุณควบคุมการทำงานและงบประมาณได้อย่างเต็มที่
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card
                title="ชำระเงินง่ายและปลอดภัย"
                bordered={false}
                style={{
                  textAlign: "center",
                  background: "#141414",
                  color: "#fff",
                }}
              >
                ระบบการชำระเงินผ่านเครดิตช่วยให้การทำธุรกรรมระหว่างคุณกับอินฟลูเอนเซอร์เป็นไปอย่างราบรื่นและปลอดภัย
                คุณสามารถเติมเครดิตและชำระเงินเมื่อแคมเปญเสร็จสิ้นได้อย่างง่ายดาย
              </Card>
            </Col>
          </Row>
        </div>
      </Content>
    </>
  );
};

export default MarketerHomePage;
