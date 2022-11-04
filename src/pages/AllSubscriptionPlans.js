import { Select, Typography } from "antd";
import React, { Fragment, useEffect, useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { publicAPI } from "../constants";
import Layout from "../layout/DashboarLayout";
import "./../styles/pages/subscription-plan.css";

/* const columns = [
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
]; */

const AllSubscriptionPlans = () => {
    const { Title } = Typography;

    const [allSubscriptions, setAllSubscriptions] = useState([]);
    // const []

    const getAllSubscriptions = async () => {
        try {
            const { data } = await publicAPI.get("/admin/subscriptions");

            // console.log("getAlbums data >>>>>>>>>>>>>", data);

            if (data) {
                console.log(data?.data?.subscriptions);
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
                    Subscription Plan
                </Title>
            </div>

            {allSubscriptions && allSubscriptions.map((subscriptions) => <div key={subscriptions._id}>{subscriptions.code}</div>)}
        </Layout>
    );
};

export default AllSubscriptionPlans;
