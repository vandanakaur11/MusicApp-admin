import { Button, Typography } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { AiOutlineUserSwitch } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getTrialUsers, revokeAccess } from "../Api";
import TableComponent from "../components/TableComponent";
import Layout from "../layout/DashboarLayout";
import { getUserTrial } from "../redux/reducers/userReducer";
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
  {
    title: "Trial Status",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "Actions",
    dataIndex: "action",
    key: "action",
  },
];

const UserDashTwo = () => {
  const { Title } = Typography;
  const [data, setData] = useState(null);
  const [pageDetails, setPageDetails] = useState({});
  const users = useSelector((state) => state.userReducer.trialusers);
  console.log(users);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getTrialUsers();
      dispatch(getUserTrial(data));
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
          status: user?.trial ? (
            <span className="green-tag">Active</span>
          ) : (
            <span className="red-tag">Expired</span>
          ),
          action: (
            <Button
              disabled={!user.trial}
              type="primary"
              onClick={() => handleRevokeUser(user?._id)}
            >
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

  const handleRevokeUser = async (id) => {
    let res = await revokeAccess(id);
    const data = await getTrialUsers();
    dispatch(getUserTrial(data));
  };

  return (
    <Layout active={"trial-users"}>
      <div className="general-margin-padding">
        <Title className="general-title-h1">
          <AiOutlineUserSwitch style={{ marginRight: "10px" }} />
          Trial Users
        </Title>
      </div>
      <TableComponent data={data} columns={columns} pageDetails={pageDetails} />
    </Layout>
  );
};

export default UserDashTwo;
