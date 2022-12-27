import { Button, Typography } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { fetchUsers, revokeAccess } from "./../Api";
import TableComponent from "./../components/TableComponent";
import Layout from "./../layout/DashboarLayout";
import { getUsers } from "./../redux/reducers/userReducer";
import { getPageDetails } from "./../utils/pageInfo";

const UserDash = () => {
  const { Title } = Typography;

  const { users, language } = useSelector(
    (state) => state.userReducer,
    shallowEqual
  );

  const dispatch = useDispatch();

  const columns = [
    {
      title: language === "nl" ? "E-mail" : "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: language === "nl" ? "Registratie datum" : "Registration Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: language === "nl" ? "Proefcode" : "Trial Code",
      dataIndex: "code",
      key: "code",
    },
    // {
    //   title: language === "nl" ? "Proefstatus" : "Trial Status",
    //   dataIndex: "status",
    //   key: "status",
    // },
    {
      title: language === "nl" ? "Acties" : "Actions",
      dataIndex: "action",
      key: "action",
    },
  ];

  const [data, setData] = useState(null);
  const [pageDetails, setPageDetails] = useState({});

  const fetchData = async () => {
    const data = await fetchUsers();
    dispatch(getUsers(data));
  };

  useEffect(() => {
    fetchData();
  }, []);

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
            {/* {language === "nl" ? "Toegang intrekken" : "Revoke Access"} */}
            Revoke Access
          </Button>
        ),
      });
    });

    setData(tempArr);
  };

  useEffect(() => {
    fetchUser();
  }, [users]);

  return (
    <Layout active={"users"}>
      <div className="general-margin-padding">
        <Title className="general-title-h1">
          <AiOutlineUser style={{ marginRight: "10px" }} />
          {language === "nl" ? "Gebruikers" : "Users"}
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
