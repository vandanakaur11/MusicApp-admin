import { Table, Typography } from "antd";
import { AiFillDashboard } from "react-icons/ai";
import Layout from "../layout/DashboarLayout";

const dataSource = [
  {
    key: "1",
    name: "Mike",
    age: 32,
    address: "10 Downing Street",
  },
  {
    key: "2",
    name: "John",
    age: 42,
    address: "10 Downing Street",
  },
];

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
];

const Dashboard = () => {
  const { Title } = Typography;

  return (
    <Layout active="dashboard">
      <div className="general-margin-padding">
        <Title className="general-title-h1">
          <AiFillDashboard style={{ marginRight: "10px" }} /> Dashboard
        </Title>
      </div>
      <Table dataSource={dataSource} columns={columns} />;
    </Layout>
  );
};

export default Dashboard;
