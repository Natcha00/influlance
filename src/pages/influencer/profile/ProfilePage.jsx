import React, { useState } from "react";
import {
  Avatar,
  Button,
  Card,
  Row,
  Col,
  Collapse,
  theme,
  Divider,
  Typography,
  Image,
  Tag,
  Space,
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

const ProfilePage = () => {
  const onChange = (key) => {
    console.log(key);
  };
  const screen = useBreakpoint();
  const [portfolioItems, setPortfolioItems] = useState([
    {
      title: "This is panel header 1",
      description: `A dog is a type of domesticated animal.
            Known for its loyalty and faithfulness,
            it can be found as a welcome guest in many households across the world.`,
      firstImage:
        "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
      images: [
        {
          url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
        },
        {
          url: "https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg",
        },
        {
          url: "https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg",
        },
      ],
    },
    {
      title: "This is panel header 1",
      description: `A dog is a type of domesticated animal.
            Known for its loyalty and faithfulness,
            it can be found as a welcome guest in many households across the world.`,
      firstImage:
        "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
      images: [
        {
          url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
        },
        {
          url: "https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg",
        },
      ],
    },
  ]);
  const [count, setCount] = useState(0); // State for counting items
  const [visible, setIsModalVisible] = useState(false);

  // Add new portfolio item
  const onAdd = (newItem) => {
    const newPortfolioItem = {
      ...newItem,
      title: `${newItem.title} (Item ${count + 1})`, // Add the count to the title,
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
      if (i == index) {
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
      {/* <Typography.Title level={2}>ผลงาน</Typography.Title> */}
      <Row style={{ marginBottom: "1rem" }} justify={"end"}>
        <Button type="primary" onClick={() => showModal()}>
          เพิ่มผลงาน
        </Button>
      </Row>

      {portfolioItems.map((portfoilio, index) => (
        <>
          <Row gutter={16} key={index}>
            <Col xs={24} md={12}>
              <Row justify={"start"}>
                <Col xs={24} md={20}>
                  <Image
                    preview={false}
                    width={"100%"}
                    height={"100%"}
                    src={portfoilio.firstImage}
                  />
                </Col>
              </Row>

              <Row>
                {portfoilio.images.map((img, i) => {
                  return (
                    <Col span={6} style={{ cursor: "pointer" }}>
                      <Image
                        preview={false}
                        src={img.url}
                        onClick={() => handleChangeShowImage(index, img.url)}
                      />
                    </Col>
                  );
                })}
              </Row>
            </Col>
            <Col xs={24} md={12}>
              <Collapse
                style={{ minWidth: "100%" }}
                items={[
                  {
                    key: "0",
                    label: portfoilio.title,
                    children: (
                      <div style={{ minHeight: "100%", minWidth: "100%" }}>
                        {portfoilio.description}
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
        </>
      ))}

      {/* <Row gutter={16} style={{ 'marginBlock': '0.5rem' }}>
                <Col span={16}>
                    <div style={{ 'minHeight': "300px", 'width': "100%", "height": "100%", background: "grey" }}></div>
                </Col>
                <Col span={8}>
                    <Collapse
                        style={{
                            background: token.colorBgContainer,
                        }}
                        items={items}
                        defaultActiveKey={['1']}
                        onChange={onChange} />
                </Col>
            </Row>
            <Divider />
            <Row gutter={16} style={{ 'marginBlock': '0.5rem' }}>
                <Col span={16}>
                    <div style={{ 'minHeight': "300px", 'width': "100%", "height": "100%", background: "grey" }}></div>
                </Col>
                <Col span={8}>
                    <Collapse
                        style={{
                            background: token.colorBgContainer,
                        }}
                        items={items}
                        defaultActiveKey={['1']}
                        onChange={onChange} />
                </Col>
            </Row> */}

      <PortfolioForm visible={visible} onAdd={onAdd} onClose={onClose} />
    </>
  );
};

export default ProfilePage;
