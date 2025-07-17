"use client";

import { Layout, Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import type { FC } from "react";

const { Header } = Layout;

type AppHeaderProps = {
  collapsed: boolean;
  toggleCollapsed: () => void;
  onMobileMenuClick: () => void;
  isMobile: boolean;
};

const AppHeader: FC<AppHeaderProps> = ({ collapsed, toggleCollapsed, onMobileMenuClick, isMobile }) => {
  return (
    <Header
      style={{
        background: "#1e293b",
        color: "#e2e8f0",
        padding: "0 12px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: 48,
        lineHeight: "48px",
        position: "sticky",
        top: 0,
        zIndex: 99,
        boxShadow: "0 1px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Button
        type="text"
        icon={<MenuOutlined style={{ color: "#e2e8f0" }} />}
        onClick={isMobile ? onMobileMenuClick : toggleCollapsed}
        style={{ fontSize: 18 }}
      />

      <h1 style={{ margin: 0, fontSize: "1rem", color: "#e2e8f0" }}>School System</h1>
      <div style={{ width: 32 }} />
    </Header>
  );
};

export default AppHeader;