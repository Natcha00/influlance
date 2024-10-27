import React, { useEffect, useState } from "react";
import {
  Avatar,
  Row,
  Col,
  Divider,
  Typography,
  Image,
} from "antd";
import {
  FacebookOutlined,
  InstagramOutlined,
  TwitterOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import CrownImg from "/crown.png";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import { useMeQuery } from "../../../api/marketer/authApi";

const MarketerProfilePage = () => {
  const screen = useBreakpoint();
  const { data: me, isLoading: isLoadingMe } = useMeQuery(null)

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
              src={me?.brandPicture}
              style={{ marginBottom: "20px", width: "100%", height: "auto", }}
            />
          </div>
          {/* <div
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
          </div> */}
        </Col>
        {/* Left Section: Profile Info */}
        <Col xs={24} md={12}>
          <Row>
            <Col xs={24} md={12}>
              <Typography.Title level={1}>{me?.brand}</Typography.Title>
              {/* Social Media Links */}
              <div>
                <Row>
                  <Col span={24}>
                    <FacebookOutlined />
                    Facebook
                    {/* <Typography.Text>
                      {"Follower : " + me?.facebookFollower}
                    </Typography.Text> */}
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
                    Instagram
                    {/* <Typography.Text>
                      {"Follower : " + me?.instagramFollower}
                    </Typography.Text> */}
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
                    X
                    {/* <Typography.Text>
                      {"Follower : " + me?.xFollower}
                    </Typography.Text> */}
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
                    Tiktok
                    {/* <Typography.Text>
                      {"Follower : " + me?.tiktokFollower}
                    </Typography.Text> */}
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
            {/* <Col xs={0} md={12}>
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
            </Col> */}
          </Row>
        </Col>
      </Row >
    </>
  );
};

export default MarketerProfilePage;
