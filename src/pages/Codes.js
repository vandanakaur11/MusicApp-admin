import { Typography } from "antd";
import React, { useEffect, useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { addCode, getAllGeneratedCodes } from "../Api";
import { publicAPI } from "../constants";
import Layout from "../layout/DashboarLayout";
import { getAllCodes } from "../redux/reducers/userReducer";
import { getPageDetails } from "../utils/pageInfo";

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

const Codes = () => {
  const dispatch = useDispatch();
  const codes = useSelector((state) => state.userReducer.allCodes);
  const users = useSelector((state) => state.userReducer.trialusers);
  const [pageDetails, setPageDetails] = useState({});
  const [generatedCodes, setGeneratedCodes] = useState([]);
  const [code, setCode] = useState("");

  console.log("all codes", codes);
  const { Title } = Typography;

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      let body = {
        code,
      };

      let res = await addCode(body);

      // if (res) {

      let res1 = await getAllGeneratedCodes();

      setGeneratedCodes(res1);

      dispatch(getAllCodes(res1));

      setCode("");

      console.log("get all codes", res1);

      // dispatch(getCodes(res))
      // }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(async () => {
    let getPageInfo = await getPageDetails(users);
    setPageDetails(getPageInfo);
    const res1 = await publicAPI.get(`/admin/codes`);
    setGeneratedCodes(res1.data.data.codes);
  }, [codes]);

  return (
    <Layout active={"codes"}>
      <div className="general-margin-padding">
        <Title className="general-title-h1">
          <AiOutlineUser style={{ marginRight: "10px" }} />
          Codes
        </Title>
      </div>
      <form onSubmit={(e) => onSubmit(e)}>
        <input
          placeholder="Enter Codes"
          onChange={(e) => setCode(e.target.value)}
          value={code}
          style={{
            marginLeft: "20px",
            height: "50px",
            width: "300px",
            padding: "0 10px",
          }}
        />
        <button
          disabled={code === "" ? true : false}
          style={{
            border: "none",
            backgroundColor: code === "" ? "gray" : "black",
            color: "#fff",
            height: "50px",
            cursor: code === "" ? "no-drop" : "pointer",
          }}
          type="submit"
        >
          Submit
        </button>
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
        <div style={{ fontSize: "16px" }}>Column</div>
      </div>

      {generatedCodes?.map((data, i) => (
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
          <div style={{ fontSize: "16px", color: "gray" }}>{data.code}</div>
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

export default Codes;
