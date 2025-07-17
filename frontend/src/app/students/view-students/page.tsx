"use client";

import { useEffect, useState } from "react";
import { Card, Col, Row, Spin, Avatar, Typography, message } from "antd";
import { UserOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

type Student = {
  id: number;
  registrationNumber: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  admissionNumber: string;
  photo?: string;
};

const ViewStudentsPage = () => {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/students")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch student data.");
        return res.json();
      })
      .then((data) => setStudents(data))
      .catch((err) => {
        console.error(err);
        message.error("Could not load students.");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="p-4">
      <Title level={3}>Student Records</Title>
      <Row gutter={[16, 16]}>
        {students.map((student) => (
          <Col xs={24} sm={12} md={8} lg={6} key={student.id}>
            <Card
              hoverable
              cover={
                student.photo ? (
                  <img
                    alt="student"
                    /*   src={`http://localhost:5000/uploads/${student.photo}`} */
                    src={`${API_BASE_URL}/uploads/${student.photo}`} 
                    className="object-cover h-56 w-full"
                  />
                ) : (
                  <Avatar
                    size={224}
                    icon={<UserOutlined />}
                    className="mx-auto mt-4"
                  />
                )
              }
            >
              <Title level={5} className="mb-1">
                {student.firstName} {student.middleName} {student.lastName}
              </Title>
              <Text>Reg. No: {student.registrationNumber}</Text>
              <br />
              <Text>Adm. No: {student.admissionNumber}</Text>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ViewStudentsPage;
