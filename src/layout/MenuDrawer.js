import { AntDesignOutlined, MenuOutlined } from "@ant-design/icons";
import { Avatar, Button, Drawer } from "antd";
import React, { useState } from "react";

import LayoutMenu from "./LayoutMenu";

const MenuStyle = {
  cursor: "pointer",
  background: "transparent",
  color: "white",
  border: "none",
  outline: "none",
  fontSize: "100px",
  height: "auto",
};

const DashboardLayoutMobile = ({ active }) => {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <>
      <Button onClick={showDrawer} style={MenuStyle}>
        <MenuOutlined />
      </Button>
      <Drawer
        className="mobile-menu-drawer"
        placement="left"
        closable
        onClose={onClose}
        visible={visible}
      >
        <div className="logo">
          <Avatar size={32} icon={<AntDesignOutlined />} />
          <p>hello</p>
        </div>
        <LayoutMenu active={active} />
      </Drawer>
    </>
  );
};

export default DashboardLayoutMobile;
