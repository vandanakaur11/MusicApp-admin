import { Button, Typography } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, revokeAccess } from "../Api";
import TableComponent from "../components/TableComponent";
import Layout from "../layout/DashboarLayout";
import { getUsers } from "../redux/reducers/userReducer";
import { getPageDetails } from "../utils/pageInfo";

const columns = [
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Registration Date",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Trial Code",
    dataIndex: "code",
    key: "code",
  },
  // {
  //   title: "Trial Status",
  //   dataIndex: "status",
  //   key: "status",
  // },
  {
    title: "Actions",
    dataIndex: "action",
    key: "action",
  },
];

const UserDash = () => {
  const { Title } = Typography;
  const [data, setData] = useState(null);
  const [pageDetails, setPageDetails] = useState({});
  const users = useSelector((state) => state.userReducer.users);
  const dispatch = useDispatch();
  console.log(users);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchUsers();
      dispatch(getUsers(data));
    };
    fetchData();
  }, []);

  useEffect(() => {
    let tempArr = [];

    const fetchUser = async () => {
      let getPageInfo = await getPageDetails(users);

      setPageDetails(getPageInfo);

      users?.docs?.map((user) => {
        tempArr.push({
          key: user?._id,
          email: user?.email,
          date: moment(user?.createdAt).format("MMM Do YY"),
          code: user?.code,
          // status: user?.code ? "Active" : "Inactive",
          action: (
            <Button type="primary" onClick={() => revokeAccess(user?._id)}>
              Revoke Access
            </Button>
          ),
        });
      });
      setData(tempArr);
    };

    fetchUser();
    // console.log(tempArr);
  }, [users]);

  const handleRevokeUser = (id) => {};

  return (
    <Layout active={"users"}>
      <div className="general-margin-padding">
        <Title className="general-title-h1">
          <AiOutlineUser style={{ marginRight: "10px" }} />
          Users
        </Title>
      </div>
      <TableComponent
        data={data}
        columns={columns}
        pageDetails={pageDetails}
        setPageDetails={setPageDetails}
      />
    </Layout>
  );
};

export default UserDash;
