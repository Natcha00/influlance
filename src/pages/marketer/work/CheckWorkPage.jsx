import React, { useEffect, useState } from "react";
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
  Image,
  Form,
  message,
  Badge,
  Descriptions,
  List,
} from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "antd/es/form/Form";
import { useApproveDraftMutation, useApprovePostMutation, useCheckDraftQuery, useCheckPostQuery, useRejectDraftMutation, useRejectPostMutation } from "../../../api/marketer/jobApi";
import { SearchOutlined, CloseCircleOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import { useApprovePaycreditMutation } from "../../../api/marketer/financeApi";
import { supabase } from "../../../shared/supabase";

const { Content } = Layout;
const { Paragraph } = Typography;

const CheckWorkPage = () => {
  const navigate = useNavigate();
  const location = useLocation()
  const [form] = useForm()
  const [formPost] = useForm()
  const { jobId, jobTitle } = location?.state
  // State to manage rejection reason modal
  const [visible, setVisible] = useState(false);
  const [visiblePost, setVisiblePost] = useState(false);
  const [currentSubmission, setCurrentSubmission] = useState(null);
  const [currentSubmissionPost, setCurrentSubmissionPost] = useState(null);
  const { data: jobDraft, isLoading: isLoadingJobDraft, refetch: refetchChechDraft } = useCheckDraftQuery(jobId)
  const [approveDraft, { isLoading: isLoadingApproveDraft }] = useApproveDraftMutation()
  const [rejectDraft, { isLoading: isLoadingRejectDraft }] = useRejectDraftMutation()

  const { data: jobPost, isLoading: isLoadingJobPost, refetch: refetchChechPost } = useCheckPostQuery(jobId)
  const [approvePost, { isLoading: isLoadingApprovePost }] = useApprovePostMutation()
  const [rejectPost, { isLoading: isLoadingRejectPost }] = useRejectPostMutation()

  const [approvePayCredit, { isLoading: isLoadingApprovePayCredit }] = useApprovePaycreditMutation()

  // Client setup


  supabase
    .channel('jobDraft_checkWork')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: "jobDraft",
        filter: `jobId=eq.${jobId}`
      },
      (payload) => {
        refetchChechDraft(jobId)
      }
    )
    .subscribe()



  supabase
    .channel('jobPost_checkWork')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: "jobPost",
        filter: `jobId=eq.${jobId}`
      },
      (payload) => {
        refetchChechPost(jobId)
      }
    )
    .subscribe()

  useEffect(() => {
    refetchChechDraft(jobId)
    refetchChechPost(jobId)
  }, [jobId])

  const showConfirmApproveDraft = (jobDraft) => {
    Modal.confirm({
      title: 'อนุมัติแบบร่างนี้ หรือไม่?',
      icon: <ExclamationCircleFilled />,
      content: '',
      async onOk() {
        const resp = await approveDraft({ jobDraftId: jobDraft?.jobDraftId }).unwrap()

        if (resp) {
          message.success("อนุมัติแบบร่างนี้สำเร็จ")
          refetchChechDraft()
        }
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const handleSubmitRejectDraft = async (values) => {
    const resp = await rejectDraft({ jobDraftId: currentSubmission.jobDraftId, reasonReject: values.reasonReject }).unwrap()
    if (resp) {
      setCurrentSubmission(null)
      setVisible(false)
      refetchChechDraft()
      message.success("ปฏิเสธแบบร่างนี้ สำเร็จ")
    }
  }

  const showConfirmApprovePost = (jobPost) => {
    console.log('jobPost', jobPost)
    Modal.confirm({
      title: 'อนุมัติโพสต์นี้ หรือไม่?',
      icon: <ExclamationCircleFilled />,
      content: '',
      async onOk() {
        const resp = await approvePost({ jobPostId: jobPost?.jobPostId }).unwrap()

        if (resp) {
          const respApprovePayCredit = await approvePayCredit({
            jobId: jobPost?.jobId,
            referenceJobEnrollId: jobPost?.jobEnrollId,
            influId: jobPost?.influId
          }).unwrap()
          if (respApprovePayCredit) {
            message.success("อนุมัติโพสต์นี้สำเร็จ")
            refetchChechPost()
          }
        }
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const handleSubmitRejectPost = async (values) => {
    const resp = await rejectPost({ jobPostId: currentSubmissionPost.jobPostId, reasonReject: values.reasonReject }).unwrap()
    if (resp) {
      setCurrentSubmissionPost(null)
      setVisiblePost(false)
      refetchChechPost()
      message.success("ปฏิเสธโพสต์นี้ สำเร็จ")
    }
  }
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
        },
      }}
    >
      <Row justify={'start'} style={{ marginBottom: "20px" }}>
        <Col>
          <Typography.Title level={2}>ตรวจงาน : {jobTitle}</Typography.Title>
        </Col>
      </Row>

      <Divider style={{ borderColor: "#4a4a4a" }} />

      {/* Tabs for reviewing work */}

      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab={<Badge count={jobDraft?.length} offset={[10, -5]}>
          ตรววจงาน Draft
        </Badge>} key="1">
          <List
            grid={{ gutter: 16, column: 1 }}
            dataSource={jobDraft}
            renderItem={
              (submission, index) => (
                <List.Item>
                  <Row key={index} gutter={[16, 16]} style={{ marginBottom: '30px' }}>
                    <Col span={24}>
                      <Card
                        title={`ผู้สมัคร : ${submission?.influencer?.firstName} ${submission?.influencer?.lastName}`}
                        extra={
                          <Link to={`/marketer/view-influ-profile/${submission?.influencer?.influId}`} target="_blank" rel="noopener noreferrer" >
                            โปรไฟล์
                          </Link>
                        }

                        actions={[
                          <Button type="link" danger onClick={() => {
                            setVisible(true)
                            setCurrentSubmission(submission)
                          }}>
                            ไม่อนุมัติ
                          </Button>
                          ,
                          <Button type="primary" onClick={() => showConfirmApproveDraft(submission)}>
                            อนุมัติ
                          </Button>
                        ]}
                      >
                        <Descriptions  bordered items={[
                          {
                            key: '1',
                            label: 'เนื้อหา',
                            children: <Paragraph>{submission?.content}</Paragraph>,
                            span: 24
                          },
                          {
                            key: '2',
                            label: 'รูปภาพ',
                            children: <Row gutter={[12, 12]} >
                              {
                                submission?.pictureURL?.map((el, i) => <Col span={4} key={i}>
                                  <Image src={el} width={'100%'} />
                                </Col>
                                )}
                            </Row>,
                            span: 24
                          },
                          {
                            key: '3',
                            label: 'วิดิโอ',
                            children: <Row gutter={[12, 12]} >
                              {
                                submission?.videoURL?.map((el, i) => <Col span={4} key={i}>
                                  <video key={i} controls style={{ width: "100%" }}>
                                    <source src={el} type="video/mp4" />
                                    เบราว์เซอร์ของคุณไม่รองรับแท็กวิดีโอ
                                  </video>
                                </Col>
                                )}
                            </Row>,
                            span: 24
                          },
                        ]} />
                      </Card>

                    </Col>
                  </Row>
                </List.Item>
              )
            }
          />
        </Tabs.TabPane>
        <Tabs.TabPane tab={<Badge count={jobPost?.length} offset={[10, -5]}>
          ตรววจงาน Post จริง
        </Badge>} key="2">

          <List
            grid={{ gutter: 16, column: 1 }}
            dataSource={jobPost}
            renderItem={
              (submission, index) => (
                <Row gutter={[16, 16]}>
                  <Col span={24} key={index}>
                    <Card
                      title={`ผู้สมัคร : ${submission?.influencer?.firstName} ${submission?.influencer?.lastName}`}
                      extra={
                        <Link to={`/marketer/view-influ-profile/${submission?.influencer?.influId}`} target="_blank" rel="noopener noreferrer" >
                          โปรไฟล์
                        </Link>
                      }
                      actions={[
                        <Button type="link" danger onClick={() => {
                          setVisiblePost(true)
                          setCurrentSubmissionPost(submission)
                        }}>
                          ไม่อนุมัติ
                        </Button>
                        ,
                        <Button type="primary" onClick={() => showConfirmApprovePost(submission)}>
                          อนุมัติ
                        </Button>
                      ]}
                    >
                      <Descriptions bordered items={[
                        {
                          key: '1',
                          label: 'ลิงค์งาน',
                          children: <a href={submission?.postLink} target="_blank" rel="noopener noreferrer">
                            {submission?.postLink}
                          </a>,
                          span: 24
                        },
                        {
                          key: '2',
                          label: 'รูปภาพ',
                          children: <Row gutter={[12, 12]} >
                            {
                              submission?.pictureURL?.map((el, i) => <Col span={4} key={i}>
                                <Image src={el} width={'100%'} />
                              </Col>
                              )}
                          </Row>,
                          span: 24
                        },
                      ]} />
                    </Card>
                  </Col>
                </Row>
              )
            }
          />
        </Tabs.TabPane>
      </Tabs>

      {/* Rejection reason modal */}
      <Modal
        title="เหตุผลในการปฏิเสธแบบร่าง"
        open={visible}
        onOk={() => {
          form.submit()

        }}
        onCancel={() => {
          form.resetFields()
          setCurrentSubmission(null)
          setVisible(false)
        }}
        okText="ยืนยัน"
        cancelText="ยกเลิก"
      >
        <Form layout='vertical' form={form} onFinish={handleSubmitRejectDraft}>
          <Form.Item name="reasonReject" label="เหตุผลที่ปฏิเสธ :" rules={[
            { required: true, message: "กรุณาระบุเหตุผลที่ปฏิเสธ" },
          ]}>
            <Input
              placeholder="กรุณาใส่เหตุผล"
            />
          </Form.Item>
        </Form>
      </Modal>


      <Modal
        title="เหตุผลในการปฏิเสธโพสต์"
        open={visiblePost}
        onOk={() => {
          formPost.submit()

        }}
        onCancel={() => {
          formPost.resetFields()
          setCurrentSubmissionPost(null)
          setVisiblePost(false)
        }}
        okText="ยืนยัน"
        cancelText="ยกเลิก"
      >
        <Form layout='vertical' form={formPost} onFinish={handleSubmitRejectPost}>
          <Form.Item name="reasonReject" label="เหตุผลที่ปฏิเสธ :" rules={[
            { required: true, message: "กรุณาระบุเหตุผลที่ปฏิเสธ" },
          ]}>
            <Input
              placeholder="กรุณาใส่เหตุผล"
            />
          </Form.Item>
        </Form>
      </Modal>
    </ConfigProvider>
  );
};

export default CheckWorkPage;
