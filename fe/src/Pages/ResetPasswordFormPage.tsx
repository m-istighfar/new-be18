import React, { useState, useEffect } from "react";
import { Form, Input, Button, Card, notification } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { resetPassword } from "../api";
import "./ResetPasswordFormPage.css";

const PasswordResetFormPage: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { resetToken } = useParams();

  useEffect(() => {
    if (resetToken) {
      form.setFieldsValue({ resetToken });
    }
  }, [form, resetToken]);

  const onFinish = async (values: { newPassword: string }) => {
    if (!resetToken) {
      // Handle the case where resetToken is undefined
      // For example, show an error notification and return early

      notification.error({
        message: "Error",
        description: "Reset token is missing. Please try again.",
      });
      return;
    }
    try {
      setLoading(true);
      await resetPassword(resetToken, values.newPassword);
      notification.success({
        message: "Password Reset Successful",
        description:
          "Your password has been reset successfully. You can now log in with your new password.",
      });
      navigate("/login");
    } catch (error) {
      console.error("Password reset error:", error);
      notification.error({
        message: "Password Reset Failed",
        description: "An error occurred while resetting your password.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="password-reset-container">
      <Card className="password-reset-card" hoverable>
        <h1>Password Reset</h1>
        <Form
          name="passwordReset"
          onFinish={onFinish}
          form={form}
          className="password-reset-form"
        >
          <Form.Item
            name="newPassword"
            rules={[
              { required: true, message: "Please input your new password!" },
              {
                min: 6,
                message: "Password must be at least 6 characters!",
              },
            ]}
            hasFeedback
          >
            <Input.Password placeholder="New Password" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="password-reset-form-button"
            >
              Reset Password
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default PasswordResetFormPage;
