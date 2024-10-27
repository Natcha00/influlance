import React, { useState } from 'react';
import { Layout, Row, Col, Card, Form, Input, InputNumber, Button, Table, Typography, Divider, Select, message, Tag, Radio } from 'antd';
import { BankOutlined, DollarOutlined } from '@ant-design/icons';
import { useFinanaceTransactionsQuery, useGetBalanceQuery, useWithdrawMutation } from '../../../api/influencer/financeApi';

const { Header, Content } = Layout;
const { Title, Text } = Typography;
const { Option } = Select;

const FinanceManagementPage = () => {
  const [form] = Form.useForm();
  const [isShowDestinationAccount, setIsShowDestinationAccount] = useState(false)
  const { data: financeTransaction, isLoading, refetch: refetchTransaction } = useFinanaceTransactionsQuery()
  const { data: balance, isLoading: isLoadingBalance, refetch: refetchBalance } = useGetBalanceQuery()
  const [withdraw, { isLoading: isLoadingWithdraw }] = useWithdrawMutation()
  // คอลัมน์ของตาราง
  const columns = [
    {
      title: 'วัน',
      dataIndex: 'createDate',
      key: 'createDate',
    },
    {
      title: 'เงิน',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'เงินคงเหลือ',
      dataIndex: 'balance',
      key: 'balance',
    },
    {
      title: 'ประเภทรายการ',
      dataIndex: 'transactionType',
      key: 'transactionType',
      render: (_, record) => <Tag
        color={
          record?.transactionType == 'deposit' ?
            "cyan" :
            record?.transactionType == 'withdraw' ?
              "volcano" :
              record?.transactionType == 'transfer' ?
                "purple" :
                record?.transactionType == 'receive' ?
                  "lime" :
                  "geekblue"
        }
      >{record?.transactionType}</Tag>
    },
    {
      title: 'สถานะ',
      dataIndex: 'status',
      key: 'status',
      render: (_, record) => <Tag color={
        record?.status == 'approve' ?
          "green" :
          record?.status == 'reject' ?
            "red" :
            "blue"
      }>{record?.status}</Tag>
    },
    {
      title: 'หมายเหตุ',
      dataIndex: 'remark',
      key: 'remark',
      width: "20%"
    },
  ];

  const options = [
    {
      key: "1",
      label: "Bangkok Bank",
      value: "Bangkok Bank"
    },
    {
      key: "2",
      label: "Kasikorn Bank",
      value: "Kasikorn Bank"
    },
    {
      key: "3",
      label: "Siam Commercial Bank",
      value: "Siam Commercial Bank"
    },
    {
      key: "4",
      label: "Krungthai Bank",
      value: "Krungthai Bank"
    },
  ]

  // เมื่อผู้ใช้กดปุ่ม "ถอนเงิน"
  const onFinish = async (values) => {
    try {
      if (values.transactionType == 'withdraw') {
        const resp = await withdraw({
          amount: values.amount,
          sourceAccountNumber: values.sourceAccountNumber,
          bank: values.bank
        }).unwrap()

        if (resp) {
          message.success("ทำรายการถอนเงินสำเร็จ !")
          form.resetFields()
        }
      }
    } catch (error) {
      console.log(error)
      message.error('เกิดข้อผิดพลาด')
    } finally {
      refetchBalance()
      refetchTransaction()
    }

  };

  return (
    <>

      <Typography.Title level={16}>
      ธุรกรรมการเงิน
      </Typography.Title>

      <Row gutter={[16, 16]}>
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
            <Title level={2} style={{ color: '#fff', textAlign: 'center' }}>฿{balance}</Title>

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

              {/* ประเภทธุรกรรม */}
              <Form.Item
                label="เลือกประเภทธุรกรรม"
                name="transactionType"
                rules={[{ required: true, message: 'โปรดเลือกประเภทธุรกรรม !' }]}
              >
                {/* <Select placeholder={"เลือกประเภทธุรกรรม"} options={[
                  {
                    label: "ฝาก",
                    value: "deposit",
                    disabled: true
                  },
                  {
                    label: "ถอน",
                    value: "withdraw"
                  },
                  {
                    label: "โอน (เริ่มใช้เร็วๆนี้)",
                    value: "transfer",
                    disabled: true
                  },
                ]} onChange={(e) => {
                  if (e == 'transfer') {
                    setIsShowDestinationAccount(true)
                  } else {
                    setIsShowDestinationAccount(false)
                  }
                }} /> */}
                <Radio.Group onChange={(e) => {
                  if (e == 'transfer') {
                    setIsShowDestinationAccount(true)
                  } else {
                    setIsShowDestinationAccount(false)
                  }
                }} block={true} size='large'>
                  <Radio.Button value="withdraw">ถอน</Radio.Button>
                  <Radio.Button value="deposit"disabled={true}>ฝาก (เริ่มใช้เร็วๆนี้)</Radio.Button>
                  <Radio.Button value="transfer" disabled={true}>โอน (เริ่มใช้เร็วๆนี้)</Radio.Button>
                </Radio.Group>
              </Form.Item>

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
                name="sourceAccountNumber"
                rules={[
                  { required: true, message: 'โปรดใส่เลขที่บัญชี !' },
                  { pattern: /^[0-9]+$/, message: 'เลขที่บัญชีต้องเป็นตัวเลข!' }
                ]}
              >
                <Input placeholder="เลขที่บัญชี" maxLength={15} />
              </Form.Item>




              {/* เลขบัญชีธนาคาร */}
              {
                isShowDestinationAccount && <Form.Item
                  label="เลขบัญชีปลาย"
                  name="destinationAccountNumber"
                  rules={[
                    { required: true, message: 'โปรดใส่เลขที่บัญชี !' },
                    { pattern: /^[0-9]+$/, message: 'เลขที่บัญชีต้องเป็นตัวเลข!' }
                  ]}
                >
                  <Input placeholder="เลขที่บัญชี" maxLength={15} />
                </Form.Item>
              }

              {/* จำนวนเงินที่ต้องการถอน */}
              <Form.Item
                label="จำนวนเงิน"
                name="amount"
                rules={[
                  { required: true, message: 'โปรดใส่จำนวนเงิน !' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (value > balance && (getFieldValue('transactionType') == 'withdraw' || getFieldValue('transactionType') == 'transfer')) {
                        return Promise.reject(new Error('จำนวนเงินคงเหลือ ไม่เพียงพอ!'));
                      } else if (value == 0) {
                        return Promise.reject(new Error('จำนวนเงินต้องมากกว่า 0 !'));

                      }
                      return Promise.resolve();
                    },
                  }),
                ]}
              >
                <InputNumber style={{ width: '100%' }} min={0} placeholder="ใส่จำนวนเงิน" suffix={'฿'} />
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
        <Table dataSource={financeTransaction} columns={columns} style={{ 'width': '100%' }} scroll={{ x: "100%" }} />
      </Card>
    </>
  );
};


export default FinanceManagementPage;
