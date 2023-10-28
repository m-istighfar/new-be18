import { Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";

interface ToggleButtonProps {
  onClick: () => void;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ onClick }) => (
  <Button
    type="text"
    icon={<MenuOutlined />}
    onClick={onClick}
    className="menu-toggle-button"
  />
);

export default ToggleButton;
