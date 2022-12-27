import { Typography } from "antd";
import { useEffect, useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { shallowEqual, useSelector } from "react-redux";
import { publicAPI } from "./../constants";
import Layout from "./../layout/DashboarLayout";
import "./../styles/pages/subscription-plan.css";

const AllSubscriptionPlans = () => {
  const { language } = useSelector((state) => state.userReducer, shallowEqual);

  const { Title } = Typography;

  const [allSubscriptions, setAllSubscriptions] = useState([]);

  const getAllSubscriptions = async () => {
    try {
      const { data } = await publicAPI.get("/admin/subscriptions");

      if (data) {
        setAllSubscriptions(data?.data?.subscriptions);
      }
    } catch (err) {
      console.error("err >>>>>>>>>>", err);
    }
  };

  useEffect(() => {
    getAllSubscriptions();
  }, []);

  return (
    <Layout active={"all-subscriptions"}>
      <div className="general-margin-padding">
        <Title className="general-title-h1">
          <AiOutlineUser style={{ marginRight: "10px" }} />
          {language === "nl" ? "Alle abonnementen" : "All Subscription Plans"}
        </Title>
      </div>

      {allSubscriptions &&
        allSubscriptions.map((subscriptions) => (
          <div
            key={subscriptions._id}
            style={{
              display: "flex",
              flexDirection: "column",
              // alignItems: "center",
              marginLeft: 20,
              justifyContent: "center",
              padding: 20,
            }}
          >
            <div>
              <div>Code: {subscriptions.code}</div>
              <div>Duration: {subscriptions.duration}</div>
              <div>Price: {subscriptions.duration}</div>
              {subscriptions.songDetail.map((detail) => (
                <div key={detail._id}>
                  <div>Album: {detail.album}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
    </Layout>
  );
};

export default AllSubscriptionPlans;
