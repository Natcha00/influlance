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
  Image,
  Collapse,
  Badge,
} from "antd";
import { InboxOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import { useForm } from "antd/es/form/Form";
import { useCancelEnrollMutation, useJobEnrollsQuery, useSaveDraftMutation, useSavePostMutation } from "../../../api/influencer/jobApi";
import { FcCheckmark } from "react-icons/fc";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import DraggerUpload from "../../../components/DraggerUpload";
import dayjs from "dayjs";
import Title from "antd/es/typography/Title";
import { supabase } from "../../../shared/supabase";
import { useMeQuery } from "../../../api/influencer/authApi";

const { TextArea } = Input;
const { TabPane } = Tabs;
const { Paragraph } = Typography

const WorkSpacePage = () => {
  const [form] = useForm();
  const [formPost] = useForm()
  const { data: me } = useMeQuery()
  const { data: jobEnrolls, isLoading: isLoadingJobEnroll, refetch: refetchJobEnroll } = useJobEnrollsQuery(null)
  const [cancelEnroll, { isLoading: isLoadingCancelEnroll }] = useCancelEnrollMutation()
  const [saveDraft, { isLoading: isLoadingSaveDraft }] = useSaveDraftMutation()
  const [savePost, { isLoading: isLoadingSavePost }] = useSavePostMutation()

  supabase
    .channel('schema-db-changes')
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: "jobEnroll",
      },
      (payload) => {
        if (me?.influId == payload?.new?.influId) {
          refetchJobEnroll()
        }
      }
    )
    .subscribe()

  supabase
    .channel('schema-db-changes')
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: "jobDraft",
      },
      (payload) => {
        const setOfJobsEnroll = new Set(jobEnrolls?.waitDraftJob
          .map(el => el.jobEnrollId))
        console.log('setOfJobsEnroll', setOfJobsEnroll)
        if (setOfJobsEnroll.has(payload?.new?.jobEnrollId)) {
          refetchJobEnroll()
        }
      }
    )
    .subscribe()

  supabase
    .channel('schema-db-changes')
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: "jobPost",
      },
      (payload) => {
        const setOfJobsEnroll = new Set(jobEnrolls?.waitPostJob
          .map(el => el.jobEnrollId))
        if (setOfJobsEnroll.has(payload?.new?.jobEnrollId)) {
          refetchJobEnroll()
        }
      }
    )
    .subscribe()

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalPostVisible, setIsModalPostVisible] = useState(false)
  const [currentJob, setCurrentJob] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [videoFileList, setVideoFileList] = useState([])
  const [imagePostFileList, setImagePostFileList] = useState([])
  const [link, setLink] = useState(null)
  const [loading, setLoading] = useState(false);

  // State variables
  const [isView, setIsView] = useState(false); // Control modal visibility
  const [currentDraftIndex, setCurrentDraftIndex] = useState(null); // Track which draft is being edited

  // Function to handle editing a draft
  const handleViewDraft = (job, index) => {
    setIsView(true);
    if (job.jobStatus == 'wait draft') {
      form.setFieldValue("content", job.jobDraft[index].content);
      form.setFieldValue("reasonReject", job.jobDraft[index].reasonReject);
      const image = [
        ...job.jobDraft[index]?.pictureURL,
      ].map((el, i) => ({
        uid: `-${i + 1}`,
        type: "image/png",
        url: el,
        thumbUrl: el,
        status: "done",
      }))

      setFileList(image)
      form.setFieldValue('image', image)
      const video = [
        ...job.jobDraft[index]?.videoURL,
      ].map((el, i) => ({
        uid: `-${i + 1}`,
        type: "image/png",
        url: el,
        thumbUrl: el,
        status: "done",
      }))
      setVideoFileList(video)
      form.setFieldValue('video', video)
    }
    setIsModalVisible(true); // Open the modal
  };

  const handleViewPost = (job, index) => {
    setIsView(true);
    if (job.jobStatus == 'wait post') {
      formPost.setFieldValue("postLink", job.jobPost[index].postLink);
      formPost.setFieldValue("reasonReject", job.jobPost[index].reasonReject);
      const image = [
        ...job.jobPost[index]?.pictureURL,
      ].map((el, i) => ({
        uid: `-${i + 1}`,
        type: "image/png",
        url: el,
        thumbUrl: el,
        status: "done",
      }))
      setLink(job.jobPost[index].postLink)
      setImagePostFileList(image)
      formPost.setFieldValue('image', image)
    }
    setIsModalPostVisible(true); // Open the modal

  }


  // Filter jobs into different categories

  // Open modal for submitting a draft
  const showDraftModal = (job) => {
    setCurrentJob(job);
    setIsModalVisible(true);
  };

  const showPostModal = (job) => {
    setCurrentJob(job);
    setIsModalPostVisible(true);
  }

  // Handle form submission and save draft to job's history
  const handleSubmit = async (values, currentJob) => {
    try {
      console.log('values', values)
      console.log('currentJob', currentJob)
      if (currentJob.jobStatus == 'wait draft') {
        const resp = await saveDraft({
          jobId: currentJob.jobId,
          content: values.content,
          pictureURL: values.image?.map(el => el.url) ?? [],
          videoURL: values.video?.map(el => el.url) ?? [],
          jobEnrollId: currentJob.jobEnrollId
        })

        if (resp) {
          message.success("บันทึกงานสำเร็จ !");
          refetchJobEnroll()
          setIsModalVisible(false);
        }
      }

    } catch (error) {
      console.log('error', error)
      message.error("เกิดข้อผิดพลาด")
    }

  };

  const handleSubmitPost = async (values, currentJob) => {
    try {
      if (currentJob.jobStatus == 'wait post') {
        const resp = await savePost({
          pictureURL: values.image?.map(el => el.url) ?? [],
          postLink: values.postLink,
          jobEnrollId: currentJob.jobEnrollId,
          jobId: currentJob.jobId
        })

        if (resp) {
          message.success("บันทึกงานสำเร็จ !");
          refetchJobEnroll()
          setIsModalPostVisible(false);
        }
      }
    } catch (error) {
      console.log('error', error)
      message.error("เกิดข้อผิดพลาด")
    }

  }

  // Handle job cancellation
  const cancelJob = async (jobEnrollId) => {
    const resp = await cancelEnroll({ jobEnrollId }).unwrap()
    if (resp) {
      refetchJobEnroll()
      message.success("Job canceled successfully");
    }
  };

  const showConfirm = (jobEnrollId) => {
    Modal.confirm({
      title: "ต้องการยกเลิกงานนี้ใช่หรือไม่?",
      /*       icon: <ExclamationCircleFilled />, */
      content: "",
      onOk() {
        cancelJob(jobEnrollId); // Call the cancelJob method to remove the job
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
            headerBg: "linear-gradient(to right, #5A4FF5, #A582F7, #CE9FFC)",
            colorBgContainer: "#2c2c2c",
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
              <TabPane tab={<Badge count={jobEnrolls?.enrollsJob?.length} offset={[10, -5]}>
                งานที่รอดำเนินการ
              </Badge>} key="1">
                <List
                  grid={{ gutter: 16, column: 1 }}
                  dataSource={jobEnrolls?.enrollsJob}
                  renderItem={(job) => (
                    <List.Item>
                      <Card
                        title={`${job?.jobTitle}`}
                        extra={
                          <Button
                            color="danger"
                            onClick={() => showConfirm(job?.jobEnrollId)} // Pass the job ID for cancellation
                          >
                            ยกเลิกงาน
                          </Button>
                        }
                      >
                        <Row gutter={[20, 20]}>
                          <Col span={16}>
                            <Paragraph style={{ color: "#fff" }}>{job?.jobDescription}</Paragraph>
                            <Paragraph style={{ color: "#fff" }}>
                              <strong>ประเภทของงาน : </strong><Tag> {job?.tag}</Tag>
                            </Paragraph>
                            <Paragraph>
                              <strong>รายได้ : </strong> {job?.paymentPerInfluencer}
                            </Paragraph>
                            <Paragraph>
                              <strong>สิ้นสุดรับสมัคร : </strong> {job?.dueDate}
                            </Paragraph>
                            <Paragraph>
                              <strong>จำนวนผู้ติดตามขั้นต่ำ : </strong> {job?.follower}
                            </Paragraph>
                            <Paragraph>
                              <strong>จำนวนรับสมัคร : </strong> {job?.influencerCount}
                            </Paragraph>
                          </Col>
                          <Col span={8}>
                            <Image src={job?.files[0]} width={'100%'} preview={false} />
                          </Col>
                        </Row>
                      </Card>
                    </List.Item>
                  )}
                />
              </TabPane>

              {/* Tab 2: Jobs to Submit */}
              <TabPane tab={<Badge count={jobEnrolls?.waitDraftJob?.length} offset={[10, -5]}>
                งานที่ต้องส่ง Draft
              </Badge>} key="2">
                <List
                  grid={{ gutter: 16, column: 1 }}
                  dataSource={jobEnrolls?.waitDraftJob}
                  renderItem={(job) => (
                    <List.Item>
                      <Card
                        title={`${job?.jobTitle}`}
                        extra={
                          <Button
                            onClick={() => showDraftModal(job)}
                            style={{ marginRight: "10px" }}
                            disabled={job?.jobDraft.some(e => e.status == 'approve' || e.status == 'pending')}
                          >
                            {job?.jobDraft?.some(e => e.status == 'pending') ? "งานอยู่ในการรอตรวจ" : "กดส่งแบบร่าง"}
                          </Button>
                        }
                      >
                        <Row gutter={[20, 20]}>
                          <Col span={16}>
                            <Paragraph style={{ color: "#fff" }}>{job?.jobDescription}</Paragraph>
                            <Paragraph style={{ color: "#fff" }}>
                              <strong>ประเภทของงาน : </strong><Tag> {job?.tag}</Tag>
                            </Paragraph>
                            <Paragraph>
                              <strong>รายได้ : </strong> {job?.paymentPerInfluencer}
                            </Paragraph>

                          </Col>
                          <Col span={8}>
                            <Image src={job?.files[0]} width={'100%'} preview={false} />
                          </Col>
                        </Row>
                        <Divider orientation="left">ประวัติการส่งแบบร่าง</Divider>
                        <Table
                          columns={[
                            {
                              title: "ลำดับ",
                              dataIndex: "draftNumber",
                              key: "draftNumber",
                              render: (text, record, index) =>
                                `${index + 1}`,
                            },
                            {
                              title: "สถานะแบบร่าง",
                              dataIndex: "status",
                              key: "status",
                              render: (_, record) => <Tag color={
                                record.status == 'approve' ?
                                  "green" :
                                  record.status == 'reject' ?
                                    "red" :
                                    "blue"
                              }>{record.status}</Tag>
                            },
                            {
                              title: "วันที่ร่าง",
                              key: "createDate",
                              render: (_, record) => `${dayjs(record.createDate).format('YYYY-MM-DD HH:mm')}`
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
                          dataSource={job?.jobDraft}
                          pagination={false}
                          style={{ color: "#fff", overflowX: 'scroll' }}

                        />
                      </Card>
                    </List.Item>
                  )}
                />
              </TabPane>

              {/* Tab 3: Jobs to Submit */}
              <TabPane tab={<Badge count={jobEnrolls?.waitPostJob?.length} offset={[10, -5]}>
                งานที่ต้อง Post จริง
              </Badge>} key="3">
                <List
                  grid={{ gutter: 16, column: 1 }}
                  dataSource={jobEnrolls?.waitPostJob}
                  renderItem={(job) => (
                    <List.Item>
                      <Card
                        title={`${job?.jobTitle}`}
                        extra={
                          <Button
                            //type="primary"
                            onClick={() => showPostModal(job)}
                            style={{ marginRight: "10px" }}
                            disabled={job?.jobPost?.some(e => e.status == 'approve')}
                          >
                            กดส่งแบบร่าง
                          </Button>
                        }
                      >
                        <Row gutter={[20, 20]}>
                          <Col span={16}>
                            <Paragraph style={{ color: "#fff" }}>{job?.jobDescription}</Paragraph>
                            <Paragraph style={{ color: "#fff" }}>
                              <strong>ประเภทของงาน : </strong><Tag> {job?.tag}</Tag>
                            </Paragraph>
                            <Paragraph>
                              <strong>รายได้ : </strong> {job?.paymentPerInfluencer}
                            </Paragraph>

                          </Col>
                          <Col span={8}>
                            <Image src={job?.files[0]} width={'100%'} preview={false} />
                          </Col>
                        </Row>
                        {/*             <Divider orientation="left"> Draft ทีผ่านการอนุมัติ</Divider> */}
                        <Collapse
                          items={[{
                            key: '1', label: 'Draft ทีผ่านการอนุมัติ', children: <>
                              <Row>
                                <Col span={24}>
                                  <Paragraph level={5}><strong>เนื้อหา :</strong></Paragraph>
                                  <Paragraph>{job?.jobDraft.find(el => el.status == 'approve').content}</Paragraph>
                                </Col>
                              </Row>
                              <Row>
                                <Col span={24} >
                                  <Paragraph level={5}><strong>รูปภาพ : </strong></Paragraph>
                                </Col>
                                {job?.jobDraft.find(el => el.status == 'approve').pictureURL?.map((el, i) =>
                                  <Col span={4} >
                                    <Image key={i} src={el} width={'100%'} />
                                  </Col>
                                )
                                }
                              </Row>
                              <Row>
                                <Col span={24} >
                                  <Paragraph level={5}><strong>วิดิโอ : </strong></Paragraph>
                                </Col>
                                {job?.jobDraft.find(el => el.status == 'approve').videoURL?.map((el, i) =>
                                  <Col span={4} >
                                    <video src={el} width={'100%'} />
                                  </Col>
                                )
                                }
                              </Row>
                            </>
                          }]}
                        />

                        <Divider orientation="left">ดูประวัติการส่งแบบร่าง</Divider>
                        <Table
                          columns={[
                            {
                              title: "ลำดับ",
                              dataIndex: "draftNumber",
                              key: "draftNumber",
                              render: (text, record, index) =>
                                `${index + 1}`,
                            },
                            {
                              title: "สถานะแบบร่าง",
                              dataIndex: "status",
                              key: "status",
                              render: (_, record) => <Tag color={
                                record.status == 'approve' ?
                                  "green" :
                                  record.status == 'reject' ?
                                    "red" :
                                    "blue"
                              }>{record.status}</Tag>
                            },
                            {
                              title: "วันที่ร่าง",
                              key: "createDate",
                              render: (_, record) => `${dayjs(record.createDate).format('YYYY-MM-DD HH:mm')}`
                            },
                            {
                              title: "แบบร่าง",
                              dataIndex: "action",
                              key: "action",
                              render: (text, record, index) => (
                                <Button
                                  type="link"
                                  onClick={() => handleViewPost(job, index)}
                                >
                                  view
                                </Button>
                              ),
                            },
                          ]}
                          dataSource={job?.jobPost}
                          pagination={false}
                          style={{ color: "#fff", overflowX: 'scroll' }}

                        />
                      </Card>
                    </List.Item>
                  )}
                />
              </TabPane>

              {/* Tab 4: Completed Jobs */}
              <TabPane tab="งานที่เสร็จสิ้น" key="4">
                <List
                  grid={{ gutter: 16, column: 1 }}
                  dataSource={jobEnrolls?.completeJob}
                  renderItem={(job) => (
                    <List.Item>
                      <Card
                        title={`${job?.jobTitle}`}
                        extra={<IoCheckmarkCircleSharp size={32} color="green" />}
                      >
                        <Row gutter={[20, 20]}>
                          <Col span={16}>
                            <Paragraph style={{ color: "#fff" }}>{job?.jobDescription}</Paragraph>
                            <Paragraph style={{ color: "#fff" }}>
                              <strong>ประเภทของงาน : </strong><Tag> {job?.tag}</Tag>
                            </Paragraph>
                            <Paragraph>
                              <strong>รายได้ : </strong> {job?.paymentPerInfluencer}
                            </Paragraph>
                          </Col>
                          <Col span={8}>
                            <Image src={job?.files[0]} width={'100%'} preview={false} />
                          </Col>
                        </Row>
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
            isView ? `view draft` : `ส่งแบบร่าง ${currentJob?.jobTitle}`
          }
          open={isModalVisible}
          onCancel={() => {
            setIsModalVisible(false);
            setIsView(false)
            form.resetFields()
            setFileList([])
            setVideoFileList([])
          }}
          footer={null}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={(values) => handleSubmit(values, currentJob)}
            initialValues={{}}
          >
            {/* Job Details */}
            <Form.Item
              name="content"
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

            {/* File Upload */}
            <Form.Item
              name="image"
              label="อัปโหลดรูปภาพ"
              valuePropName="fileList"
            >
              <DraggerUpload disabled={isView} fileList={fileList} setFileList={setFileList} form={form} multiple={true} maxCount={5} name={"image"} beforeUpload={
                (file) => {
                  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
                  if (!isJpgOrPng) {
                    message.error('You can only upload JPG/PNG file!');
                    return Upload.LIST_IGNORE
                  }

                  return isJpgOrPng
                }
              } />
            </Form.Item>

            <Form.Item
              name="video"
              label="อัปโหลดวิดิโอ"
              valuePropName="fileList"

            >
              <DraggerUpload disabled={isView} fileList={videoFileList} setFileList={setVideoFileList} form={form} multiple={true} maxCount={5} name={"video"} beforeUpload={
                (file) => {
                  const isVideo = file.type === 'video/mp4'
                  if (!isVideo) {
                    message.error('You can only upload Video file!');
                    return Upload.LIST_IGNORE
                  }
                  return isVideo
                }
              } />
            </Form.Item>
            {/* Reason Reject */}
            {
              isView && <Form.Item
                name="reasonReject"
                label="เหตุผลที่ปฏิเสธ"
              >
                <TextArea
                  disabled={isView}
                  rows={4}
                  placeholder="-"
                />
              </Form.Item>
            }

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

        <Modal title={
          isView ? `view Post` : `ส่งตรวจ Post : ${currentJob?.jobTitle}`
        }
          open={isModalPostVisible}
          onCancel={() => {
            setIsModalPostVisible(false);
            setIsView(false)
            formPost.resetFields()
            setImagePostFileList([])
            setLink(null)
          }}
          footer={null}>
          <Form form={formPost}
            layout="vertical"
            onFinish={(values) => handleSubmitPost(values, currentJob)}
            initialValues={{}}>
            <Form.Item name="postLink"
              label="ลิงต์ของโพสต์">

              <Input disabled={isView} placeholder="แปะลิงค์ของโพสต์" suffix={isView && <a href={link} target="_blank">ไปที่ลิงค์</a>} />
            </Form.Item>
            <Form.Item
              name="image"
              label="อัปโหลดรูปภาพ"
              valuePropName="fileList"
            >
              <DraggerUpload disabled={isView} fileList={imagePostFileList} setFileList={setImagePostFileList} form={formPost} multiple={true} maxCount={5} name={"image"} beforeUpload={
                (file) => {
                  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
                  if (!isJpgOrPng) {
                    message.error('You can only upload JPG/PNG file!');
                    return Upload.LIST_IGNORE
                  }

                  return isJpgOrPng
                }
              } />
            </Form.Item>
            {
              isView && <Form.Item
                name="reasonReject"
                label="เหตุผลที่ปฏิเสธ"
              >
                <TextArea
                  disabled={isView}
                  rows={4}
                  placeholder="-"
                />
              </Form.Item>
            }

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
    </ConfigProvider >
  );
};

export default WorkSpacePage;
