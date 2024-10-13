import React, { useState } from 'react';
import { Form, Input, Upload, Button, Card, Row, Col, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

const { TextArea } = Input;

const WorkDraftPage = () => {
    const [fileList, setFileList] = useState([]);
    const [loading, setLoading] = useState(false);

    // Function to handle file upload
    const handleUploadChange = ({ fileList }) => {
        setFileList(fileList);
    };

    // Handle form submission
    const handleSubmit = (values) => {
        setLoading(true);
        console.log('Submitted values:', values);
        console.log('Uploaded files:', fileList);
        
        // Simulate API call or submit logic
        setTimeout(() => {
            setLoading(false);
            message.success('Work submitted successfully!');
        }, 1500);
    };

    return (
        <Row justify="center" style={{ minHeight: '100vh', padding: '40px' }}>
            <Col span={16}>
                <Card title="Submit Your Work" bordered={false}>
                    <Form layout="vertical" onFinish={handleSubmit}>
                        
                        {/* Job Details */}
                        <Form.Item
                            name="jobDetails"
                            label="Job Details"
                            rules={[{ required: true, message: 'Please provide job details' }]}
                        >
                            <TextArea rows={4} placeholder="Enter the details of the work you are submitting..." />
                        </Form.Item>

                        {/* Poster Name */}
                        <Form.Item
                            name="posterName"
                            label="Job Poster Name"
                            rules={[{ required: true, message: 'Please enter the name of the person who posted the job' }]}
                        >
                            <Input placeholder="Enter the name of the job poster..." />
                        </Form.Item>

                        {/* File Upload */}
                        <Form.Item
                            name="upload"
                            label="Upload Images/Videos"
                            rules={[{ required: true, message: 'Please upload your work files' }]}
                        >
                            <Upload.Dragger
                                name="files"
                                multiple
                                fileList={fileList}
                                onChange={handleUploadChange}
                                beforeUpload={() => false}  // Prevent automatic upload
                                accept="image/*,video/*"
                            >
                                <p className="ant-upload-drag-icon">
                                    <InboxOutlined />
                                </p>
                                <p className="ant-upload-text">Click or drag files to this area to upload</p>
                                <p className="ant-upload-hint">
                                    Support for a single or bulk upload. You can upload images or videos.
                                </p>
                            </Upload.Dragger>
                        </Form.Item>

                        {/* Submit Button */}
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={loading}
                                style={{
                                    background: 'linear-gradient(to right, #8E2DE2, #4A00E0)',
                                    color: '#fff',
                                }}
                            >
                                Submit Work
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </Col>
        </Row>
    );
};

export default WorkDraftPage;
