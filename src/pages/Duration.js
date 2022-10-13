import { Typography } from "antd";
import React, { useEffect, useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { addDuration } from "../Api";
import ModalComponent from "../components/ModalComponent";
import { publicAPI } from "../constants";
import Layout from "../layout/DashboarLayout";
import { durationCodesGenerated } from "../redux/reducers/userReducer";

const columns = [
  {
    title: "ID",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Codes",
    dataIndex: "date",
    key: "date",
  },
];

const Duration = () => {
  const dispatch = useDispatch();
  const codes = useSelector((state) => state.userReducer.allCodes);
  const users = useSelector((state) => state.userReducer.trialusers);
  const [pageDetails, setPageDetails] = useState({});
  const [generatedCodes, setGeneratedCodes] = useState([]);

  console.log("all codes", codes);
  const { Title } = Typography;
  // const [code, setCode] = useState("")
  const [month, setMonth] = useState("");
  const [durationCode, setDurationCode] = useState([]);
  console.log(">>>>>>>>", durationCode);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  var checkTime = (new Date().getTime() / 1000) * 60 * 60 * month;
  console.log(checkTime);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      let body = {
        duration: month,
      };

      // if (res) {
      let res1 = await addDuration(body);
      console.log("duration", res1);
      // setGeneratedCodes(res1)
      // dispatch(getAllCodes(res1))
      // setCode("")
      console.log("get all codes", res1);
      // dispatch(getCodes(res))
      // }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(async () => {
    const res = await publicAPI.get(`/admin/durations`);
    setDurationCode(res.data.data.durations);
    console.log(res.data.data.durations);
    dispatch(durationCodesGenerated(res.data.data.durations));
  }, []);

  return (
    <Layout active={"generate-codes"}>
      <div className="general-margin-padding">
        <Title className="general-title-h1">
          <AiOutlineUser style={{ marginRight: "10px" }} />
          Duration
        </Title>
      </div>

      <form onSubmit={(e) => onSubmit(e)} style={{ display: "flex" }}>
        <input
          placeholder="Enter Days"
          min="0"
          max="12"
          type="number"
          onChange={(e) => setMonth(e.target.value)}
          value={month}
          style={{
            marginLeft: "20px",
            height: "50px",
            width: "300px",
            padding: "0 10px",
          }}
        />
        {/* <input onChange={(e) => setDay(e.target.value)} value={day} style={{ marginLeft: "20px", height: "50px", width: "300px", padding: "0 10px" }} /> */}
        {month !== "" ? (
          <ModalComponent
            isModalVisible={isModalVisible}
            showModal={showModal}
            handleOk={handleOk}
            handleCancel={handleCancel}
            month={month}
            onSubmit={onSubmit}
          />
        ) : (
          <ModalComponent />
        )}
      </form>

      <div
        style={{
          display: "flex",
          margin: "10px 20px",
          backgroundColor: "#FAFAFA",
          alignItems: "center",
          padding: "20px 10px",
        }}
      >
        <div style={{ marginRight: "30px", fontSize: "16px", width: "50%" }}>
          S.No
        </div>
        <div style={{ fontSize: "16px" }}>Duration</div>
      </div>
      {durationCode?.map((data, i) => (
        <div
          style={{
            border: "1px solid #FAFAFA",
            padding: "20px 10px",
            backgroundColor: "#fff",
            margin: "0px 20px",
            display: "flex",
            alignItems: "center",
          }}
          key={i}
        >
          <div
            style={{
              marginRight: "30px",
              fontSize: "16px",
              width: "50%",
              color: "gray",
            }}
          >
            {i + 1}
          </div>
          <div style={{ fontSize: "16px", color: "gray" }}>
            {data.duration} {data.duration > 1 ? "Days" : "Day"}
          </div>
        </div>
      ))}

      {/* <TableComponent
        data={codes}
        columns={columns}
        pageDetails={pageDetails}
      /> */}
    </Layout>
  );
};

export default Duration;
