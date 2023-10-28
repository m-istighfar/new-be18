import React, { useState, useEffect } from "react";
import { Form, Input, Button, notification, Card } from "antd";
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import { register } from "../api";
import { useNavigate } from "react-router-dom";
import "./Register.css";

interface RegisterProps {
  onRegisterSuccess: () => void;
}

const Register: React.FC<RegisterProps> = ({ onRegisterSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    // Automatically focus on the username input when the component mounts
    form.getFieldInstance("username").focus();
  }, [form]);

  const onFinish = async (values: {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    if (values.password !== values.confirmPassword) {
      notification.error({
        message: "Registration Failed",
        description: "Passwords do not match!",
      });
      return;
    }

    try {
      setLoading(true);
      await register({
        username: values.username,
        email: values.email,
        password: values.password,
        role: "user", // Assuming 'user' as the default role for all registrations
      });
      navigate("/verify");
      onRegisterSuccess();
      notification.success({
        message: "Registration Successful",
        description: "Please check your email to verify your account!",
      });
      form.resetFields();
    } catch (error) {
      console.error("Registration error:", error);
      notification.error({
        message: "Registration Failed",
        description:
          error instanceof Error
            ? error.message
            : "An error occurred while registering",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <div className="register-container">
      <Card className="register-card" hoverable>
        <div className="register-logo">
          {/* <img src="/logo.png" alt="logo" className="logo-image" /> */}
          <h1>Task Geass</h1>
        </div>
        <Form
          name="register"
          onFinish={onFinish}
          form={form}
          className="register-form"
        >
          <Form.Item
            name="username"
            rules={[
              { required: true, message: "Please input your Username!" },
              {
                min: 6,
                message: "Username must be at least 6 characters!",
              },
            ]}
            hasFeedback
          >
            <Input prefix={<UserOutlined />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Please input your Email!",
              },
            ]}
            hasFeedback
          >
            <Input prefix={<MailOutlined />} placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
            hasFeedback
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            rules={[
              { required: true, message: "Please confirm your Password!" },
              {
                min: 8,
                message: "Password must be at least 8 characters!",
              },
            ]}
            hasFeedback
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Confirm Password"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="register-form-button"
            >
              Register
            </Button>
          </Form.Item>
          <div className="register-extra-links">
            Already have an account?{" "}
            <span onClick={handleLoginClick}>Login</span>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Register;
