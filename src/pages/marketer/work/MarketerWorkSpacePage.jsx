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
  message,
} from "antd";
import { Link, useNavigate } from "react-router-dom";
import CreateWork from "./components/CreateWork";
import { useGetJobsQuery, useHireMutation, useRejectMutation, useRemoveJobMutation } from "../../../api/marketer/jobApi";
import { SearchOutlined, CloseCircleOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import { supabase } from "../../../shared/supabase";
import { useMeQuery } from "../../../api/marketer/authApi";

const { Content } = Layout;
const { Paragraph } = Typography;

const MarketerWorkSpace = () => {

  const navigate = useNavigate();
  const { data: me, isLoading } = useMeQuery()
  const { data: jobs, isLoading: isLoadingGetJobs, refetch: refetchGetJobs } = useGetJobsQuery(null)
  const [hire, { isLoading: isLoadingHire }] = useHireMutation()
  const [reject, { isLoading: isLoadingReject }] = useRejectMutation()
  const [removeJob, { isLoading: isLoadingRemoveJob }] = useRemoveJobMutation()
  // Dummy data for tasks and applicants


  supabase
    .channel('schema-db-changes')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: "jobEnroll",
      },
      (payload) => {
        if (me.marketerId == payload?.new?.marketerId) {
          refetchGetJobs()
        }
      }
    )
    .subscribe()

  supabase
    .channel('schema-db-changes')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: "jobDraft",
      },
      (payload) => {
        const setOfJobs = new Set(jobs.map(el => el.jobId))
        console.log('setOfJobs', setOfJobs)
        if (setOfJobs.has(payload?.new?.jobId)) {
          refetchGetJobs()
        }
      }
    )
    .subscribe()

  supabase
    .channel('schema-db-changes')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: "jobPost",
      },
      (payload) => {
        const setOfJobs = new Set(jobs.map(el => el.jobId))
        if (setOfJobs.has(payload?.new?.jobId)) {
          refetchGetJobs()
        }
      }
    )
    .subscribe()

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
    setIsModalAddTaskVisible(false)
  }
  const handleCloseAddJob = () => {
    setIsModalAddTaskVisible(false)
  }
  // Function to show applicants for a job
  const showApplicants = (job) => {
    setSelectedTask(job);
    setIsModalVisible(true);
  };



  const showConfirmHire = (applicant) => {
    Modal.confirm({
      title: 'ต้องการจ้าง Influencer คนนี้ใช่หรือไม่?',
      icon: <ExclamationCircleFilled />,
      content: '',
      async onOk() {
        const resp = await hire({ jobEnrollId: applicant?.jobEnrollId }).unwrap()

        if (resp) {
          message.success("ยืนยันการจ้างงานสำเร็จ")
          const newJobEnroll = selectedTask.jobEnroll.filter(el => el.jobEnrollId != applicant?.jobEnrollId)
          setSelectedTask({
            ...selectedTask,
            jobEnroll: newJobEnroll
          })
          refetchGetJobs()
        }
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };


  const showConfirmReject = (applicant) => {
    Modal.confirm({
      title: 'ต้องการปฏิเสธ หรือไม่?',
      icon: <ExclamationCircleFilled />,
      content: '',
      async onOk() {
        const resp = await reject({ jobEnrollId: applicant?.jobEnrollId }).unwrap()

        if (resp) {
          message.success("ปฏิเสธการจ้างงานสำเร็จ")
          const newJobEnroll = selectedTask.jobEnroll.filter(el => el.jobEnrollId != applicant?.jobEnrollId)
          setSelectedTask({
            ...selectedTask,
            jobEnroll: newJobEnroll
          })
          refetchGetJobs()
        }
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const showConfirmRemove = (job) => {
    Modal.confirm({
      title: 'ต้องการลบประกาศงาน หรือไม่?',
      icon: <ExclamationCircleFilled />,
      content: '',
      async onOk() {
        console.log('first', job)
        const resp = await removeJob({ jobId: job?.jobId }).unwrap()

        if (resp) {
          message.success("ลบประกาศงานสำเร็จ")
          refetchGetJobs()
        }
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }


  return (
    <ConfigProvider
      theme={{
        components: {
          Card: {
            headerBg: "linear-gradient(to right, #5A4FF5, #A582F7, #CE9FFC)",
            colorBgContainer: "#2c2c2c",
          },
          Modal: {
            titleColor: '#000'
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
            {jobs?.map((job, index) => {
              const jobEnrollPending = job?.jobEnroll?.filter(el => el.jobStatus == 'pending')
              const getHireEnroll = job?.jobEnroll?.filter(el => el.jobStatus != 'pending' && el.jobStatus != 'cancel' && el.jobStatus != 'reject')
              const numberDraftPending = job?.jobDraft.filter(el => el.status == 'pending').length
              const numberPostPending = job?.jobPost.filter(el => el.status == 'pending').length
              return (
                <Row key={index} gutter={[16, 16]} style={{ marginBottom: '30px' }}>
                  <Col span={24}>
                    <Card
                      title={`${job?.jobId}: ${job?.jobTitle}`}
                      extra={
                        <>
                          <Row justify={'center'} align={'middle'}>
                            <Col style={{ 'color': '#fff' }}>
                              <>
                                จำนวนผู้สมัครที่ได้แล้ว {getHireEnroll.length}/{job?.influencerCount}
                              </>
                            </Col>
                            <Col>
                              <Button type="link" onClick={() => showApplicants(job)} disabled={jobEnrollPending.length == 0}>
                                รายชื่อผู้สมัคร ({jobEnrollPending.length})
                              </Button>
                            </Col>
                          </Row>
                        </>
                      }

                      actions={[
                        <Button type="link" danger disabled={getHireEnroll.length > 0} onClick={() => showConfirmRemove(job)}>
                          ลบ
                        </Button>
                        ,
                        <Button type="primary" onClick={() => navigate("/marketer/check-work", { state: { jobId: job?.jobId, jobTitle: job?.jobTitle } })}>
                          ตรวจงาน ({numberDraftPending + numberPostPending})
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
              )
            })}
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
          open={isModalVisible && selectedTask?.jobEnroll.length != 0}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
        >
          {selectedTask?.jobEnroll.filter(el => el.jobStatus == 'pending').map((applicant, index) => (
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
                  <Link to={`/marketer/view-influ-profile/${applicant?.influencer?.influId}`} target="_blank" rel="noopener noreferrer" >
                    โปรไฟล์
                  </Link>
                </Col>
                <Col key={index} style={{ display: 'flex', gap: '0.5rem' }}>

                  <Button danger onClick={() => showConfirmReject(applicant)}>
                    ปฏิเสธ
                  </Button>
                  <Button type="primary" onClick={() => showConfirmHire(applicant)}>
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
