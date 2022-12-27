import { UserOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlineUserSwitch } from "react-icons/ai";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { setLanguageMode } from "./../redux/reducers/userReducer";
import IMAGEENG from "./../images/usa-2.jpg";
import IMAGENL from "./../images/nl-2.jpg";

const languages = ["nl", "eng"];

const LayoutMenu = ({ active }) => {
  const router = useHistory();

  const { language } = useSelector((state) => state.userReducer, shallowEqual);

  const dispatch = useDispatch();

  const getLocationInfo = async () => {
    const { data } = await axios.get("https://api.db-ip.com/v2/free/self");

    if (data.countryCode === "NL") {
      dispatch(setLanguageMode("nl"));
      router(`${router.route}?lang=nl`);
    } else {
      router(router.route);
    }
  };

  useEffect(() => {
    getLocationInfo();
  }, []);

  return (
    <div style={{ height: "70%", position: "relative" }}>
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
          <Link to="/">{language === "nl" ? "Gebruikers" : "Users"}</Link>
        </Menu.Item>
        <Menu.Item key="trial-users" icon={<AiOutlineUserSwitch />}>
          <Link to="/user-dash-two">
            {language === "nl" ? "Proef gebruikers" : "Trial Users"}
          </Link>
        </Menu.Item>
        <Menu.Item key="codes" icon={<AiOutlineUserSwitch />}>
          <Link to="/codes">Codes</Link>
        </Menu.Item>
        <Menu.Item key="durations" icon={<AiOutlineUserSwitch />}>
          <Link to="/durations">
            {language === "nl" ? "Duur" : "Durations"}
          </Link>
        </Menu.Item>
        <Menu.Item key="subscriptions" icon={<AiOutlineUserSwitch />}>
          <Link to="/subscriptions">
            {language === "nl" ? "Abonnementen" : "Subscription Plans"}
          </Link>
        </Menu.Item>
        <Menu.Item key="all-subscriptions" icon={<AiOutlineUserSwitch />}>
          <Link to="/all-subscriptions">
            {language === "nl"
              ? "Download alle abonnementen"
              : "Get All Subscription Plans"}
          </Link>
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

      {/* <select
        name="language"
        onChange={(e) => handleLanguage(e)}
        value={selectLanguage}
        style={{
          color: "#000000",
          height: "2rem",
          width: "5rem",
          fontSize: "1rem",
        }}
      >
        <option value="en">English</option>
        <option value="nl">Dutch</option>
      </select> */}

      <div
        style={{
          position: "fixed",
          bottom: 50,
          left: 0,
          margin: "0 3rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        {languages.map((language, index) => (
          <button
            key={index}
            style={{
              backgroundColor: "transparent",
              border: "none",
              outline: "none",
              cursor: "pointer",
            }}
            onClick={() => dispatch(setLanguageMode(language))}
          >
            <img
              alt={language === "nl" ? IMAGENL : IMAGEENG}
              src={language === "nl" ? IMAGENL : IMAGEENG}
              style={{ width: 50, height: 33 }}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default LayoutMenu;
