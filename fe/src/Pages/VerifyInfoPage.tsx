import React from "react";
import { Card } from "antd";
import { Link } from "react-router-dom";
import "./VerifyInfoPage.css";

const VerifyInfoPage: React.FC = () => {
  return (
    <div className="verify-container">
      <Card className="verify-card">
        <h1>Email Verification</h1>
        <p>
          A verification link has been sent to your email address. Please check
          your inbox and click on the link to verify your email.
        </p>
        <p>
          If you did not receive the email, please check your spam folder or{" "}
          <a href="/resend-verification">click here</a> to resend the
          verification email.
        </p>
        <div className="verify-footer">
          <Link to="/login">Back to Login</Link>
        </div>
      </Card>
    </div>
  );
};

export default VerifyInfoPage;
