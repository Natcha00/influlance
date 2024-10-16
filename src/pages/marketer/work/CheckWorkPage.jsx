import React, { useState } from "react";
import {
  Layout,
  Tabs,
  Card,
  Button,
  Row,
  Col,
  Typography,
  Divider,
  ConfigProvider,
  Popconfirm,
  Input,
  Modal,
} from "antd";
import { useNavigate } from "react-router-dom";

const { Content } = Layout;
const { Paragraph } = Typography;

const CheckWorkPage = () => {
const navigate = useNavigate();

  // State to manage rejection reason modal
  const [rejectReason, setRejectReason] = useState("");
  const [visible, setVisible] = useState(false);
  const [currentSubmission, setCurrentSubmission] = useState(null);

  // Dummy data for draft and final submissions
  const draftSubmissions = [
    {
      name: "John Doe",
      profileUrl: "/profile/john",
      jobDescription: "Draft submission for Product X campaign",
      media: [
        { type: "image", url: "/media/john-draft.jpg" },
        { type: "video", url: "/media/john-draft.mp4" },
      ],
    },
    {
      name: "Jane Smith",
      profileUrl: "/profile/jane",
      jobDescription: "Draft submission for Social Media Outreach",
      media: [
        { type: "image", url: "/media/jane-draft.jpg" },
      ],
    },
  ];

  const finalSubmissions = [
    {
      name: "John Doe",
      profileUrl: "/profile/john",
      socialLink: "https://instagram.com/johndoe/post/123",
    },
    {
      name: "Jane Smith",
      profileUrl: "/profile/jane",
      socialLink: "https://facebook.com/janesmith/post/456",
    },
  ];

  // Function to render media for drafts
  const renderMedia = (media) => {
    return media.map((item, index) => {
      if (item.type === "image") {
        return (
          <img
            key={index}
            src={item.url}
            alt="Draft Media"
            style={{ width: "100%", marginBottom: "10px" }}
          />
        );
      } else if (item.type === "video") {
        return (
          <video key={index} controls style={{ width: "100%" }}>
            <source src={item.url} type="video/mp4" />
            เบราว์เซอร์ของคุณไม่รองรับแท็กวิดีโอ
          </video>
        );
      }
      return null;
    });
  };

  // Function to handle accept action
  const handleAccept = (name) => {
    console.log(`${name} has been accepted.`);
    // Implement further logic, e.g., updating state or making API calls
  };

  // Function to handle reject action
  const handleReject = (name) => {
    setCurrentSubmission(name); // Set the current submission being rejected
    setVisible(true); // Show the modal for rejection reason
  };

  // Function to confirm rejection
  const confirmReject = () => {
    console.log(`${currentSubmission} has been rejected for: ${rejectReason}`);
    setVisible(false); // Hide the modal
    setRejectReason(""); // Clear the reject reason
    setCurrentSubmission(null); // Clear the current submission
    // Implement further logic, e.g., updating state or making API calls
  };

  // Function to handle modal cancel
  const handleCancel = () => {
    setVisible(false); // Hide the modal
    setRejectReason(""); // Clear the reject reason
    setCurrentSubmission(null); // Clear the current submission
  };

  // Tabs content for draft review
  const renderDraftSubmissions = () => (
    <Row gutter={[16, 16]}>
      {draftSubmissions.map((submission, index) => (
        <Col span={24} key={index}>
          <Card
            title={submission.name}
            extra={
              <Button
                type="link"
                onClick={() => navigate(submission.profileUrl)}
              >
                โปรไฟล์
              </Button>
            }
          >
            <Paragraph>{submission.jobDescription}</Paragraph>
            {renderMedia(submission.media)}

            {/* Accept and Reject buttons */}
            <Row justify="end" gutter={16}>
              <Col>
                <Button type="primary" onClick={() => handleAccept(submission.name)}>
                  ยืนยัน
                </Button>
              </Col>
              <Col>
                <Button type="default" danger onClick={() => handleReject(submission.name)}>
                  ปฏิเสธ
                </Button>
              </Col>
            </Row>
          </Card>
        </Col>
      ))}
    </Row>
  );

  // Tabs content for final review
  const renderFinalSubmissions = () => (
    <Row gutter={[16, 16]}>
      {finalSubmissions.map((submission, index) => (
        <Col span={24} key={index}>
          <Card
            title={submission.name}
            extra={
              <Button
                type="link"
                onClick={() => navigate(submission.profileUrl)}
              >
               โปรไฟล์
              </Button>
            }
          >
            <Paragraph>
              ลิงค์งาน:{" "}
              <a href={submission.socialLink} target="_blank" rel="noopener noreferrer">
                {submission.socialLink}
              </a>
            </Paragraph>

            {/* Accept and Reject buttons */}
            <Row justify="end" gutter={16}>
              <Col>
                <Button type="primary" onClick={() => handleAccept(submission.name)}>
                  ยืนยัน
                </Button>
              </Col>
              <Col>
                <Button type="default" danger onClick={() => handleReject(submission.name)}>
                  ปฏิเสธ
                </Button>
              </Col>
            </Row>
          </Card>
        </Col>
      ))}
    </Row>
  );

  return (
    <ConfigProvider
      theme={{
        components: {
          Card: {
            headerBg: "linear-gradient(to right, #5A4FF5, #A582F7, #CE9FFC)",
            colorBgContainer: "#2c2c2c",
          },
          Typography: {
            colorText: "#000",
          },
        },
      }}
    >
      <div style={{ padding: "20px", minHeight: "100vh" }}>
        <Row justify="center" style={{ marginBottom: "20px" }}>
          <Col span={18}>
            <Typography.Title level={2}>ตรวจงาน</Typography.Title>
          </Col>
        </Row>

        <Divider style={{ borderColor: "#4a4a4a" }} />

        {/* Tabs for reviewing work */}
        <Content style={{ padding: "0 50px", marginTop: 64 }}>
          <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab="ตรวจงาน Draft" key="1">
              {renderDraftSubmissions()}
            </Tabs.TabPane>
            <Tabs.TabPane tab="ตรวจงานจริง" key="2">
              {renderFinalSubmissions()}
            </Tabs.TabPane>
          </Tabs>

          {/* Rejection reason modal */}
          <Modal
            title="เหตุผลในการปฏิเสธ"
            visible={visible}
            onOk={confirmReject}
            onCancel={handleCancel}
            okText="ยืนยัน"
            cancelText="ยกเลิก"
          >
            <Input
              placeholder="กรุณาใส่เหตุผล"
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
            />
          </Modal>

          {/* Footer */}
          <Divider />
        </Content>
      </div>
    </ConfigProvider>
  );
};

export default CheckWorkPage;
