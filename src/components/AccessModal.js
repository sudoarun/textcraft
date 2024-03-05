import { Modal, message } from "antd";
import React, { useState } from "react";
import OTPInput from "react-otp-input";

const AccessModal = ({ access, setAccess, setFilecrypt, docPassword }) => {
  const [otp, setOtp] = useState("");
  const [notification, contextApi] = message.useMessage();
  const sendMsg = (data) => {
    const { msg, type } = data;
    notification.open({
      type: type,
      content: msg,
    });
  };
  const onCancel = () => {
    setAccess(false);
    setOtp("");
  };
  const onSubmit = () => {
    if (otp === "") {
      return;
    }
    if (otp === docPassword) {
      localStorage.setItem("filePass", otp);
      setOtp("");
      setAccess(false);
      setFilecrypt(false);
      const data = {
        type: "success",
        msg: "Access Approved!",
      };
      sendMsg(data);
      return;
    }
    const data = {
      type: "error",
      msg: "Oops! Wrong password!",
    };
    sendMsg(data);
    setOtp("");
  };
  return (
    <>
      {contextApi}
      <Modal
        title="Enter Password"
        centered
        width={360}
        onCancel={onCancel}
        onOk={onSubmit}
        open={access}
      >
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
    </>
  );
};

export default AccessModal;
