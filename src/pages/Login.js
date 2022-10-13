import { Button, Input, Typography } from "antd";
// import "../styles/pages/login.css";
import Logo from "../../src/images/logo.svg";

const Login = () => {
  const { Title } = Typography;
  return (
    <div className="login">
      <div className="login-container">
        <img src={Logo} />
        <Title level={1}>Admin Login</Title>
        {/* <p>Login in to your account and enjoy unlimited music.</p> */}
        <Input placeholder="User Name" />
        <Input placeholder="Password" />
        <Button type="primary">Login</Button>
      </div>
    </div>
  );
};

export default Login;
