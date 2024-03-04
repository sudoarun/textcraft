import { Modal, message } from "antd";
import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import OTPInput from "react-otp-input";
import { useNavigate } from "react-router-dom";
import { database } from "../firebase/config";

const ModalUI = ({
  isModalOpen,
  setIsModalOpen,
  docName,
  setProtectedSheet,
}) => {
  const [otp, setOtp] = useState("");
  const router = useNavigate();
  const [notification, contextApi] = message.useMessage();
  const sendMsg = (data) => {
    const { msg, type } = data;
    notification.open({
      type: type,
      content: msg,
    });
  };
  const docref = doc(database, "textCraft", docName);

  const handleOk = () => {
    updateDoc(docref, {
      password: otp,
    })
      .then(() => {
        const data = {
          type: "success",
          msg: "File Protected",
        };
        sendMsg(data);
        setIsModalOpen(false);
        localStorage.setItem("filePass", otp);
        setProtectedSheet(true);
      })
      .catch(() => {
        const data = {
          type: "error",
          msg: "Something went wrong!",
        };
        sendMsg(data);
      });
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    router("/");
  };
  return (
    <Modal
      title="Enter Password"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      width={360}
      centered
    >
      {contextApi}
      <div className="d-flex justify-content-center py-3">
        <OTPInput
          value={otp}
          onChange={setOtp}
          numInputs={4}
          inputStyle={{ width: "4rem", height: "4rem", margin: "2px" }}
          renderSeparator={<span>-</span>}
          renderInput={(props) => <input {...props} />}
        />
      </div>
    </Modal>
  );
};

export default ModalUI;
