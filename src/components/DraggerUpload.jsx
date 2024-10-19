import { message, Upload } from 'antd';
import React, { useState } from 'react'
import { InboxOutlined } from '@ant-design/icons';
import { useUploadMutation } from '../api/uploadApi';

const DraggerUpload = ({ fileList, setFileList, form, name, multiple = false, maxCount = 1 }) => {
    const [upload, { isLoading }] = useUploadMutation()
    // Function to handle image upload
    const customUpload = async ({ file, onSuccess, onProgress }) => {
        try {
            console.log(file)
            const resp = await upload({ image: file }).unwrap()
            if (resp) {
                file.url = resp.url
                file.thumbUrl = resp.url
                file.percent = 100
                onSuccess(resp.url)
            }
        } catch (error) {
            console.log('error', error)
        }
    };
    return (
        <Upload.Dragger
            name="files"
            multiple={true}
            maxCount={maxCount}
            listType="picture-card"
            customRequest={customUpload}
            onChange={(info) => {
                const { status } = info.file;
                let newFileList = [...info.fileList]
                newFileList = newFileList.slice(-maxCount)
                form.setFieldValue(name, newFileList)
                setFileList(newFileList);
                if (status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                if (status === 'done') {

                    message.success(`${info.file.name} file uploaded successfully.`);
                } else if (status === 'error') {
                    message.error(`${info.file.name} file upload failed.`);
                }
            }}
            onRemove={(file) => {
                const newFileList = fileList.filter(el => el.uid != file.uid)
                setFileList(newFileList)
                form.setFieldValue(name, newFileList)
                return false
            }}
            accept="image/*,video/*"
            fileList={fileList || []}
        >
            <p className="ant-upload-drag-icon">
                <InboxOutlined />
            </p>
            <p style={{ color: "GrayText" }}>
                คลิกหรือลากไฟล์ไปยังพื้นที่นี้เพื่ออัปโหลด
            </p>
            <p className="ant-upload-hint">
                รองรับการอัปโหลดแบบเดี่ยวหรือเป็นกลุ่ม ห้ามอัปโหลดข้อมูลบริษัทหรือไฟล์ต้องห้ามอื่นๆ โดยเด็ดขาด
            </p>
        </Upload.Dragger>
    )
}

export default DraggerUpload