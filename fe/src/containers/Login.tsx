import React, { useState, useEffect } from "react";
import { Form, Input, Button, notification, Card } from "antd";
import {
  UserOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import { login } from "../api";
import "./Login.css";

interface LoginProps {
  onLoginSuccess: (token: string, role: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    // Automatically focus on the username input when the component mounts
    form.getFieldInstance("username").focus();
  }, [form]);

  const onFinish = async (values: { username: string; password: string }) => {
    try {
      setLoading(true);
      const data = await login(values.username, values.password);
      onLoginSuccess(data.accessToken, data.role);
      notification.success({
        message: "Login Successful",
        description: "You have successfully logged in!",
      });
    } catch (error) {
      console.error("Login error:", error);
      let errorMessage = "An error occurred while logging in";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      notification.error({
        message: "Login Failed",
        description: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <Card className="login-card" hoverable>
        <div className="login-logo">
          {/* <img src="/logo.png" alt="logo" className="logo-image" /> */}
          <h1>Task Geass</h1>
        </div>
        <Form
          name="login"
          onFinish={onFinish}
          form={form}
          className="login-form"
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
            name="password"
            rules={[
              { required: true, message: "Please input your Password!" },
              {
                min: 8,
                message: "Password must be at least 8 characters!",
              },
            ]}
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
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="login-form-button"
            >
              Log in
            </Button>
          </Form.Item>
          <div className="login-extra-links">
            <a className="login-form-forgot" href="/forgot-password">
              Forgot password
            </a>
            Or <a href="/register">Register now!</a>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
