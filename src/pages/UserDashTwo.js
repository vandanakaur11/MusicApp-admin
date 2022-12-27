import { Button, Typography } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { AiOutlineUserSwitch } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getTrialUsers, revokeAccess } from "./../Api";
import TableComponent from "./../components/TableComponent";
import Layout from "./../layout/DashboarLayout";
import { getUserTrial } from "./../redux/reducers/userReducer";
import { getPageDetails } from "./../utils/pageInfo";

const UserDashTwo = () => {
  const { Title } = Typography;

  const { trialusers: users, language } = useSelector(
    (state) => state.userReducer
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
    {
      title: language === "nl" ? "Proefstatus" : "Trial Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: language === "nl" ? "Acties" : "Actions",
      dataIndex: "action",
      key: "action",
    },
  ];

  const [data, setData] = useState(null);
  const [pageDetails, setPageDetails] = useState({});

  const fetchData = async () => {
    const data = await getTrialUsers();
    dispatch(getUserTrial(data));
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
          {language === "nl" ? "Proef gebruikers" : "Trial Users"}
        </Title>
      </div>
      <TableComponent data={data} columns={columns} pageDetails={pageDetails} />
    </Layout>
  );
};

export default UserDashTwo;
