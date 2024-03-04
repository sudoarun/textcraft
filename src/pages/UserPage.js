import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { database } from "../firebase/config";
import { message } from "antd";
import { doc, getDoc, setDoc } from "firebase/firestore";

const UserPage = () => {
  const params = useParams();
  const { name } = params;
  const [data, setData] = useState("");
  const [notification, contextApi] = message.useMessage();
  const db = database;
  const sendMsg = (data) => {
    const { msg, type } = data;
    notification.open({
      type: type,
      content: msg,
    });
  };

  const getDataBase = () => {
    getDoc(doc(db, "textCraft", name)).then((res) => {
      const valid = res?.data();
      if (valid === undefined) {
        setDoc(doc(db, "textCraft", name), {
          sharedText: "",
        })
          .then(() => {
            const data = {
              type: "success",
              msg: "File Created!",
            };
            sendMsg(data);
          })
          .catch(() => {
            const data = {
              type: "error",
              msg: "Something Wrong!!",
            };
            sendMsg(data);
          });
        return;
      }
      const data = {
        type: "success",
        msg: "File Loaded",
      };
      sendMsg(data);
      setData(valid.sharedText);
    });
  };
  const onFormChange = (e) => {
    const value = e.target.value;
    setData(value);

    let intervel = setInterval(() => {
      const res = setDoc(doc(db, "textCraft", name), {
        sharedText: value,
      });
      res.catch(() => {
        const msg = {
          type: "error",
          msg: "Something Wrong!!",
        };
        sendMsg(msg);
      });
      clearTimeout(intervel);
    }, 3000);
  };

  useEffect(() => {
    getDataBase();
    //eslint-disable-next-line
  }, []);

  return (
    <>
      {contextApi}
      <textarea
        value={data}
        onChange={onFormChange}
        placeholder="Type Your Text Here ..."
        className="w-100 border-0 input-focus-none"
        style={{ height: "98vh" }}
      />
    </>
  );
};

export default UserPage;
