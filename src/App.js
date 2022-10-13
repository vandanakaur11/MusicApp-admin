import "antd/dist/antd.less";
import { useEffect } from "react";
import Routes from "./Routes";
import "./styles/style.css";
import theme from "./theme.json";

const App = () => {
  useEffect(() => {
    Object.keys(theme).forEach((key) => {
      document.body.style.setProperty(`--${key}`, theme[key]);
    });
  }, []);
  return <Routes />;
};

export default App;
