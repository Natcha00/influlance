import React, { useState } from "react";
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
import { SearchOutlined, CloseCircleOutlined,ExclamationCircleFilled } from "@ant-design/icons";

const { Search } = Input;
const { Option } = Select;


const ContentFeedPage = () => {
  const allPosts = [
    {
      id: 1,
      title: "Frontend Developer Needed",
      category: "พัฒนา",
      brand: "apple",
      description:
        "We are looking for a frontend developer with React.js experience.",
    },
    {
      id: 2,
      title: "Graphic Designer for Social Media",
      category: "Design",
      brand: "samsung",
      description: "We need a graphic designer to work on social media posts.",
    },
    {
      id: 3,
      title: "Marketing Manager for New Campaign",
      category: "Marketing",
      brand: "7-11",
      description:
        "Looking for an experienced  manager for a new campaign.",
    },
    {
      id: 4,
      title: "Backend Developer for API Integration",
      category: "Development",
      brand: "pepsi",
      description:
        "Looking for a backend developer to integrate third-party APIs.",
    },
    {
      id: 5,
      title: "UI/UX Designer",
      category: "Design",
      brand: "apple",
      description: "We need a UI/UX designer to redesign our application.",
    },
  ];

  const allCategories = ["พัฒนา", "Design", "Marketing", "Food"];

  // State for filtered posts, selected tags, and selected category
  const [filteredPosts, setFilteredPosts] = useState(allPosts);
  const [selectedTags, setSelectedTags] = useState([]);
  //const [selectedCategory, setSelectedCategory] = useState('All'); // Added selectedCategory state

  // Handle search
  const onSearch = (value) => {
    const filtered = allPosts.filter(
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
    if (!selectedTags.includes(tag)) {
      const newTags = [...selectedTags, tag];
      setSelectedTags(newTags);
      const filtered = allPosts.filter((post) =>
        newTags.includes(post.category)
      );
      setFilteredPosts(filtered);
    }
  };

  const removeTag = (tag) => {
    const newTags = selectedTags.filter((t) => t !== tag);
    setSelectedTags(newTags);
    if (newTags.length === 0) {
      setFilteredPosts(allPosts);
    } else {
      const filtered = allPosts.filter((post) =>
        newTags.includes(post.category)
      );
      setFilteredPosts(filtered);
    }
  };

  // Handle category change from dropdown
  // const handleCategoryChange = (category) => {
  //   setSelectedCategory(category);
  //   if (category === 'All') {
  //     setFilteredPosts(allPosts);
  //   } else {
  //     const filtered = allPosts.filter(post => post.category === category);
  //     setFilteredPosts(filtered);
  //   }
  // };

  const showConfirm = () => {
    Modal.confirm({
      title: 'ต้องการสมัครนี้ใช่หรือไม่?',
      icon: <ExclamationCircleFilled />,
      content: '',
      onOk() {
        message.success('สมัครงานเรียบร้อย')
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

      {/* Category Filter
      <Row justify="center" style={{ marginBottom: '20px' }}>
        <Col span={18}>
          <Select
            value={selectedCategory}
            onChange={handleCategoryChange}
            size="large"
            style={{ width: '100%', borderRadius: '10px' }}
          >
            <Option value="All">All Categories</Option>
            <Option value="Development">Development</Option>
            <Option value="Design">Design</Option>
            <Option value="Marketing">Marketing</Option>
          </Select>
        </Col>
      </Row> */}

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
                {tag} <CloseCircleOutlined />
              </Tag>
            ))}
          </Space>
        </Col>
      </Row>

      {/* Category Filter with clickable Tags */}
      <Row justify="center" style={{ marginBottom: "20px" }}>
        <Col span={18}>
          <Space size={[0, 8]} wrap>
            {allCategories.map((category) => (
              <Tag
                key={category}
                onClick={() => addTag(category)}
                color={selectedTags.includes(category) ? "purple" : "default"}
                style={{
                  fontSize: "16px",
                  padding: "5px 10px",
                  borderRadius: "10px",
                  cursor: "pointer",
                }}
              >
                {category}
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
                      <Button type="primary" onClick={showConfirm}>สมัครงาน</Button>
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
