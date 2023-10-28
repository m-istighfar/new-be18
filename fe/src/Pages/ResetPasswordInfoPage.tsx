import React from "react";
import { Card } from "antd";
import { Link } from "react-router-dom";
import "./ResetPasswordInfoPage.css";

const ResetPasswordInfoPage: React.FC = () => {
  return (
    <div className="reset-password-info-container">
      <Card className="reset-password-info-card">
        <h1>Password Reset Requested</h1>
        <p>
          A password reset link has been sent to your email address. Please
          check your inbox and follow the instructions to reset your password.
        </p>
        <p>
          If you did not receive the email, please check your spam folder or{" "}
          <Link to="/resend-password-reset">click here</Link> to resend the
          password reset email.
        </p>
        <div className="reset-password-info-footer">
          <Link to="/login">Back to Login</Link>
        </div>
      </Card>
    </div>
  );
};

export default ResetPasswordInfoPage;
