import { onValue, ref, set, update } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { database } from "../firebase/config";
import { message } from "antd";

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
    onValue(ref(db, "textCraft/" + name), (snapshot) => {
      const resData = snapshot.val();
      if (resData === null) {
        set(ref(db, "textCraft/" + name), {
          sharedText: "",
        }).catch(() => {
          const data = {
            type: "error",
            msg: "Something Wrong!!",
          };
          sendMsg(data);
        });
        const data = {
          type: "success",
          msg: "File Created!",
        };
        sendMsg(data);
        return;
      }
      setData(resData?.sharedText);
    });
  };
  const onFormChange = (e) => {
    const value = e.target.value;
    setData(value);
    setTimeout(() => {
      const res = update(ref(db, "textCraft/" + name), {
        sharedText: value,
      });
      const data = {
        type: "success",
        msg: "Data updated!",
      };
      res.catch(() => {
        const data = {
          type: "error",
          msg: "Something Wrong!!",
        };
        sendMsg(data);
      });
      sendMsg(data);
    }, 2000);
  };

  useEffect(() => {
    getDataBase();
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
