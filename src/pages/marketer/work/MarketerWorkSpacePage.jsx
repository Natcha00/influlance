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
  Input,
  Image,
} from "antd";
import { useNavigate } from "react-router-dom";
import CreateWork from "./components/CreateWork";
import { useGetJobsQuery } from "../../../api/marketer/jobApi";

const { Content } = Layout;
const { Paragraph } = Typography;

const MarketerWorkSpace = () => {

  const navigate = useNavigate();
  const { data: jobs, isLoading: isLoadingGetJobs } = useGetJobsQuery(null)
  console.log('jobs', jobs)
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
  const [isModalAddTaskVisible, setIsModalAddTaskVisible] = useState(false)
  const handleAddJob = () => {

  }
  const handleCloseAddJob = () => {

  }
  // Function to show applicants for a job
  const showApplicants = (job) => {
    setSelectedTask(job);
    setIsModalVisible(true);
  };

  const handleHire = (applicant) => {
    console.log(`Hired ${applicant.name}`);
  };

  const handleReject = (applicant) => {
    console.log(`Rejected ${applicant.name}`);
  };

  const handleViewProfile = (profileUrl) => {
    // navigate(profileUrl);
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Card: {
            headerBg: "linear-gradient(to right, #5A4FF5, #A582F7, #CE9FFC)",
            colorBgContainer: "#2c2c2c",
          }
        },
      }}
    >

      <Typography.Title level={2}>แคมเปญของฉัน</Typography.Title>
      <Divider style={{ borderColor: "#4a4a4a" }} />
      <Row justify={'end'}>
        <Button type='primary' onClick={() => setIsModalAddTaskVisible(true)}>เพิ่มประกาศหา Influencer</Button>
      </Row>
      {/* Tabs for Jobs */}
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="งานที่รอดำเนินการ" key="1">
          <>
            {jobs?.map((job, index) => (
              <Row key={index} gutter={[16, 16]} style={{ marginBottom: '30px' }}>
                <Col span={24}>
                  <Card
                    title={job?.jobTitle}
                    extra={
                      <Button type="link" onClick={() => showApplicants(job)} disabled={job?.jobEnroll.length == 0}>
                        รายชื่อผู้สมัคร ({job?.jobEnroll.length})
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
                      <Button type="primary" onClick={() => navigate("/marketer/check-work")}>
                        ตรวจงาน
                      </Button>

                    ]}
                  >
                    <Paragraph>ชื่อผู้สร้าง: {job?.marketerName}</Paragraph>
                    <Paragraph>รายละเอียดงาน: {job?.jobDescription}</Paragraph>
                    <Paragraph>จำนวนผู้ติดตามInfluencer: {job?.follower}</Paragraph>
                    <Paragraph>จำนวน Influencer : {job?.influencerCount}</Paragraph>
                    <Paragraph>งบประมาณ : {job?.totalPayment}</Paragraph>
                    <Paragraph>ค่าจ้างต่อคน: {job?.paymentPerInfluencer}</Paragraph>
                    <Paragraph>รับสมัครถึงวันที่: {job?.dueDate}</Paragraph>
                  </Card>

                </Col>

              </Row>
            ))}
          </>
        </Tabs.TabPane>
        {/* <Tabs.TabPane tab="งานที่เสร็จสิ้น" key="2">
          <Row gutter={[16, 16]}>
            {completedTasks?.map((job, index) => (
              <Col span={24} key={index}>
                <Card
                  title={job?.title}
                  actions={[
                    <Button type="primary" onClick={() => navigate("/marketer/view-completed")}>
                      ดูงาน
                    </Button>,
                  ]}
                >
                  <Paragraph>Completed on: {job?.completedDate}</Paragraph>
                </Card>
              </Col>
            ))}
          </Row>
        </Tabs.TabPane> */}
      </Tabs>

      {/* Modal to show applicants */}
      <ConfigProvider theme={{
        components: {
          Typography: {
            colorText: "#000"
          },
          Divider: {
            colorText: "#000",
            colorSplit: "#000"
          }
        }
      }}>
        <Modal
          title={`รายชื่อผู้สมัคร ${selectedTask?.jobTitle}`}
          open={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
        >
          {selectedTask?.jobEnroll.map((applicant, index) => (
            <>
              <Row key={index} style={{ marginBottom: "10px" }} gutter={[20, 20]}>
                <Col span={12}>
                  <Image src={applicant?.influencer?.profilePicture} width={'100%'} preview={false} />
                </Col>
                <Col span={12}>
                  <Paragraph>{applicant?.influencer?.firstName} {applicant?.influencer?.lastName}</Paragraph>
                  <Paragraph>{applicant?.influencer?.facebook}</Paragraph>
                  <Paragraph>Follower : {applicant?.influencer?.facebookFollower}</Paragraph>
                  <Paragraph>{applicant?.influencer?.tiktok}</Paragraph>
                  <Paragraph>Follower : {applicant?.influencer?.tiktokFollower}</Paragraph>
                  <Paragraph>{applicant?.influencer?.x}</Paragraph>
                  <Paragraph>Follower : {applicant?.influencer?.xFollower}</Paragraph>
                  <Paragraph>{applicant?.influencer?.instagram}</Paragraph>
                  <Paragraph>Follower : {applicant?.influencer?.instagramFollower}</Paragraph>
                </Col>

              </Row>
              <Row key={index} justify={'space-between'}>
                <Col>
                  <Button
                    type="link"
                    onClick={() => handleViewProfile(applicant)}
                  >
                    โปรไฟล์
                  </Button>
                </Col>
                <Col style={{ display: 'flex', gap: '0.5rem' }}>

                  <Button danger onClick={() => handleReject(applicant)}>
                    ปฏิเสธ
                  </Button>
                  <Button type="primary" onClick={() => handleHire(applicant)}>
                    จ้าง
                  </Button>
                </Col>
              </Row>
              <Divider />
            </>
          ))}
        </Modal>
      </ConfigProvider>
      {/*Modal add Job*/}
      <Modal
        title="เพิ่มประกาศหา Influencer"
        open={isModalAddTaskVisible}
        onCancel={() => setIsModalAddTaskVisible(false)}
        footer={null}
      // width={800}
      >
        <CreateWork onAdd={handleAddJob} onClose={handleCloseAddJob} />
      </Modal>
      <Divider />
    </ConfigProvider>
  );
};

export default MarketerWorkSpace;
