import {
  BellOutlined,
  LogoutOutlined,
  MoreOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Dropdown, Layout, Menu, Typography } from "antd";
import { Link } from "react-router-dom";

import DashboardMenuDrawer from "./MenuDrawer";

const { Content } = Layout;

const MobileLayout = ({ active, children }) => {
  const menu = (
    <Menu>
      <Menu.Item key="0" icon={<UserOutlined />}>
        <Link to="/profile">Profile</Link>
      </Menu.Item>
      <Menu.Item key="1" icon={<BellOutlined />}>
        <Link to="/notification">Notifications</Link>
      </Menu.Item>
      <Menu.Item key="2" icon={<LogoutOutlined />}>
        <Link to="/login">Logout</Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout className="dashboard-mobile">
      <div className="mobile-header">
        <DashboardMenuDrawer active={active} />
        <Typography.Title level={4}>Dashboard</Typography.Title>
        <Dropdown className="more-dropdown" overlay={menu} trigger={["click"]}>
          <MoreOutlined />
        </Dropdown>
      </div>
      <Content className="dashboard-children">{children}</Content>
    </Layout>
  );
};

export default MobileLayout;
