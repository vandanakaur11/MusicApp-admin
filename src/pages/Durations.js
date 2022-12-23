import { Typography } from "antd";
import { useEffect, useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { addDuration, getAllGeneratedDurations } from "./../Api";
import { publicAPI } from "./../constants";
import Layout from "./../layout/DashboarLayout";
import { getAllDuration } from "./../redux/reducers/userReducer";

const Durations = () => {
  const { Title } = Typography;

  const codes = useSelector((state) => state.userReducer.allCodes);
  const users = useSelector((state) => state.userReducer.trialusers);

  const dispatch = useDispatch();

  const [pageDetails, setPageDetails] = useState({});
  const [generatedDurations, setGeneratedDurations] = useState([]);
  const [days, setDays] = useState("");
  const [durationCode, setDurationCode] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(async () => {
    const res = await publicAPI.get(`/admin/durations`);
    setDurationCode(res.data.data.durations);
    // console.log(res.data.data.durations);
    dispatch(getAllDuration(res.data.data.durations));
  }, [days]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const checkTime = (new Date().getTime() / 1000) * 60 * 60 * days;
  // console.log(checkTime);

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      let body = {
        duration: days,
      };

      const res = await addDuration(body);

      const res1 = await getAllGeneratedDurations();

      // if (res) {
      setGeneratedDurations(res1);

      dispatch(getAllDuration(res1));

      setDays("");

      // console.log("get all durations", res1);

      // dispatch(getCodes(res))
      // }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Layout active={"durations"}>
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
          max="365"
          type="number"
          onChange={(e) => setDays(e.target.value)}
          value={days}
          style={{
            marginLeft: "20px",
            height: "50px",
            width: "300px",
            padding: "0 10px",
          }}
        />
        <button
          disabled={days === "" ? true : false}
          style={{
            border: "none",
            backgroundColor: days === "" ? "gray" : "black",
            color: "#fff",
            height: "50px",
            cursor: days === "" ? "no-drop" : "pointer",
          }}
          type="submit"
        >
          Submit
        </button>
        {/* <input onChange={(e) => setDay(e.target.value)} value={day} style={{ marginLeft: "20px", height: "50px", width: "300px", padding: "0 10px" }} /> */}
        {/* {days !== "" ? (
          <ModalComponent
            isModalVisible={isModalVisible}
            showModal={showModal}
            handleOk={handleOk}
            handleCancel={handleCancel}
            days={days}
            onSubmit={onSubmit}
          />
        ) : (
          <ModalComponent />
        )} */}
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
    </Layout>
  );
};

export default Durations;
