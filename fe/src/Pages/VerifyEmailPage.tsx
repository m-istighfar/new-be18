import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Result } from "antd";
import { verifyEmail } from "../api";
import "./VerifyEmailPage.css";

const VerifyEmailPage = (): React.ReactElement | null => {
  const { token } = useParams();
  const [verificationStatus, setVerificationStatus] = useState<string | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmailToken = async () => {
      try {
        if (token) {
          const response = await verifyEmail(token);
          setVerificationStatus(response.message);
        } else {
          setError("Verification token is missing from the URL.");
        }
      } catch (error) {
        console.error("Failed to verify email:", error);
        setError("Failed to verify email.");
      }
    };
    verifyEmailToken();
  }, [token, navigate]);

  if (verificationStatus) {
    return (
      <div className="verify-email-container">
        <Result
          status="success"
          title="Email Verification Successful!"
          subTitle={verificationStatus}
          extra={[
            <Button
              type="primary"
              key="console"
              onClick={() => navigate("/login")}
            >
              Go to Login
            </Button>,
          ]}
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="verify-email-container">
        <Result
          status="error"
          title="Email Verification Failed"
          subTitle={error}
          extra={[
            <Button
              type="primary"
              key="console"
              onClick={() => navigate("/login")}
            >
              Go to Login
            </Button>,
          ]}
        />
      </div>
    );
  }

  return null;
};

export default VerifyEmailPage;
