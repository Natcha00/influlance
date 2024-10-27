import React, { useEffect, useState } from "react";
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
  message,
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
import { useAddPortfolioMutation, useMeQuery, usePortfolioQuery } from "../../../api/influencer/authApi";
import { useParams } from "react-router-dom";
import Link from "antd/es/typography/Link";

const ProfilePage = () => {
  const screen = useBreakpoint();
  const params = useParams()
  const { data: me, isLoading: isLoadingMe } = useMeQuery(null)
  const { data: portfolios, isLoading: isLoadingPortfolio, refetch: refetchPortfolio } = usePortfolioQuery(null)
  const [addPortfolio, { isLoading: isLoadingAddPortfolio }] = useAddPortfolioMutation()
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [visible, setIsModalVisible] = useState(false);

  useEffect(() => {
    setPortfolioItems(portfolios)
  }, [portfolios])

  // Add new portfolio item
  const onAdd = async (newItem) => {
    try {
      const newPortfolioItem = {
        ...newItem,
        title: `${newItem.title}`, // Add the count to the title,
        images: newItem.images.map(el => el.url)
      };

      const resp = await addPortfolio(newPortfolioItem).unwrap()

      if (resp) {
        message.success("เพิ่ม portfolio สำเร็จ")
        refetchPortfolio()
      }
    } catch (error) {
      console.log(error)
      message.error("Found issue")
    }

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
              src={me?.profilePicture}
              size={"100%"}
              style={{ marginBottom: "20px", minWidth: "70%", height: "auto" }}
            />
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
          <Row>
            <Col xs={24} md={12}>
              <Typography.Title level={1}>{me?.firstName} {me?.lastName}</Typography.Title>
              {/* Social Media Links */}
              <div>
                <Row>
                  <Col span={24}>
                    <FacebookOutlined />
                    <Typography.Text>
                      {"Follower : " + me?.facebookFollower}
                    </Typography.Text>
                  </Col>
                  <Col span={24}>
                    <Typography.Text>
                      <a href={me?.facebook} target="_blank">{me?.facebook}</a>
                    </Typography.Text>
                  </Col>
                </Row>

                <Row>
                  <Col span={24}>
                    <InstagramOutlined />
                    <Typography.Text>
                      {"Follower : " + me?.instagramFollower}
                    </Typography.Text>
                  </Col>
                  <Col span={24}>
                    <Typography.Text>
                      <a href={me?.instagram} target="_blank">{me?.instagram}</a>
                    </Typography.Text>
                  </Col>
                </Row>

                <Row>
                  <Col span={24}>
                    <TwitterOutlined />
                    <Typography.Text>
                      {"Follower : " + me?.xFollower}
                    </Typography.Text>
                  </Col>
                  <Col span={24}>
                    <Typography.Text>
                      <a href={me?.x} target="_blank">{me?.x}</a>
                    </Typography.Text>
                  </Col>
                </Row>


                <Row>
                  <Col span={24}>
                    <VideoCameraOutlined />
                    <Typography.Text>
                      {"Follower : " + me?.tiktokFollower}
                    </Typography.Text>
                  </Col>
                  <Col span={24}>
                    <Typography.Text>
                      <a href={me?.tiktok} target="_blank">{me?.tiktok}</a>
                    </Typography.Text>
                  </Col>
                </Row>

                <Divider />
                <Typography.Text>
                  {me?.yourInfo}
                </Typography.Text>
              </div>
            </Col>
            <Col xs={0} md={12}>
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
                  width={"60%"}
                  height={"60%"}
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
          </Row>
        </Col>
      </Row >

      {/* Pinned Works Section */}
      < Divider orientation="left" style={{ fontSize: "30px" }
      }>
        ผลงาน
      </Divider >
      {/* <Typography.Title level={2}>ผลงาน</Typography.Title> */}
      < Row style={{ marginBottom: "1rem" }} justify={"end"} >
        <Button type="primary" onClick={() => showModal()}>
          เพิ่มผลงาน
        </Button>
      </Row >

      {
        portfolioItems?.map((portfoilio, index) => (
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
                  {portfoilio?.images.map((img, i) => {
                    return (
                      <Col span={6} style={{ cursor: "pointer" }}>
                        <Image
                          preview={false}
                          src={img}
                          onClick={() => handleChangeShowImage(index, img)}
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
                />
              </Col>
              <Divider />
            </Row>
          </>
        ))
      }

      <PortfolioForm visible={visible} onAdd={onAdd} onClose={onClose} />
    </>
  );
};

export default ProfilePage;
