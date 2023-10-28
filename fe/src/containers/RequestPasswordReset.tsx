import React, { useState } from "react";
import { Form, Input, Button, notification, Card } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { requestPasswordReset } from "../api"; // Adjust the import path according to your setup
import "./RequestPasswordReset.css";
import { useNavigate } from "react-router-dom";

const RequestPasswordReset: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const navigate = useNavigate();

  const onFinish = async (values: { email: string }) => {
    try {
      setLoading(true);
      await requestPasswordReset(values.email);
      navigate("/forgot-password-info");
      notification.success({
        message: "Password Reset Requested",
        description:
          "If the email exists in our system, a password reset link has been sent to it.",
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Password reset request error:", error);
        notification.error({
          message: "Request Failed",
          description: error.message,
        });
      } else {
        console.error("Password reset request error:", error);
        notification.error({
          message: "Request Failed",
          description: "An unexpected error occurred.",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="request-password-reset-container">
      <Card className="request-password-reset-card" hoverable>
        <h1>Reset Password</h1>
        <Form
          name="request-password-reset"
          onFinish={onFinish}
          form={form}
          className="request-password-reset-form"
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please input a valid email!" },
            ]}
            hasFeedback
          >
            <Input prefix={<MailOutlined />} placeholder="Email" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="request-password-reset-form-button"
            >
              Request Password Reset
            </Button>
          </Form.Item>
          <div className="request-password-reset-extra-links">
            <a href="/login">Back to Login</a>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default RequestPasswordReset;
