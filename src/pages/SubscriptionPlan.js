import { Select, Typography } from "antd";
import React, { Fragment, useEffect, useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { publicAPI } from "../constants";
import Layout from "../layout/DashboarLayout";
import "./../styles/pages/subscription-plan.css";
import Swal from "sweetalert2";

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

const SubscriptionPlan = () => {
  let emp_list = ["test"];

  const dispatch = useDispatch();

  const codes = useSelector((state) => state.userReducer.allCodes);
  const users = useSelector((state) => state.userReducer.trialusers);

  const { Option } = Select;

  const [pageDetails, setPageDetails] = useState({});
  const [codeList, setCodeList] = useState([]);
  const [code, setCode] = useState("");
  const [durationList, setDurationList] = useState([]);
  const [duration, setDuration] = useState("");
  const [albumList, setAlbumList] = useState([]);
  const [album, setAlbum] = useState("");
  const [songList, setSongList] = useState([]);
  const [selectedSongObj, setSelectedSongObj] = useState([]);
  const [price, setPrice] = useState("");
  const [month, setMonth] = useState("");
  const [durationCode, setDurationCode] = useState([]);
  // const [subStructure, setSubStructure] = useState([])

  /* const subStructure = {
    codeID: codeID,
    durationID,
    songDetail: songID,
    price,
  }; */

  // console.log("codeList====>",codeList)
  // console.log("DurationList====>",durationList)

  // console.log("State-Code===>", code);
  // console.log("State-duration===>", duration);
  // console.log("State-SongDetails===>", selectedSongObj);
  // console.log("State-AlbumName===>", album);
  // console.log("State-Price===>", price);

  // console.log(">>>>>>>>>>>", songID)
  // console.log(">>>>>>>>>>>>>", subStructure);
  /* const [code, setCode] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [handleAlbum, setHandleAlbum] = useState("");
  const [handleSong, setHandleSong] = useState("");
  const [handleDuration, setHandleDuration] = useState("");
  const [handleAlbumSong, setHandleAlbumSong] = useState([]);
//   console.log(">>>>>>>>", durationCode);
//   console.log(handleAlbum); */

  //////////////////////////////////
  const [inputList, setInputList] = useState([
    { albumID: "", songsID: selectedSongObj },
  ]);

  const filteredOptions = selectedSongObj.filter(
    (o) => !selectedSongObj.includes(o)
  );

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { albumID: "", songsID: [] }]);

    // console.log("inputList >>>>>>>>", inputList);
  };

  //////////////////////////////////

  // console.log("all codes", codes);

  const { Title } = Typography;

  const getCodes = async () => {
    try {
      const { data } = await publicAPI.get("/admin/codes");

      // console.log("getCodes data >>>>>>>>>>>>>", data);

      if (data) {
        setCodeList(data.data.codes);
        getDurations();
      }
    } catch (err) {
      console.error("err >>>>>>>>>>", err);
    }
  };

  const getDurations = async () => {
    try {
      const { data } = await publicAPI.get("/admin/durations");

      // console.log("getDurations data >>>>>>>>>>>>>", data);

      if (data) {
        setDurationList(data.data.durations);
        getAlbums();
      }
    } catch (err) {
      console.error("err >>>>>>>>>>", err);
    }
  };

  const getAlbums = async () => {
    try {
      const { data } = await publicAPI.get("/api/albums");

      // console.log("getAlbums data >>>>>>>>>>>>>", data);

      if (data) {
        setAlbumList([...data]);
      }
    } catch (err) {
      console.error("err >>>>>>>>>>", err);
    }
  };

  const getSongs = async (e) => {
    setAlbum(e.target.value);

    try {
      const { data } = await publicAPI.get(`/api/songs/${e.target.value}`);

      // console.log("getSongs data >>>>>>>>>>>>>", data);

      if (data) {
        setSongList([...data[0]]);
      }
    } catch (err) {
      // console.error("err >>>>>>>>>>", err);
    }
  };

  // console.log(songList);

  const handleSongChange = (arrOfIds) => {
    // console.log("id >>>>>>>>>>>", arrOfIds);
    // console.log("songList >>>>>>>>>>", songList);

    /* console.log(
      "Array.isArray(songList) >>>>>>>>>>>>>>>>>",
      Array.isArray(songList)
    ); */

    let arr = [];

    for (const val of arrOfIds) {
      arr.push(songList.find((obj) => obj._id === val));
    }

    arr.forEach((obj) => {
      setSelectedSongObj((oldObject) => [...oldObject, obj]);
    });

    // console.log("arr >>>>>>>>>>>>>>", arr);
    // console.log("selectedSongObj >>>>>>>>>>>>>>", selectedSongObj);
  };

  const checkTime = (new Date().getTime() / 1000) * 60 * 60 * month;
  // console.log(checkTime);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        code: code,
        duration: duration,
        songDetail: [
          {
            album: album,
            // songs: [...selectedSongObj],
            songs: [selectedSongObj],
          },
        ],
        price: price,
        // albumID: adad,
        // songID,
      };
      // console.log("ONSUBMIT===>", payload);

      const { data } = await publicAPI.post("/admin/subscriptions", payload);

      if (data) {
        // console.log("onSubmit-Posted-Data >>>>>>>>", data);

        Swal.fire("Subscription Created", "", "success");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCodes();
  }, []);

  return (
    <Layout active={"subscriptions"}>
      <div className="general-margin-padding">
        <Title className="general-title-h1">
          <AiOutlineUser style={{ marginRight: "10px" }} />
          Subscription Plan
        </Title>
      </div>

      <div className="subscription-plan">
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <select
              name="codes"
              onChange={(e) => setCode(e.target.value)}
              value={code}
            >
              <option>Select Codes</option>
              {codeList.map((data, index) => (
                <option key={index} value={data?.code}>
                  {data.code}
                </option>
              ))}
            </select>
          </div>

          <div className="form-control">
            <select
              name="duration"
              onChange={(e) => setDuration(e.target.value)}
              value={duration}
            >
              <option>Select Duration</option>
              {durationList.map((data, index) => (
                <option key={index} value={data?.duration}>
                  {data.duration} {data.duration > 1 ? "Days" : "Day"}
                </option>
              ))}
            </select>
          </div>

          <div>
            {/* <div className="form-control">
              <select name="album" onChange={(e) => getSongs(e)} value={albumID}>
                <option>Select Album</option>
                {albumList.map((data, index) => (
                  <option key={index} value={data.Album_Name}>
                    {data._id}
                  </option>
                ))}
              </select>
            </div> */}

            {/* <div className="form-control">
              <Select
                mode="multiple"
                style={{
                  width: "100%",
                  height: "unset",
                }}
                placeholder="Select Songs"
                onChange={(id) => setSongID(id)}
                optionLabelProp="label"
              >
                {songList.map((data, index) => (
                  <Option key={index} value={data._id} label={data.Song_Name}>
                    <div className="demo-option-label-item">{data.Song_Name}</div>
                  </Option>
                ))}
              </Select>
            </div> */}
          </div>

          {/* ////////////////////////////////// */}

          {inputList.map((x, i) => {
            return (
              <Fragment key={i}>
                <div className="form-control">
                  <select
                    name="album"
                    onChange={(e) => getSongs(e)}
                    value={album}
                  >
                    <option>Select Album</option>
                    {albumList.map((data, index) => (
                      <option key={index} value={data.Album_Name}>
                        {!emp_list.includes(data.Album_Name) && data.Album_Name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-control">
                  <Select
                    mode="tags"
                    style={{
                      width: "100%",
                      height: "unset",
                    }}
                    placeholder="Select Songs"
                    onChange={(id) => handleSongChange(id)}
                    optionLabelProp="label"
                  >
                    {songList.map((data, index) => (
                      <Option
                        key={index}
                        value={data._id}
                        label={data.Song_Name}
                      >
                        <div className="demo-option-label-item">
                          {data.Song_Name}
                        </div>
                      </Option>
                    ))}
                  </Select>
                </div>

                <div className="form-control">
                  {inputList.length !== 1 && (
                    <button
                      type="button"
                      className="mr10"
                      onClick={() => handleRemoveClick(i)}
                    >
                      Remove
                    </button>
                  )}

                  {inputList.length - 1 === i && (
                    <button onClick={handleAddClick}>Add more album</button>
                  )}
                </div>
              </Fragment>
            );
          })}

          {/* /////////////////////////////////////// */}

          {/* <Select
            mode="multiple"
            placeholder="Inserted are removed"
            value={selectedSongObj}
            onChange={setSelectedSongObj}
            style={{
              width: "100%",
            }}
          >
            {filteredOptions.map((item) => (
              <Select.Option key={item} value={item}>
                {item}
              </Select.Option>
            ))}
          </Select> */}

          {/* <div className="form-control">
            <button type="button">Add more album</button>
          </div> */}

          <div className="form-control">
            <input
              type="number"
              name="price"
              min="0"
              placeholder="Enter Price"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
            />
          </div>

          <div className="form-control">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default SubscriptionPlan;
