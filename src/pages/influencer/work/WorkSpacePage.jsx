import React, { useEffect, useState } from "react";
import {
  List,
  Card,
  Button,
  Row,
  Col,
  Divider,
  Modal,
  Form,
  Input,
  Upload,
  message,
  Tabs,
  Typography,
  ConfigProvider,
  Table,
  Tag,
} from "antd";
import { InboxOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import { useForm } from "antd/es/form/Form";
import { useCancelEnrollMutation, useJobEnrollsQuery } from "../../../api/jobApi";

const { TextArea } = Input;
const { TabPane } = Tabs;

const WorkSpacePage = () => {
  const [form] = useForm();
  const { data: jobEnrolls, isLoading: isLoadingJobEnroll, refetch: refetchJobEnroll } = useJobEnrollsQuery(null)
  const [cancelEnroll, { isLoading: isLoadingCancelEnroll }] = useCancelEnrollMutation()
  useEffect(() => {
    refetchJobEnroll()
    setAppliedJobs(jobEnrolls)
  }, [jobEnrolls])

  const allAppliedJobs = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "Tech Corp",
      status: "Pending",
      draft: "",
      draftHistory: [],
    },
    {
      id: 2,
      title: "UI/UX Designer",
      company: "Design Studios",
      status: "Reviewed",
      draft: "",
      draftHistory: [
        {
          jobDetails: "Design Studios Detail",
          posterName: "posterName Name",
          draftStatus: "waiting review",
          upload: [
            {
              uid: "-1",
              type: "image/png",
              url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
              thumbUrl:
                "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
              status: "done",
              percent: 100,
            },
            {
              uid: "-2",
              type: "image/png",
              url: "https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg",
              thumbUrl:
                "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
              status: "done",
              percent: 100,
            },
          ],
        },
      ],
    },
    {
      id: 3,
      title: "Backend Developer",
      company: "API Innovators",
      status: "Accepted",
      draft: "Draft Content",
      draftHistory: [],
    },
    {
      id: 4,
      title: "Frontend Developer 2",
      company: "Tech Corp",
      status: "Pending",
      draft: "",
      draftHistory: [],
    },
    {
      id: 5,
      title: "UI/UX Designer",
      company: "Design Studios",
      status: "Reviewed",
      draft: "",
      draftHistory: [
        {
          jobDetails: "Design Studios dadasdasda",
          posterName: "posterName Nasdasdadame",
          draftStatus: "waiting review",
          upload: [
            {
              uid: "-1",
              type: "image/png",
              url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
              thumbUrl:
                "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
              status: "done",
              percent: 100,
            },

          ],
        },
      ],
    },
  ];

  const [appliedJobs, setAppliedJobs] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentJob, setCurrentJob] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);

  // State variables
  const [isView, setIsView] = useState(false); // Control modal visibility
  const [currentDraftIndex, setCurrentDraftIndex] = useState(null); // Track which draft is being edited

  // Function to handle editing a draft
  const handleViewDraft = (job, draftIndex) => {
    setIsView(true);
    console.log("object :>> ", job.draftHistory[draftIndex]);
    form.setFieldValue("jobDetails", job.draftHistory[draftIndex].jobDetails);
    form.setFieldValue("posterName", job.draftHistory[draftIndex].posterName);
    setFileList(job.draftHistory[draftIndex].upload)
    setIsModalVisible(true); // Open the modal
  };


  // Filter jobs into different categories

  // Open modal for submitting a draft
  const showDraftModal = (job) => {
    setCurrentJob(job);
    setIsModalVisible(true);
  };

  // Handle form submission and save draft to job's history
  const handleSubmit = (values) => {
    setLoading(true);
    console.log(values);
    // Simulate API call or submit logic
    setTimeout(() => {
      setLoading(false);

      // Update the job with new draft submission
      const updatedJobs = appliedJobs.map((job) => {
        if (job.id === currentJob.id) {
          return {
            ...job,
            draft: values.jobDetails, // Store the current draft
            draftHistory: [...job.draftHistory,
            {
              ...values,
              draftStatus: "waiting review",
              upload: values.upload.fileList
            }
            ], // Append to draft history
          };
        }
        return job;
      });
      setAppliedJobs(updatedJobs);

      message.success("Work submitted successfully!");
      setIsModalVisible(false);
    }, 500);
  };

  // Handle job cancellation
  const cancelJob = async (jobId) => {
    const resp = await cancelEnroll({ jobId }).unwrap()
    if (resp) {
      refetchJobEnroll()
      message.success("Job canceled successfully");
    }
  };

  const showConfirm = (jobId) => {
    Modal.confirm({
      title: "ต้องการยกเลิกงานนี้ใช่หรือไม่?",
      icon: <ExclamationCircleFilled />,
      content: "",
      onOk() {
        cancelJob(jobId); // Call the cancelJob method to remove the job
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  // Handle file upload
  const handleUploadChange = ({ fileList }) => {
    setFileList(fileList);
  };
  return (
    <ConfigProvider
      theme={{
        components: {
          Card: {
            headerBg: "#7367F0",
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
            <Typography.Title level={2}>งานของฉัน</Typography.Title>
          </Col>
        </Row>

        <Divider style={{ borderColor: "#4a4a4a" }} />

        {/* Tabs for Jobs */}
        <Row justify="center">
          <Col span={18}>
            <Tabs defaultActiveKey="1">
              {/* Tab 1: Pending Jobs */}
              <TabPane tab="งานที่รอดำเนินการ" key="1">
                <List
                  grid={{ gutter: 16, column: 1 }}
                  dataSource={jobEnrolls?.enrollsJob}
                  renderItem={(job) => (
                    <List.Item>
                      <Card
                        title={`${job?.title}`}
                        extra={
                          <Button
                            color="danger"
                            onClick={() => showConfirm(job.jobId)} // Pass the job ID for cancellation
                          >
                            ยกเลิกงาน
                          </Button>
                        }
                      >
                        <p style={{ color: "#fff" }}>{job.description}</p>
                        <p style={{ color: "#fff" }}>
                          <strong>ประเภทของงาน:</strong><Tag> {job.category}</Tag>
                        </p>
                        <p style={{ color: "#fff" }}>
                          <strong>แบรนด์:</strong> {job.brand}
                        </p>
                      </Card>
                    </List.Item>
                  )}
                />
              </TabPane>

              {/* Tab 2: Jobs to Submit */}
              <TabPane tab="งานที่ต้องส่ง Draft" key="2">
                <List
                  grid={{ gutter: 16, column: 1 }}
                  dataSource={jobEnrolls?.waitDraftJob}
                  renderItem={(job) => (
                    <List.Item>
                      <Card
                        title={`${job.title}`}
                        extra={
                          <Button
                            onClick={() => showDraftModal(job)}
                            style={{ marginRight: "10px" }}
                          >
                            กดส่งแบบร่าง
                          </Button>
                        }
                      >
                        <p style={{ color: "#fff" }}>
                          <strong>สถานะ:</strong> {"รอส่งแบบร่าง"}
                        </p>
                        {/* Display Draft History in a Table */}
                        <p style={{ color: "#fff" }}>
                          <strong>ประวัติการส่งแบบร่าง:</strong>
                        </p>
                        <Table
                          columns={[
                            {
                              title: "ลำดับ",
                              dataIndex: "draftNumber",
                              key: "draftNumber",
                              render: (text, record, index) =>
                                `Draft ${index + 1}`,
                            },
                            {
                              title: "สถานะแบบร่าง",
                              dataIndex: "draftStatus",
                              key: "draftStatus",
                            },
                            {
                              title: "แบบร่าง",
                              dataIndex: "action",
                              key: "action",
                              render: (text, record, index) => (
                                <Button
                                  type="link"
                                  onClick={() => handleViewDraft(job, index)}
                                >
                                  view
                                </Button>
                              ),
                            },
                          ]}
                          dataSource={job.draftHistory}
                          pagination={false}
                          style={{ color: "#fff", overflowX: 'scroll' }}

                        />
                      </Card>
                    </List.Item>
                  )}
                />
              </TabPane>

              {/* Tab 3: Jobs to Submit */}
              <TabPane tab="งานที่ต้อง post จริง" key="3">
                <List
                  grid={{ gutter: 16, column: 1 }}
                  dataSource={jobEnrolls?.waitPostJob}
                  renderItem={(job) => (
                    <List.Item>
                      <Card
                        title={`${job.title} at ${job.company}`}
                        extra={
                          <Button
                            //type="primary"
                            onClick={() => showDraftModal(job)}
                            style={{ marginRight: "10px" }}
                          >
                            {job.draft ? "Resubmit Draft" : "กดส่งแบบร่าง"}
                          </Button>
                        }
                      >
                        <p style={{ color: "#fff" }}>
                          <strong>สถานะ:</strong> {job.status}
                        </p>
                        <p style={{ color: "#fff" }}>
                          <strong>ส่งแบบร่าง:</strong>{" "}
                          {job.draft ? "Yes" : "No"}
                        </p>

                        {/* Display Draft History in a Table */}
                        <p style={{ color: "#fff" }}>
                          <strong>ประวัติการส่งแบบร่าง:</strong>
                        </p>
                        <Table
                          columns={[
                            {
                              title: "ลำดับ",
                              dataIndex: "draftNumber",
                              key: "draftNumber",
                              render: (text, record, index) =>
                                `Draft ${index + 1}`,
                            },
                            {
                              title: "สถานะแบบร่าง",
                              dataIndex: "draftStatus",
                              key: "draftStatus",
                            },
                            {
                              title: "แบบร่าง",
                              dataIndex: "action",
                              key: "action",
                              render: (text, record, index) => (
                                <Button
                                  type="link"
                                  onClick={() => handleViewDraft(job, index)}
                                >
                                  view
                                </Button>
                              ),
                            },
                          ]}
                          dataSource={job.draftHistory}
                          pagination={false}
                          style={{ color: "#fff", overflowX: 'scroll' }}

                        />
                      </Card>
                    </List.Item>
                  )}
                />
              </TabPane>

              {/* Tab 3: Completed Jobs */}
              <TabPane tab="งานที่เสร็จสิ้น" key="4">
                <List
                  grid={{ gutter: 16, column: 1 }}
                  dataSource={jobEnrolls?.completeJob}
                  renderItem={(job) => (
                    <List.Item>
                      <Card title={`${job.title} at ${job.company}`}>
                        <p style={{ color: "#fff" }}>
                          <strong>สถานะ:</strong> {job.status}
                        </p>
                        <p style={{ color: "#fff" }}>
                          <strong>ส่งแบบร่าง:</strong>{" "}
                          {job.draft ? "Yes" : "No"}
                        </p>
                        <p style={{ color: "#fff" }}>
                          <strong>ประวัติแบบร่าง:</strong>
                        </p>
                        <ul style={{ color: "#fff" }}>
                          {job.draftHistory.map((draft, index) => (
                            <li key={index}>{draft}</li>
                          ))}
                        </ul>
                      </Card>
                    </List.Item>
                  )}
                />
              </TabPane>
            </Tabs>
          </Col>
        </Row>

        {/* Modal for submitting draft */}
        <Modal
          title={
            isView ? `view draft` : `ส่งแบบร่าง ${currentJob?.title}`
          }
          visible={isModalVisible}
          onCancel={() => {
            setIsModalVisible(false);
            setIsView(false)
            form.resetFields()
            setFileList([])
          }}
          footer={null}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            initialValues={{}}
          >
            {/* Job Details */}
            <Form.Item
              name="jobDetails"
              label="รายละเอียดงาน"

              rules={[
                { required: true, message: "กรุณาระบุรายละเอียดงาน" },
              ]}
            >
              <TextArea
                disabled={isView}
                rows={4}
                placeholder="ระบุรายละเอียดงานที่กำลังส่ง..."
              />
            </Form.Item>

            {/* Poster Name */}
            <Form.Item
              name="posterName"
              label="ชื่อของผู้ว่าจ้าง"

              rules={[
                {
                  required: true,
                  message:
                    "กรุณากรอกชื่อผู้ลงประกาศงาน!",
                },
              ]}
            >
              <Input disabled={isView} placeholder="ระบุชื่อผู้ลงประกาศงาน..." />
            </Form.Item>

            {/* File Upload */}
            <Form.Item
              name="upload"
              label="Upload Images/Videos"
              rules={[
                { required: true, message: "กรุณาอัพโหลดไฟล์งานของคุณ" },
              ]}
            >
              <Upload.Dragger
                name="files"
                multiple
                listType="picture-card"
                beforeUpload={() => false} // Prevent automatic upload
                accept="image/*,video/*"
                fileList={fileList}
                onChange={handleUploadChange}
                disabled={isView}
              >
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p style={{ color: "GrayText" }}>
                  คลิกหรือลากไฟล์ไปยังพื้นที่นี้เพื่ออัปโหลด
                </p>
                <p className="ant-upload-hint">
                  รองรับการอัปโหลดแบบเดี่ยวหรือเป็นกลุ่ม ห้ามอัปโหลดข้อมูลบริษัทหรือไฟล์ต้องห้ามอื่นๆ โดยเด็ดขาด
                </p>
              </Upload.Dragger>
            </Form.Item>

            {/* Submit Button */}
            <Form.Item>
              {
                !isView && <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  style={{ width: "100%" }}
                >
                  ยืนยัน
                </Button>
              }

            </Form.Item>
          </Form>
        </Modal>
      </div>
    </ConfigProvider>
  );
};

export default WorkSpacePage;
