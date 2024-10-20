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
import DraggerUpload from "../../../../components/DraggerUpload";
import { useCategoriesQuery } from "../../../../api/influencer/jobApi";
import dayjs from "dayjs";
import { useAddPostJobMutation } from "../../../../api/marketer/jobApi";

const { Title } = Typography;

const CreateWork = () => {
  const [form] = Form.useForm();
  const { data: categories, isLoading: isLoadingCategories } = useCategoriesQuery(null)
  const [addPostJob, { isLoading }] = useAddPostJobMutation()
  const [fileList, setFileList] = useState([{
    uid: "-1",
    url: "https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg",
    thumbUrl: "https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg",
    status: "done"
  }])

  const [totalPayment, setTotalPayment] = useState(0);
  const [paymentPerInfluencer, setPaymentPerInfluencer] = useState(0);

  // Function to handle form submission
  const onFinish = async (values) => {
    try {
      console.log("Received values:", values);
      const resp = await addPostJob({
        ...values,
        files: values.files.map(f => f.url)
      })

      if (resp) {
        message.success("สร้างโพสต์งานสำเร็จ")
        form.resetFields(); // Reset the form after submission

      }
    } catch (error) {
      console.log('error', error)
      message.error("found issue")
    }

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
  }

  return (
    <Row justify="center">
      <Col span={24}>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          style={{ maxWidth: 600 }}
          initialValues={{
            jobTitle: "Home Organization Hacks: Declutter Your Space, Declutter Your Mind",
            jobDescription: "Transform your living space with simple, effective home organization hacks. Learn how to create a clutter-free environment that promotes relaxation, focus, and overall well-being.",
            tag: "lifestyle",
            follower: 2000,
            totalPayment: 20000,
            influencerCount: 10,
            paymentPerInfluencer: 2000,
            dueDate: dayjs(),
            files: [{
              uid: "-1",
              url: "https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg",
              thumbUrl: "https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg",
              status: "done"
            }]
          }}
        >
          <Form.Item
            label="หัวข้องาน"
            name="jobTitle"
            rules={[{ required: true, message: "กรุณาใส่หัวข้องาน" }]}
          >
            <Input placeholder="หัวข้องาน" />
          </Form.Item>

          <Form.Item
            label="ประเภทของงาน"
            name="tag"
            rules={[{ required: true, message: "กรุณาเลือกประเภทของงาน" }]}
          >
            <Select
              placeholder="เลือกประเภทของงาน"
              allowClear
              style={{ width: "100%" }}
              loading={isLoadingCategories}
              options={categories}
            />

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
            name="follower"
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
            <DatePicker style={{ width: "100%" }} placeholder="วันที่ Influencer ต้องลงงาน" />
          </Form.Item>

          <Form.Item label="อัปโหลดภาพ" name="files">
            <DraggerUpload fileList={fileList} setFileList={setFileList} form={form} name={"files"} multiple={false} maxCount={1} />
          </Form.Item>

          <Divider />

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              ยืนยันการสร้างประกาศ
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default CreateWork;
