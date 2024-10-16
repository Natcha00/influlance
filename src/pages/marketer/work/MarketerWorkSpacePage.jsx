import React, { useState } from "react";
import {
  Layout,
  Tabs,
  Card,
  Button,
  Row,
  Col,
  Typography,
  Popconfirm,
  Divider,
  ConfigProvider,
  Modal,
} from "antd";
import { useNavigate } from "react-router-dom";

const { Content } = Layout;
const { Paragraph } = Typography;

const MarketerWorkSpace = () => {

  const navigate = useNavigate();

  // Dummy data for tasks and applicants
  const pendingTasks = [
    {
      title: "Campaign for Product X",
      applicants: [
        { name: "John Doe", profileUrl: "/profile/john", id: 1 },
        { name: "Jane Smith", profileUrl: "/profile/jane", id: 2 },
      ],
      deadline: "2024-11-10",
    },
    {
      title: "Social Media Outreach",
      applicants: [
        { name: "Alice Brown", profileUrl: "/profile/alice", id: 3 },
        { name: "Bob White", profileUrl: "/profile/bob", id: 4 },
      ],
      deadline: "2024-10-25",
    },
  ];

  const completedTasks = [
    { title: "Influencer Review for Product Y", completedDate: "2024-09-30" },
  ];

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  // Function to show applicants for a task
  const showApplicants = (task) => {
    setSelectedTask(task);
    setIsModalVisible(true);
  };

  const handleHire = (applicant) => {
    console.log(`Hired ${applicant.name}`);
  };

  const handleReject = (applicant) => {
    console.log(`Rejected ${applicant.name}`);
  };

  const handleViewProfile = (profileUrl) => {
    navigate(profileUrl);
  };

  // Tabs content for pending tasks
  const renderPendingTasks = () => (
    <>
      {pendingTasks.map((task, index) => (
        <Row  key={index} gutter={[16, 16]} style={{ marginBottom: '30px' }}>
          <Col span={24}>
            <Card
              title={task.title}
              extra={
                <Button  type="link" onClick={() => showApplicants(task)} >
                  รายชื่อผู้สมัคร ({task.applicants.length})
                </Button>
              }

              actions={[
                <Popconfirm
                  title="คุณแน่ใจหรือไม่ว่าต้องการลบโพสต์นี้?"
                  onConfirm={() => console.log("Post deleted")}
                >
                
                  <Button type="link" danger>
                    ลบ
                  </Button>
                </Popconfirm>,
                <Button type="primary" onClick={() => navigate("/check-work")}>
                  ตรวจงาน
                </Button>

              ]}
            >
              <Paragraph>ชื่อผู้สร้าง: {task.deadline}</Paragraph>
              <Paragraph>รายละเอียดงาน: {task.deadline}</Paragraph>
              <Paragraph>จำนวนผู้ติดตามInfluencer: {task.deadline}</Paragraph>
              <Paragraph>จำนวน Influencer : {task.deadline}</Paragraph>
              <Paragraph>ค่าจ้าง: {task.deadline}</Paragraph>
              <Paragraph>รับสมัครถึงวันที่: {task.deadline}</Paragraph>
            </Card>
            
          </Col>
          
        </Row>
      ))}
    </>
  );

  // Tabs content for completed tasks
  const renderCompletedTasks = () => (
    <Row gutter={[16, 16]}>
      {completedTasks.map((task, index) => (
        <Col span={24} key={index}>
          <Card
            title={task.title}
            actions={[
              <Button type="primary" onClick={() => navigate("view-completed")}>
                ดูงาน
              </Button>,
            ]}
          >
            <Paragraph>Completed on: {task.completedDate}</Paragraph>
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
            colorText: "#fff",
          },
          Modal:{
            colorText: '#000'
          }
        },
      }}
    >
      <div style={{ padding: "20px", minHeight: "100vh" }}>
        <Row justify="center" style={{ marginBottom: "20px" }}>
          <Col span={18}>
            <Typography.Title level={2}>แคมเปญของฉัน</Typography.Title>
          </Col>
        </Row>

        <Divider style={{ borderColor: "#4a4a4a" }} />

        {/* Tabs for Jobs */}
        <Content style={{ padding: "0 50px", marginTop: 64 }}>
          <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab="งานที่รอดำเนินการ" key="1">
              {renderPendingTasks()}
            </Tabs.TabPane>
            <Tabs.TabPane tab="งานที่เสร็จสิ้น" key="2">
              {renderCompletedTasks()}
            </Tabs.TabPane>
          </Tabs>

          {/* Modal to show applicants */}
          {selectedTask && (
            <Modal
              title={`รายชื่อผู้สมัคร ${selectedTask.title}`}
              visible={isModalVisible}
              onCancel={() => setIsModalVisible(false)}
              footer={null}
            >
              {selectedTask.applicants.map((applicant) => (
                <Row key={applicant.id} style={{ marginBottom: "10px" }}>
                  <Col span={12}>
                    <Paragraph style={{colorText:'#000'}}>{applicant.name}</Paragraph>
                  </Col>
                  <Col span={12} style={{ textAlign: "right" }}>
                    <Button
                      type="link"
                      onClick={() => handleViewProfile(applicant.profileUrl)}
                    >
                      โปรไฟล์
                    </Button>
                    <Button type="primary" onClick={() => handleHire(applicant)}>
                      จ้าง
                    </Button>
                    <Button danger onClick={() => handleReject(applicant)}>
                      ปฏิเสธ
                    </Button>
                  </Col>
                </Row>
              ))}
            </Modal>
          )}

          {/* Footer */}
          <Divider />
        </Content>
      </div>
    </ConfigProvider>
  );
};

export default MarketerWorkSpace;
