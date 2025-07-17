"use client";

import { Menu } from "antd";
import Link from "next/link";
import type { MenuProps } from "antd";
import type { FC } from "react";

type AppSideMenuProps = {
  onClick?: MenuProps["onClick"];
  className?: string;
};

const AppSideMenu: FC<AppSideMenuProps> = ({ onClick, className }) => {
  const menuItems: MenuProps["items"] = [
    { label: <Link href="/">Home</Link>, key: "1" },
    { label: <Link href="/students/student-registration">Student Registration</Link>, key: "2" },
    { label: <Link href="/students/view-students">View Students</Link>, key: "3" },
  ];

  return (
    <div className={`h-full w-full overflow-y-auto ${className ?? ""}`} style={{ backgroundColor: "#001529" }}>
      <Menu mode="inline" theme="dark" items={menuItems} onClick={onClick} />
    </div>
  );
};

export default AppSideMenu;