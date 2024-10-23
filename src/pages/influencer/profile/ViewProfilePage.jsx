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
import { useAddPortfolioMutation, useMeQuery, usePortfolioQuery, useViewPortfolioQuery, useViewProfileQuery } from "../../../api/influencer/authApi";
import { useParams } from "react-router-dom";

const ViewProfilePage = () => {
  const screen = useBreakpoint();
  const { influId } = useParams()

  const { data: profile, isLoading: isLoadingProfile } = useViewProfileQuery(influId)
  const { data: portfolios, isLoading: isLoadingPortfolio, refetch: refetchPortfolio } = useViewPortfolioQuery(influId)
  const [portfolioItems, setPortfolioItems] = useState([]);

  useEffect(() => {
    setPortfolioItems(portfolios)
  }, [portfolios])

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
              src={profile?.profilePicture}
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
              <Typography.Title level={1}>{profile?.firstName} {profile?.lastName}</Typography.Title>
              {/* Social Media Links */}
              <div>
                <Row>
                  <Typography.Text>
                    <FacebookOutlined /> {profile?.facebook}
                  </Typography.Text>
                </Row>
                <Row>
                  <Typography.Text>
                    {"Follower : " + profile?.facebookFollower}
                  </Typography.Text>
                </Row>
                <Row>
                  <Typography.Paragraph>
                    <InstagramOutlined /> {profile?.instagram}
                  </Typography.Paragraph>
                </Row>
                <Row>
                  <Typography.Text>
                    {"Follower : " + profile?.instagramFollower}
                  </Typography.Text>
                </Row>
                <Row>
                  <Typography.Paragraph>
                    <TwitterOutlined /> {profile?.x}
                  </Typography.Paragraph>
                </Row>
                <Row>
                  <Typography.Text>
                    {"Follower : " + profile?.xFollower}
                  </Typography.Text>
                </Row>
                <Row>
                  <Typography.Paragraph>
                    <VideoCameraOutlined /> {profile?.tiktok}
                  </Typography.Paragraph>
                </Row>
                <Row>
                  <Typography.Text>
                    {"Follower : " + profile?.tiktokFollower}
                  </Typography.Text>
                </Row>
                <Divider />
                <Typography.Text>
                  {profile?.yourInfo}
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
    </>
  );
};

export default ViewProfilePage;
