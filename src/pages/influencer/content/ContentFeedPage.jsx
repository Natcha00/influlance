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
} from "antd";
import { SearchOutlined, CloseCircleOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import { useCancelEnrollMutation, useCategoriesQuery, useEnrollMutation, useJobsQuery } from '../../../api/jobApi'


const { Search } = Input;
const { Option } = Select;


const ContentFeedPage = () => {
  const { data: jobs, isLoading: isLoadingJobs, refetch } = useJobsQuery(null)
  const { data: categories, isLoading: isLoadingCategories } = useCategoriesQuery(null)
  const [enroll, { isLoading: LoadingEnroll }] = useEnrollMutation()


  useEffect(() => {
    setFilteredPosts(jobs)
  }, [jobs])
  // State for filtered posts, selected tags, and selected category
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  // Handle search
  const onSearch = (value) => {
    const filtered = jobs.filter(
      (post) =>
        (post.title.toLowerCase().includes(value.toLowerCase()) &&
          (selectedTags.length === 0 ||
            selectedTags.includes(post.category))) ||
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
        newTags.map(el => el.value).includes(post.category)
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
        newTags.map(el => el.value).includes(post.category)
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

      {/* Category Filter with clickable Tags */}
      <Row justify="center" style={{ marginBottom: "20px" }}>
        <Col span={18}>
          <Space size={[0, 8]} wrap>
            {categories?.map((category) => (
              <Tag
                key={category.value}
                onClick={() => addTag(category)}
                color={selectedTags.map(el => el.value).includes(category.value) ? "purple" : "default"}
                style={{
                  fontSize: "16px",
                  padding: "5px 10px",
                  borderRadius: "10px",
                  cursor: "pointer",
                }}
              >
                {category.label}
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
                  title={post.title}
                  extra={
                    <Button type="primary" onClick={() => showConfirm(post)} loading={LoadingEnroll}>สมัครงาน</Button>
                  }
                  style={{
                    borderRadius: "10px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    backgroundColor: "#2c2c2c",
                    color: "#fff",
                  }}
                >
                  <p style={{ color: "#fff" }}>{post.description}</p>
                  <p style={{ color: "#fff" }}>
                    <strong>ประเภทของงาน:</strong><Tag> {post.category}</Tag>
                  </p>
                  <p style={{ color: "#fff" }}>
                    <strong>แบรนด์:</strong> {post.brand}
                  </p>
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
