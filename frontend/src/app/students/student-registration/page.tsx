"use client";

import React, { useState } from "react";
import {
  Button,
  Form,
  Input,
  Select,
  DatePicker,
  message,
  Upload,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadFile } from "antd/es/upload/interface";
import axios from "axios";
import dayjs from "dayjs";

const { Option } = Select;

const formItemLayout = {
  labelCol: { xs: { span: 24 }, sm: { span: 8 } },
  wrapperCol: { xs: { span: 24 }, sm: { span: 16 } },
};

const tailFormItemLayout = {
  wrapperCol: { xs: { span: 24, offset: 0 }, sm: { span: 16, offset: 8 } },
};

const StudentRegistration: React.FC = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const onFinish = async (values: any) => {
    try {
      const formData = new FormData();

      formData.append("registration_number", values.registration_number);
      formData.append("firstname", values.firstname);
      formData.append("middlename", values.middlename || "");
      formData.append("lastname", values.lastname);
      formData.append("date-picker", dayjs(values["date-picker"]).format("YYYY-MM-DD"));
      formData.append("gender", values.gender);
      formData.append("nationality", values.nationality);
      formData.append("previous-school", values["previous-school"]);
      formData.append("admission-number", values["admission-number"]);

      if (fileList.length > 0) {
        formData.append("student-photo", fileList[0] as any);
      } else {
        message.error("Please upload a photo.");
        return;
      }

      const res = await axios.post("http://localhost:5000/api/register-student", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.status === 201) {
        message.success("Student registered successfully!");
        form.resetFields();
        setFileList([]);
      }
    } catch (err) {
      console.error(err);
      message.error("Failed to register student.");
    }
  };

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="registerStudent"
      onFinish={onFinish}
      style={{ maxWidth: 600 }}
      scrollToFirstError
    >
      <Form.Item
        name="registration_number"
        label="Registration Number"
        rules={[{ required: true, message: "Enter registration number" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="firstname"
        label="First Name"
        rules={[{ required: true, message: "Enter first name" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item name="middlename" label="Middle Name">
        <Input />
      </Form.Item>

      <Form.Item
        name="lastname"
        label="Last Name"
        rules={[{ required: true, message: "Enter last name" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="date-picker"
        label="Date of Birth"
        rules={[{ required: true, message: "Please select date!" }]}
      >
        <DatePicker />
      </Form.Item>

      <Form.Item
        name="gender"
        label="Gender"
        rules={[{ required: true, message: "Please select gender!" }]}
      >
        <Select placeholder="Select gender">
          <Option value="male">Male</Option>
          <Option value="female">Female</Option>
          <Option value="other">Other</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="nationality"
        label="Nationality"
        rules={[{ required: true, message: "Enter nationality" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="previous-school"
        label="Previous School"
        rules={[{ required: true, message: "Enter previous school" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="admission-number"
        label="Admission Number"
        rules={[{ required: true, message: "Enter admission number" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="student-photo"
        label="Student Photo"
        rules={[{ required: true, message: "Please upload a photo!" }]}
      >
        <Upload
          beforeUpload={(file) => {
            setFileList([file]);
            return false; // Prevent auto upload
          }}
          onRemove={() => setFileList([])}
          fileList={fileList}
        >
          <Button icon={<UploadOutlined />}>Select Photo</Button>
        </Upload>
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Register Student
        </Button>
      </Form.Item>
    </Form>
  );
};

export default StudentRegistration;
