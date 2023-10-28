import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

interface UserProfileProps {
  initials: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ initials }) => (
  <div className="user-profile">
    <Avatar size={64} icon={<UserOutlined />} />
    <span>{initials}</span>
  </div>
);

export default UserProfile;
