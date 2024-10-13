import { Form, Input, Modal } from 'antd'
import { useForm } from 'antd/es/form/Form'
import TextArea from 'antd/es/input/TextArea'
import React from 'react'

function AddContentsModal({ isOpen, setIsOpen, handleAdd }) {
    const [form] = useForm()

    return (
        <Modal open={isOpen} onOk={() => {
            form.submit()
            setIsOpen(false)
        }} onCancel={() => setIsOpen(false)}>
            <Form form={form} onFinish={(e)=>{handleAdd(e);form.resetFields()}}>
                <Form.Item label="content" name='content'>
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default AddContentsModal