import { UserOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { AiOutlineUserSwitch } from "react-icons/ai";
import { Link } from "react-router-dom";

const LayoutMenu = ({ active }) => {
  return (
    <Menu
      theme="dark"
      defaultSelectedKeys={active}
      defaultOpenKeys={active}
      mode="inline"
    >
      {/* <Menu.Item key="dashboard" icon={<AiFillDashboard />}>
        <Link to="/">Dashboard</Link>
      </Menu.Item> */}
      <Menu.Item key="users" icon={<UserOutlined />}>
        {/* <Link to="/user-dash">Users</Link> */}
        <Link to="/">Users</Link>
      </Menu.Item>
      <Menu.Item key="trial-users" icon={<AiOutlineUserSwitch />}>
        <Link to="/user-dash-two">Trial Users</Link>
      </Menu.Item>
      <Menu.Item key="codes" icon={<AiOutlineUserSwitch />}>
        <Link to="/codes">Codes</Link>
      </Menu.Item>
      <Menu.Item key="durations" icon={<AiOutlineUserSwitch />}>
        <Link to="/durations">Durations</Link>
      </Menu.Item>
      <Menu.Item key="subscriptions" icon={<AiOutlineUserSwitch />}>
        <Link to="/subscriptions">Subscription Plans</Link>
      </Menu.Item>
      <Menu.Item key="all-subscriptions" icon={<AiOutlineUserSwitch />}>
        <Link to="/all-subscriptions">Get All Subscription Plans</Link>
      </Menu.Item>

      {/* <Menu.SubMenu key="invoice" title="Invoice" icon={<FaFileInvoice />}>
        <Menu.Item key="invoice-list" icon={<FaListUl />}>
          <Link to="/invoice-list">Invoice List</Link>
        </Menu.Item>
        <Menu.Item key="create-invoice" icon={<AiOutlinePlus />}>
          <Link to="/create-invoice">Creat Invoice</Link>
        </Menu.Item>
      </Menu.SubMenu> */}
    </Menu>
  );
};

export default LayoutMenu;
