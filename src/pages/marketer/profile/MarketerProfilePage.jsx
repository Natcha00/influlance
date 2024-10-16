import React, { useState } from "react";
import {
  Avatar,
  Button,
  Card,
  Row,
  Col,
  Collapse,
  Divider,
  Typography,
  Image,
  Space,
  Modal,
} from "antd";
import {
  FacebookOutlined,
  InstagramOutlined,
  TwitterOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import PortfolioForm from "../authen/components/PortfolioForm";
import CrownImg from "/crown.png";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import CreateWorkPage from "../work/CreateWorkPage";

const MarketerProfilePage = () => {
  const onChange = (key) => {
    console.log(key);
  };
  const screen = useBreakpoint();
  const [portfolioItems, setPortfolioItems] = useState([
    // ... existing portfolio items
  ]);
  const [count, setCount] = useState(0); // State for counting items
  const [visible, setIsModalVisible] = useState(false);

  // Add new portfolio item
  const onAdd = (newItem) => {
    const newPortfolioItem = {
      ...newItem,
      title: `${newItem.title} (Item ${count + 1})`, // Add the count to the title
      firstImage: newItem.images[0]?.url,
    };
    setPortfolioItems([...portfolioItems, newPortfolioItem]); // Add new item to the state
    setCount(count + 1); // Increment the count for the next item
  };

  // Modal controls
  const showModal = () => setIsModalVisible(true);
  const onClose = () => setIsModalVisible(false);

  const handleChangeShowImage = (index, url) => {
    const newPortfolioItems = portfolioItems.map((port, i) => {
      if (i === index) {
        return {
          ...port,
          firstImage: url,
        };
      } else {
        return port;
      }
    });
    setPortfolioItems(newPortfolioItems);
  };

  return (
    <>
      <Row>
        {/* Right Section: Profile Card */}
        <Col xs={24} md={12}>
          <div
            style={{
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Avatar
              // size={300}
              src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              style={{ marginBottom: "20px", minWidth: "70%", height: "auto" }}
            />
            <div
              style={{
                position: "absolute",
                top: -60,
                right: -60,
                display: screen.xs ? "none" : undefined,
              }}
            >
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  src={CrownImg}
                  width={"40%"}
                  height={"40%"}
                  preview={false}
                />
                <Typography.Title
                  level={1}
                  style={{ position: "absolute", top: 70 }}
                >
                  Rank A
                </Typography.Title>
              </div>
            </div>
          </div>
          <div
            style={{
              position: "relative",
              display: screen.xs ? "flex" : "none",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              src={CrownImg}
              width={"40%"}
              height={"40%"}
              preview={false}
            />
            <Typography.Title
              level={1}
              style={{ position: "absolute", top: 40 }}
            >
              Rank A
            </Typography.Title>
          </div>
        </Col>
        {/* Left Section: Profile Info */}
        <Col xs={24} md={12}>
          <Space dir="row">
            <Typography.Title level={1}>Natcha</Typography.Title>
          </Space>

          {/* Social Media Links */}
          <div>
            <Typography.Text>
              <FacebookOutlined /> facebook.com/influencer
            </Typography.Text>
            <Typography.Paragraph>
              <InstagramOutlined /> instagram.com/influencer
            </Typography.Paragraph>
            <Typography.Paragraph>
              <TwitterOutlined /> x.com/influencer
            </Typography.Paragraph>
            <Typography.Paragraph>
              <VideoCameraOutlined /> tiktok.com/@influencer
            </Typography.Paragraph>
            <Divider />
            <Typography.Text>
              ความงาม | แฟชั่น | ท่องเที่ยว | รีวิว
            </Typography.Text>
          </div>
        </Col>
      </Row>


      {/* Pinned Works Section */}
      <Divider orientation="left" style={{ fontSize: "30px" }}>
        ผลงาน
      </Divider>
      <Row style={{ marginBottom: "1rem" }} justify={"end"}>
        <Button type="primary" onClick={showModal}>
          เพิ่มผลงาน
        </Button>
      </Row>

      {portfolioItems.map((portfolio, index) => (
        <Row gutter={16} key={index}>
          <Col xs={24} md={12}>
            <Row justify={"start"}>
              <Col xs={24} md={20}>
                <Image
                  preview={false}
                  width={"100%"}
                  height={"100%"}
                  src={portfolio.firstImage}
                />
              </Col>
            </Row>

            <Row>
              {portfolio.images.map((img, i) => (
                <Col span={6} key={i} style={{ cursor: "pointer" }}>
                  <Image
                    preview={false}
                    src={img.url}
                    onClick={() => handleChangeShowImage(index, img.url)}
                  />
                </Col>
              ))}
            </Row>
          </Col>
          <Col xs={24} md={12}>
            <Collapse
              style={{ minWidth: "100%" }}
              items={[
                {
                  key: "0",
                  label: portfolio.title,
                  children: (
                    <div style={{ minHeight: "100%", minWidth: "100%" }}>
                      {portfolio.description}
                    </div>
                  ),
                },
              ]}
              defaultActiveKey={["0"]}
              onChange={onChange}
            />
          </Col>
          <Divider />
        </Row>
      ))}

      {/* Portfolio Form Modal */}
      <Modal
        title="เพิ่มผลงาน"
        visible={visible}
        onCancel={onClose}
        footer={null}
        width={800}
      >
        <CreateWorkPage onAdd={onAdd} onClose={onClose} />
      </Modal>

  
    </>
  );
};

export default MarketerProfilePage;
