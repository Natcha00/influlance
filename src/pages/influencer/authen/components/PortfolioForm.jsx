import React, { useState } from 'react';
import { Form, Input, Button, Upload, message, Row, Col, List, Card, Modal } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import DraggerUpload from '../../../../components/DraggerUpload';


const PortfolioForm = ({ onAdd, visible, onClose }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  // Handle file upload for multiple images
  const handleUpload = ({ file, fileList }) => {
    setFileList(fileList); // Save multiple images to the state
    if (file.status === 'done') {
      message.success(`${file.name} uploaded successfully.`);
    } else if (file.status === 'error') {
      message.error(`${file.name} upload failed.`);
    }
  };

  const handleSubmit = (values) => {
    onAdd({
      ...values,
      images: values.files.map((file) => ({
        url: file.url || file.thumbUrl, // Handle both uploaded and locally selected images
        name: file.name,
      })),
    });
    form.resetFields(); // Reset form after submission
    setFileList([]); // Clear file list after submission
    onClose(); // Close modal after submission
    message.success('Draft submitted successfully!');
  };

  return (
    <Modal
      title="ผลงาน"
      visible={visible}
      onCancel={onClose}
      footer={null}  // No footer buttons, form submission is handled in the form
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        {/* Draft Title */}
        <Form.Item
          name="title"
          label="หัวข้อ"
          rules={[{ required: true, message: 'Please enter the title of your draft' }]}
        >
          <Input placeholder="Enter the title" />
        </Form.Item>

        {/* Draft Description */}
        <Form.Item
          name="description"
          label="อธิบาย"
          rules={[{ required: true, message: 'Please enter the description of your draft' }]}
        >
          <Input.TextArea rows={4} placeholder="Enter a short description of your draft" />
        </Form.Item>

        {/* Upload Multiple Files */}
        <Form.Item
          name="files"
          label="อัพโหลดรูปภาพ"
          valuePropName='fileList'
        >
          <DraggerUpload fileList={fileList} setFileList={setFileList} form={form} multiple={true} maxCount={5} name={"files"} />
        </Form.Item>

        {/* Submit Button */}
        <Form.Item>
          <Button type="primary" htmlType="submit">
            ยืนยัน
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default PortfolioForm;