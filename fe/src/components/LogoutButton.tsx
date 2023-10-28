import { Button } from "antd";
import { UserOutlined } from "@ant-design/icons";

const handleLogout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("role");
  localStorage.removeItem("isLoggedIn");
  window.location.replace("/");
};

const LogoutButton: React.FC = () => (
  <div className="logout-button">
    <Button
      type="text"
      icon={<UserOutlined />}
      style={{ color: "white" }}
      onClick={handleLogout}
    >
      Logout
    </Button>
  </div>
);

export default LogoutButton;
