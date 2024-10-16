import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Select,
  Typography,
  Row,
  Col,
  DatePicker,
  InputNumber,
  Divider,
  Upload,
  message
} from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { Title } = Typography;

const CreateWorkPage = () => {
  const [form] = Form.useForm();
  const [isPosted, setIsPosted] = useState(false);
  const [postDetails, setPostDetails] = useState({});
  const [totalPayment, setTotalPayment] = useState(0);
  const [paymentPerInfluencer, setPaymentPerInfluencer] = useState(0);

  // Function to handle form submission
  const onFinish = (values) => {
    console.log("Received values:", values);
    setPostDetails(values); // Store the post details
    setIsPosted(true); // Set the post status to true
    form.resetFields(); // Reset the form after submission
  };

  // Function to handle total payment input
  const handleTotalPaymentChange = (value) => {
    setTotalPayment(value);
    const influencerCount = form.getFieldValue("influencerCount") || 1; // Default to 1 to avoid division by zero
    setPaymentPerInfluencer(value / influencerCount);
    form.setFieldsValue({ paymentPerInfluencer: value / influencerCount });
  };

  // Function to handle influencer count change
  const handleInfluencerCountChange = (value) => {
    const updatedPayment = totalPayment / value;
    setPaymentPerInfluencer(updatedPayment);
    form.setFieldsValue({ paymentPerInfluencer: updatedPayment });
  };

  const uploadProps = {
    beforeUpload: (file) => {
      const isImageOrVideo =
        file.type.startsWith("image/") || file.type.startsWith("video/");
      if (!isImageOrVideo) {
        message.error("กรุณาอัปโหลดไฟล์ภาพหรือวิดีโอเท่านั้น!");
      }
      return isImageOrVideo;
    },
    onChange(info) {
      if (info.file.status === "done") {
        message.success(`${info.file.name} uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} upload failed.`);
      }
    },
  };

  return (
    <Row justify="center">
      <Col span={18}>
        <Title level={2}>สร้างโพสต์ประกาศหา Influencer</Title>
        <Divider />

        {isPosted ? (
          // Display confirmation details
          <div
            style={{
              padding: "20px",
              border: "1px solid #d9d9d9",
              borderRadius: "5px",
            }}
          >
            <Title level={4}>โพสต์งานถูกสร้างเรียบร้อยแล้ว!</Title>
            <Divider />
            <p>
              <strong>:</strong> {postDetails.creatorName}
            </p>ชื่อผู้สร้าง
            <p>
              <strong>หัวข้องาน:</strong> {postDetails.jobTitle}
            </p>
            <p>
              <strong>ประเภทของงาน:</strong> {postDetails.tags.join(", ")}
            </p>
            <p>
              <strong>รายละเอียดงาน:</strong> {postDetails.jobDescription}
            </p>
            <p>
              <strong>จำนวนผู้ติดตามของ Influencer:</strong> {postDetails.rank}
            </p>
            <p>
              <strong>เงินค่าจ้างรวม:</strong> {postDetails.totalPayment} บาท
            </p>
            <p>
              <strong>จำนวน Influencer ที่ต้องการ:</strong> {postDetails.influencerCount}
            </p>
            <p>
              <strong>เงินค่าจ้างต่อ Influencer:</strong> {postDetails.paymentPerInfluencer} บาท
            </p>
            <p>
              <strong>วันที่ Influencer sต้องลงงาน:</strong>{" "}
              {postDetails.dueDate ? postDetails.dueDate.format("YYYY-MM-DD") : "ไม่ระบุ"}
            </p>
            <Divider />
            <Button type="primary" onClick={() => setIsPosted(false)}>
              สร้างโพสต์ใหม่
            </Button>
          </div>
        ) : (
          // Display the form for creating a job post
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            style={{ maxWidth: 600 }}
          >
            <Form.Item
              label="ชื่อผู้สร้าง"
              name="creatorName"
              rules={[{ required: true, message: "กรุณาใส่ชื่อผู้สร้าง" }]}
            >
              <Input placeholder="ชื่อผู้สร้าง" />
            </Form.Item>

            <Form.Item
              label="หัวข้องาน"
              name="jobTitle"
              rules={[{ required: true, message: "กรุณาใส่หัวข้องาน" }]}
            >
              <Input placeholder="หัวข้องาน" />
            </Form.Item>

            <Form.Item
              label="ประเภทของงาน"
              name="tags"
              rules={[{ required: true, message: "กรุณาเลือกประเภทของงาน" }]}
            >
              <Select
                mode="tags"
                placeholder="เลือกประเภทของงาน"
                allowClear
                style={{ width: "100%" }}
              >
                <Select.Option value="marketing">การตลาด</Select.Option>
                <Select.Option value="design">การออกแบบ</Select.Option>
                <Select.Option value="photography">การถ่ายภาพ</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="รายละเอียดงาน"
              name="jobDescription"
              rules={[{ required: true, message: "กรุณาใส่รายละเอียดงาน" }]}
            >
              <Input.TextArea rows={4} placeholder="รายละเอียดงาน" />
            </Form.Item>

            <Form.Item
              label="จำนวนผู้ติดตามของ Influencer"
              name="rank"
              rules={[{ required: true, message: "กรุณาใส่จำนวนผู้ติดตาม" }]}
            >
              <InputNumber placeholder="จำนวนผู้ติดตาม" min={0} style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item
              label="เงินค่าจ้างรวม"
              name="totalPayment"
              rules={[{ required: true, message: "กรุณาใส่เงินค่าจ้างรวม" }]}
            >
              <InputNumber
                placeholder="เงินค่าจ้างรวม"
                min={0}
                onChange={handleTotalPaymentChange}
                style={{ width: "100%" }}
              />
            </Form.Item>

            <Form.Item
              label="จำนวนของ Influencer ที่ต้องการ"
              name="influencerCount"
              rules={[{ required: true, message: "กรุณาใส่จำนวน Influencer" }]}
            >
              <InputNumber
                placeholder="จำนวน Influencer"
                min={1}
                onChange={handleInfluencerCountChange}
                style={{ width: "100%" }}
              />
            </Form.Item>

            <Form.Item
              label="เงินค่าจ้างต่อ Influencer"
              name="paymentPerInfluencer"
              rules={[{ required: true, message: "กรุณาใส่เงินค่าจ้างต่อ Influencer" }]}
            >
              <InputNumber
                value={paymentPerInfluencer}
                placeholder="เงินค่าจ้างต่อ Influencer"
                min={0}
                style={{ width: "100%" }}
                disabled
              />
            </Form.Item>

            <Form.Item label="วันที่ Influencer ต้องลงงาน" name="dueDate">
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item label="อัปโหลดภาพหรือวิดีโอ">
              <Upload {...uploadProps}>
                <Button icon={<UploadOutlined />}>เลือกไฟล์</Button>
              </Upload>
            </Form.Item>

            <Divider />

            <Form.Item>
              <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
                ยืนยันการสร้างโพสต์งาน
              </Button>
            </Form.Item>
          </Form>
        )}
      </Col>
    </Row>
  );
};

export default CreateWorkPage;
