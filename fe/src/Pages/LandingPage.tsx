import { Link } from "react-router-dom";
import React from "react";
import { Button, List, Typography, Card, Divider } from "antd";

import {
  UserOutlined,
  LockOutlined,
  CheckCircleOutlined,
  SortAscendingOutlined,
  FunnelPlotOutlined,
  SearchOutlined,
  LoginOutlined,
  UserAddOutlined,
} from "@ant-design/icons";

import "./LandingPage.css";

const { Title, Paragraph } = Typography;

interface FeatureItem {
  text: string;
  icon: JSX.Element;
}

const userAuthenticationFeatures: FeatureItem[] = [
  { text: "Login & Register", icon: <UserAddOutlined /> },
  { text: "Secure Password Recovery", icon: <LockOutlined /> },
];

const taskManagementFeatures: FeatureItem[] = [
  { text: "View, Add, and Edit Tasks", icon: <CheckCircleOutlined /> },
  { text: "Task Prioritization", icon: <FunnelPlotOutlined /> },
  { text: "Mark Tasks as Complete", icon: <CheckCircleOutlined /> },
];

const sortingAndFilteringFeatures: FeatureItem[] = [
  { text: "Sort Tasks", icon: <SortAscendingOutlined /> },
  { text: "Search Tasks", icon: <SearchOutlined /> },
];
function LandingPage() {
  return (
    <div className="landing-container">
      <Card className="landing-card">
        <Title className="landing-title">Task Geass</Title>
        <Paragraph className="landing-description">
          A modern task management application designed to help you stay
          organized and productive.
        </Paragraph>

        <Divider>Key Features</Divider>

        <div className="feature-section">
          <Title level={3}>
            <UserOutlined style={{ marginRight: 8 }} /> User Authentication
          </Title>
          <List
            dataSource={userAuthenticationFeatures}
            renderItem={({ text, icon }) => (
              <List.Item className="feature-list-item">
                {React.cloneElement(icon, { style: { marginRight: 8 } })} {text}
              </List.Item>
            )}
          />
          <Title level={3}>
            <CheckCircleOutlined style={{ marginRight: 8 }} /> Task Management
          </Title>
          <List
            dataSource={taskManagementFeatures}
            renderItem={({ text, icon }) => (
              <List.Item className="feature-list-item">
                {React.cloneElement(icon, { style: { marginRight: 8 } })} {text}
              </List.Item>
            )}
          />

          <Title level={3}>
            <SortAscendingOutlined style={{ marginRight: 8 }} /> Sorting &
            Filtering
          </Title>
          <List
            dataSource={sortingAndFilteringFeatures}
            renderItem={({ text, icon }) => (
              <List.Item className="feature-list-item">
                {React.cloneElement(icon, { style: { marginRight: 8 } })} {text}
              </List.Item>
            )}
          />
        </div>

        <Divider />

        <div className="action-buttons">
          <Link to="/login">
            <Button
              type="primary"
              className="login-button"
              icon={<LoginOutlined />}
            >
              Login
            </Button>
          </Link>
          <Link to="/register">
            <Button className="register-button" icon={<UserAddOutlined />}>
              Register
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}

export default LandingPage;
