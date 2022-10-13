import { Button, Modal } from "antd";
import React from "react";

const ModalComponent = ({
  isModalVisible,
  showModal,
  handleCancel,
  handleOk,
  month,
  onSubmit,
}) => {
  // const [isModalVisible, setIsModalVisible] = useState(false);

  // const showModal = () => {
  //     setIsModalVisible(true);
  // };

  // const handleOk = () => {
  //     setIsModalVisible(false);
  // };

  // const handleCancel = () => {
  //     setIsModalVisible(false);
  // };
  // const durationTime = () => {
  //     onSubmit()
  //     handleOk()
  // }

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Submit
      </Button>
      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div style={{ fontSize: "20px", textAlign: "center" }}>
          `Sure you want to select ${month}`
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div
            onClick={onSubmit}
            style={{
              backgroundColor: "#1F1809",
              color: "white",
              padding: "10px",
              borderRadius: "5px",
              width: "100px",
              textAlign: "center",
            }}
          >
            Confrim
          </div>
          <div
            style={{
              backgroundColor: "#1F1809",
              color: "white",
              padding: "10px",
              borderRadius: "5px",
              width: "100px",
              textAlign: "center",
            }}
          >
            Reject
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ModalComponent;
