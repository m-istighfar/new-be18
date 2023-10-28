import React from "react";
import { Menu } from "antd";
import {
  CalendarOutlined,
  AppstoreOutlined,
  ContainerOutlined,
  CheckCircleOutlined,
  DashboardOutlined,
} from "@ant-design/icons";
import LogoutButton from "./LogoutButton";

interface SidebarMenuProps {
  userRole: "user" | "admin";
  selectedKey: string;
  onSelect: (key: string) => void;
}

const SidebarMenu: React.FC<SidebarMenuProps> = ({
  userRole,
  selectedKey,
  onSelect,
}) => {
  const items =
    userRole === "admin"
      ? [
          {
            key: "3",
            icon: <DashboardOutlined />,
            label: "Dashboard Admin",
          },
        ]
      : [
          {
            key: "3",
            icon: <CalendarOutlined />,
            label: "Today",
          },
          {
            key: "1",
            icon: <AppstoreOutlined />,
            label: "All",
          },
          {
            key: "4",
            icon: <ContainerOutlined />,
            label: "This Week",
          },
          {
            key: "2",
            icon: <CheckCircleOutlined />,
            label: "Completed",
          },
        ];

  return (
    <div className="sidebar-container">
      <Menu
        theme="dark"
        selectedKeys={[selectedKey]}
        mode="vertical"
        items={items}
        onSelect={({ key }) => onSelect(key)}
      />
      <div className="logout-button-container">
        <LogoutButton />
      </div>
    </div>
  );
};
export default SidebarMenu;
