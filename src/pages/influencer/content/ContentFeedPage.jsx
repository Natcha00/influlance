import React, { useEffect, useState } from "react";
import {
  Input,
  Row,
  Col,
  List,
  Card,
  Select,
  Divider,
  Button,
  Tag,
  Space,
  Popconfirm,
  Modal,
  message,
  Image,
  Typography,
} from "antd";
import { SearchOutlined, CloseCircleOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import { useCancelEnrollMutation, useCategoriesQuery, useEnrollMutation, useJobsQuery } from '../../../api/influencer/jobApi'


const { Search } = Input;
const { Option } = Select;
const { Paragraph } = Typography


const ContentFeedPage = () => {
  const { data: jobs, isLoading: isLoadingJobs, refetch } = useJobsQuery(null)
  const { data: categories, isLoading: isLoadingCategories } = useCategoriesQuery(null)
  const [enroll, { isLoading: LoadingEnroll }] = useEnrollMutation()


  useEffect(() => {
    setFilteredPosts(jobs)
  }, [jobs])
  // State for filtered posts, selected tags, and selected tag
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  // Handle search
  const onSearch = (value) => {
    const filtered = jobs.filter(
      (post) =>
        (post.title.toLowerCase().includes(value.toLowerCase()) &&
          (selectedTags.length === 0 ||
            selectedTags.includes(post.tag))) ||
        post.brand.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredPosts(filtered);
  };

  // Handle adding/removing tags
  const addTag = (tag) => {
    if (!selectedTags.map(el => el.value).includes(tag.value)) {
      const newTags = [...selectedTags, tag];
      setSelectedTags(newTags);
      const filtered = jobs.filter((post) =>
        newTags.map(el => el.value).includes(post.tag)
      );
      setFilteredPosts(filtered);
    }
  };

  const removeTag = (tag) => {
    const newTags = selectedTags.filter((t) => t.value !== tag.value);
    setSelectedTags(newTags);
    if (newTags.length === 0) {
      setFilteredPosts(jobs);
    } else {
      const filtered = jobs.filter((post) =>
        newTags.map(el => el.value).includes(post.tag)
      );
      setFilteredPosts(filtered);
    }
  };


  const showConfirm = (post) => {
    Modal.confirm({
      title: 'ต้องการสมัครนี้ใช่หรือไม่?',
      icon: <ExclamationCircleFilled />,
      content: '',
      async onOk() {
        const resp = await enroll({
          jobId: post.jobId,
          marketerId: post.marketerId
        }).unwrap()

        if (resp) {
          message.success('สมัครงานเรียบร้อย')
          refetch()
        }
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  return (
    <div
      style={{
        padding: "20px",
        minHeight: "100vh",
        backgroundColor: "#1d1d1d",
      }}
    >
      <Row justify="center" style={{ marginBottom: "20px" }}>
        <Col span={18}>
          {/* Search Bar */}
          <Search
            placeholder="ค้นหา"
            allowClear
            size="large"
            //prefix={<SearchOutlined style={{ color: '#fff' }} />}
            onSearch={onSearch}
            style={{
              background: "linear-gradient(to right, #b624ff, #3e80ff)",
              borderRadius: "10px",
              padding: "5px",
              color: "white",
            }}
          />
        </Col>
      </Row>

      {/* Tag Filter */}
      <Row justify="center" style={{ marginBottom: "20px" }}>
        <Col span={18}>
          <Space size={[0, 8]} wrap>
            {selectedTags.map((tag) => (
              <Tag
                key={tag}
                closable
                onClose={() => removeTag(tag)}
                color="magenta"
                style={{
                  fontSize: "16px",
                  padding: "5px 10px",
                  borderRadius: "10px",
                }}
              >
                {tag.label} <CloseCircleOutlined />
              </Tag>
            ))}
          </Space>
        </Col>
      </Row>

      {/* tag Filter with clickable Tags */}
      <Row justify="center" style={{ marginBottom: "20px" }}>
        <Col span={18}>
          <Space size={[0, 8]} wrap>
            {categories?.map((tag) => (
              <Tag
                key={tag.value}
                onClick={() => addTag(tag)}
                color={selectedTags.map(el => el.value).includes(tag.value) ? "purple" : "default"}
                style={{
                  fontSize: "16px",
                  padding: "5px 10px",
                  borderRadius: "10px",
                  cursor: "pointer",
                }}
              >
                {tag.label}
              </Tag>
            ))}
          </Space>
        </Col>
      </Row>

      <Divider style={{ borderColor: "#4a4a4a" }} />

      {/* List of Posts */}
      <Row justify="center">
        <Col span={18}>
          <List
            grid={{ gutter: 16, column: 1 }}
            dataSource={filteredPosts}
            renderItem={(post) => (
              <List.Item>
                <Card
                  title={post.jobTitle}
                  extra={
                    <Button type="primary" onClick={() => showConfirm(post)}>สมัครงาน</Button>
                  }
                  style={{
                    borderRadius: "10px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    backgroundColor: "#2c2c2c",
                    color: "#fff",
                  }}
                >
                  <Row gutter={[20, 20]}>
                    <Col span={16}>
                      <Paragraph style={{ color: "#fff" }}>{post.jobDescription}</Paragraph>
                      <Paragraph style={{ color: "#fff" }}>
                        <strong>ประเภทของงาน : </strong><Tag> {post.tag}</Tag>
                      </Paragraph>
                      <Paragraph>
                        <strong>รายได้ : </strong> {post.paymentPerInfluencer}
                      </Paragraph>
                      <Paragraph>
                        <strong>สิ้นสุดรับสมัคร : </strong> {post.dueDate}
                      </Paragraph>
                      <Paragraph>
                        <strong>จำนวนผู้ติดตามขั้นต่ำ : </strong> {post.follower}
                      </Paragraph>
                      <Paragraph>
                        <strong>จำนวนรับสมัคร : </strong> {post.influencerCount}
                      </Paragraph>
                    </Col>
                    <Col span={8}>
                      <Image src={post?.files[0]} width={'100%'} preview={false} />
                    </Col>

                  </Row>

                  {/* <Paragraph style={{ color: "#fff" }}>
                    <strong>แบรนด์:</strong> {post.brand}
                  </Paragraph> */}
                </Card>
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </div>
  );
};

export default ContentFeedPage;
