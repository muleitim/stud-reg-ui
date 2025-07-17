"use client";

import { useState } from "react";
import { Layout, theme, Drawer, Grid } from "antd";
import AppSideMenu from "./AppSideMenu";
import AppHeader from "./AppHeader";
import type { ReactNode } from "react";

const { Content, Sider } = Layout;
const { useBreakpoint } = Grid;

type AppLayoutProps = {
  children: ReactNode;
};

const AppLayout = ({ children }: AppLayoutProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const screens = useBreakpoint();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const toggleDrawer = () => setDrawerVisible(!drawerVisible);
  const toggleSidebar = () => setCollapsed(!collapsed);

  const isDesktop = screens.md && !collapsed;

  return (
    <Layout style={{ minHeight: "100vh", flexDirection: "row" }}>
      {isDesktop && (
        <Sider
          width="20vw"
          style={{
            background: "#001529",
            height: "100vh",
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 100,
            borderRight: "2px solid #eab308",
          }}
        >
          <AppSideMenu />
        </Sider>
      )}

      {!screens.md && (
        <Drawer
          title="Menu"
          placement="left"
          closable
          width="80%"
          onClose={toggleDrawer}
          open={drawerVisible}
          styles={{
            body: { padding: 0, backgroundColor: "#E2E8F0" },
            header: {
              backgroundColor: "#9333ea",
              color: "#fff",
            },
          }}
        >
          <div className="w-full h-full bg-black">
            <AppSideMenu className="w-full" onClick={() => setDrawerVisible(false)} />
          </div>
        </Drawer>
      )}

      <Layout
        style={{
          marginLeft: isDesktop ? "20vw" : 0,
          width: isDesktop ? "80vw" : "100vw",
          minHeight: "100vh",
          transition: "all 0.3s ease",
        }}
      >
        <AppHeader
          collapsed={collapsed}
          toggleCollapsed={toggleSidebar}
          onMobileMenuClick={toggleDrawer}
          isMobile={!screens.md}
        />

        <Content
          style={{
            margin: 4,
            padding: 4,
            paddingTop: 4,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;