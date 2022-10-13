import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout } from "antd";
import Logo from "../../src/images/logo.svg";
// const { Header, Sider, Content } = Layout;
import React, { useState } from "react";
import LayoutMenu from "./LayoutMenu.js";

const { Header, Content, Sider } = Layout;

const LayoutDesktop = ({ children, active }) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="layoutDesktop">
      <Layout style={{ minHeight: "100vh" }}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div style={{ width: "70px", height: "70px", display: "flex" }}>
            {!collapsed ? (
              <img
                alt=""
                src={Logo}
                className="logo-layoutDesktop"
                // style={{ objectFit: "contain", width: "120px", margin: "0px 70%" }}
              />
            ) : (
              <img
                alt=""
                src={Logo}
                className="logo-layoutDesktop-empty"
                // style={{ objectFit: "contain", width: "120px", margin: "0px 70%" }}
              />
            )}
          </div>
          {/* <div className="logo">
            <img
              height="60px"
              width="60px"
              style={{
                borderRadius: "50%",
                objectFit: "contain",
              }}
              src={
                "https://thumbs.dreamstime.com/b/handsome-man-black-suit-white-shirt-posing-studio-attractive-guy-fashion-hairstyle-confident-man-short-beard-125019349.jpg"
              }
            />
            <p>
              forge
              <br />
              <span className="online">
                <GoPrimitiveDot />
                Online
              </span>
            </p>
          </div> */}
          <LayoutMenu active={active} />
        </Sider>

        <Layout>
          <Header>
            <div onClick={toggle} className="trigger">
              <span>
                {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              </span>
              <span className="header-right">
                <p>Mulder Music</p>
              </span>
            </div>
          </Header>

          <Content>
            <div
            //   style={{
            //     margin: "24px 16px",
            //     padding: 24,
            //     minHeight: 280,
            //   }}
            >
              {children}
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default LayoutDesktop;
