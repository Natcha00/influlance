import React, { useState } from 'react';
import { Form, Input, Button, Upload, message, Row, Col, List, Card, Modal, Typography } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import PortfolioForm from './components/PortfolioForm';

// Main Portfolio Page
const AddYourPortfolioPage = () => {
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [count, setCount] = useState(0); // State for counting items
  const [visible, setIsModalVisible] = useState(false);

  // Add new portfolio item
  const onAdd = (newItem) => {
    const newPortfolioItem = {
      ...newItem,
      title: `${newItem.title} (Item ${count + 1})`, // Add the count to the title
    };
    setPortfolioItems([...portfolioItems, newPortfolioItem]); // Add new item to the state
    setCount(count + 1); // Increment the count for the next item
  };

  // Modal controls
  const showModal = () => setIsModalVisible(true);
  const onClose = () => setIsModalVisible(false);

  return (
    <div style={{ padding: '40px', minHeight: '100vh' }}>
      <Typography.Title level={1} style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '20px'}}>
        Portfolio
      </Typography.Title>

      {/* Button to trigger the popup */}
      <Row justify="center" style={{ marginBottom: '20px' }}>
        <Col>
          <Button type="primary" onClick={showModal}>
            Submit Draft
          </Button>
        </Col>
      </Row>

      {/* Form Popup Modal */}
      <PortfolioForm
        visible={visible}
        onAdd={onAdd}
        onClose={onClose}
      />

      {/* List of Portfolio Items */}
      <Row justify="center" style={{ marginTop: '40px' }}>
        <Col span={12}>
          <Typography.Title level={2} >Portfolio List</Typography.Title>
          <List
            grid={{ gutter: 16, column: 1 }}
            dataSource={portfolioItems}
            renderItem={item => (
              <List.Item>
                <Card title={item.title}>
                  <p>{item.description}</p>
                  {item.images && (
                    <div>
                      {item.images.map((image, index) => (
                        <img
                          key={index}
                          src={image.url}
                          alt={image.name}
                          style={{ width: '100%', marginBottom: '10px' }}
                        />
                      ))}
                    </div>
                  )}
                  {item.link && (
                    <p><a href={item.link} target="_blank" rel="noopener noreferrer">View Project</a></p>
                  )}
                </Card>
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </div>
  );
};

export default AddYourPortfolioPage;
