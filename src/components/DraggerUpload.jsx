import { message, Upload } from 'antd';
import React, { useState } from 'react'
import { InboxOutlined } from '@ant-design/icons';
import { useUploadMutation } from '../api/uploadApi';
import { supabase } from '../shared/supabase';
import { v4 as uuidv4 } from 'uuid';
const bucketName = 'influ'; // Replace with your bucket name

async function uploadFile(file) {
    const fileExtension = file.name.split('.').pop();
    const fileName = `${uuidv4()}.${fileExtension}`; // Generate a UUID and append the file extension
    const filePath = `uploads/${fileName}`; // Path where you want to store the file

    const { data, error } = await supabase
        .storage
        .from(bucketName)
        .upload(filePath, file);

    if (error) {
        console.error('Error uploading file:', error.message);
        message.error("Error on upload file")
        return { error: error.message };
    }

    const { data: getUrl, error2 } = await supabase
        .storage
        .from(bucketName)
        .getPublicUrl(filePath);

    if (error2) {
        console.error('Error uploading file:', error2.message);
        message.error("Error on upload file")
        return { error: error2.message };
    }

    return { url: getUrl.publicUrl };
}

const DraggerUpload = ({ fileList, setFileList, form, name, multiple = false, maxCount = 1, disabled = false, beforeUpload = false }) => {
    const customUpload = async ({ file, onSuccess, onProgress }) => {
        try {
            // console.log(file)
            const resp = await uploadFile(file)
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
            disabled={disabled}
            name="files"
            multiple={multiple}
            maxCount={maxCount}
            listType="picture-card"
            customRequest={customUpload}
            beforeUpload={beforeUpload}
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