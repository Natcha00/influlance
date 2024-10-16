import React from 'react';
import { Layout, Row, Col, Card, Form, Input, InputNumber, Button, Table, Typography, Divider, Select, message } from 'antd';
import { BankOutlined, DollarOutlined } from '@ant-design/icons';

const { Header, Content } = Layout;
const { Title, Text } = Typography;
const { Option } = Select;

const FinanceManagementPage = () => {
  const [form] = Form.useForm();

  // ข้อมูลตัวอย่างสำหรับการแสดงประวัติการถอนเงิน
  const dataSource = [
    {
      key: '1',
      date: '2024-10-01',
      amount: 1000,
      status: 'ถอน',
      
    },
    {
      key: '2',
      date: '2024-09-20',
      amount: 500,
      status: 'ถอน',
    },
  ];

  // คอลัมน์ของตาราง
  const columns = [
    {
      title: 'วัน',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'เงิน',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'รายการ',
      dataIndex: 'status',
      key: 'status',
    },
  ];
  
  const options = [
    {
      key:"1",
      label:"Bangkok Bank",
      value:"Bangkok Bank"
    },
    {
      key:"2",
      label:"Kasikorn Bank",
      value:"Kasikorn Bank"
    },
    {
      key:"3",
      label:"Siam Commercial Bank",
      value:"Siam Commercial Bank"
    },
    {
      key:"4",
      label:"Krungthai Bank",
      value:"Krungthai Bank"
    },
  ]

  // เมื่อผู้ใช้กดปุ่ม "ถอนเงิน"
  const onFinish = (values) => {
    message.success(`Request to withdraw ฿${values.amount} to ${values.bank} account ${values.accountNumber} was submitted!`);
    console.log('Received values:', values);
  };

  return (
    <>

        <Typography.Title level={16}>
          จัดการบัญชี
        </Typography.Title>

        <Row gutter={[16,16]}>
          {/* ส่วนที่แสดงยอดคงเหลือ */}
          <Col xs={24} md={8}>
            <Card
              style={{
                padding: 10,
                background: '#5A4FF5',
                borderRadius: '10px',
                color: '#fff',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                textAlign: 'center'
              }}
            >
              <Title level={4}>ยอดเงินคงเหลือ :</Title>
              <Title level={2} style={{ color: '#fff', textAlign: 'center' }}>฿ 12,000</Title>

            </Card>
          </Col>

          {/* ฟอร์มสำหรับการถอนเงิน */}
          <Col xs={24} md={16}>
            <Card
              style={{
                borderRadius: '10px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
              }}
            >
              <Title level={3} style={{ color: '#000', marginBottom: '20px' }}>
                ธุรกรรมการเงิน <DollarOutlined />
              </Title>

              <Form
                form={form}
                name="withdrawal_form"
                onFinish={onFinish}
                layout="vertical"
                initialValues={{ amount: 0 }}
              >
              
                {/* เลือกธนาคาร */}
                <Form.Item
                  label="ธนาคาร"
                  name="bank"
                  rules={[{ required: true, message: 'โปรดเลือกธนาคาร!' }]}
                >
                  <Select
                    placeholder={<><BankOutlined /> เลือกธนาคาร </>}
                    style={{ width: '100%' }}
                    options={options}
                  />
                
                </Form.Item>

                {/* เลขบัญชีธนาคาร */}
                <Form.Item
                  label="เลขบัญชี"
                  name="accountNumber"
                  rules={[
                    { required: true, message: 'โปรดใส่เลขที่บัญชี!' },
                    { pattern: /^[0-9]+$/, message: 'เลขที่บัญชีต้องเป็นตัวเลข!' }
                  ]}
                >
                  <Input placeholder="เลขที่บัญชี" />
                </Form.Item>

                {/* จำนวนเงินที่ต้องการถอน */}
                <Form.Item
                  label="จำนวนเงิน"
                  name="amount"
                  rules={[{ required: true, message: 'โปรดใส่จำนวนเงิน"!' }]}
                >
                  <InputNumber style={{ width: '100%' }} min={0}  placeholder="ใส่จำนวนเงิน" />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit" style={{ width: '100%', borderRadius: '5px' }}>
                    ยืนยัน
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>
        </Row>

        <Divider />

        {/* ตารางแสดงประวัติการถอนเงิน */}
        <Card
          title="ประวัติการเงิน"
          style={{
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
          }}
        >
          <Table dataSource={dataSource} columns={columns} pagination={false} />
        </Card>
    </>
  );
};


export default FinanceManagementPage;
