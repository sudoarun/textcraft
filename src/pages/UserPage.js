import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { database } from "../firebase/config";
import { Dropdown, message } from "antd";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import ModalUI from "../components/ModalUI";
import ContentLock from "../components/ContentLock";

const UserPage = () => {
  const params = useParams();
  const { name } = params;
  const [data, setData] = useState("");
  const [docPassword, setDocPassword] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [protectedSheet, setProtectedSheet] = useState(false);
  const [filecrypt, setFilecrypt] = useState(false);
  const [notification, contextApi] = message.useMessage();
  const db = database;
  const sendMsg = (data) => {
    const { msg, type } = data;
    notification.open({
      type: type,
      content: msg,
    });
  };
  const unlock = () => {
    let filePass = localStorage.getItem("filePass");
    if (filePass == null || filePass !== docPassword) {
      const data = {
        type: "error",
        msg: "oops! You are not the author of this Doc",
      };
      sendMsg(data);
      return;
    }
    const docref = doc(db, "textCraft", name);
    updateDoc(docref, {
      password: "",
    })
      .then(() => {
        const data = {
          type: "success",
          msg: "Protection Removed!",
        };
        sendMsg(data);
        setIsModalOpen(false);
        setProtectedSheet(false);
        localStorage.removeItem("filePass");
      })
      .catch(() => {
        const data = {
          type: "error",
          msg: "Something went wrong!",
        };
        sendMsg(data);
      });
  };
  const items = [
    {
      key: "2",
      label: (
        <a
          target="_blank"
          onClick={() =>
            navigator.share({
              text: "TextCraft | Document ",
              title: "TextCraft - A simple text share application",
              url: "",
            })
          }
        >
          Share
        </a>
      ),
    },
    {
      key: "1",
      label: (
        <a
          target="_blank"
          onClick={() => (protectedSheet ? unlock() : setIsModalOpen(true))}
        >
          {protectedSheet ? "Unlock" : "Lock"} this Sheet
        </a>
      ),
    },

    {
      type: "divider",
    },
    {
      key: "3",
      label: (
        <a target="_blank" href="https://github.com/sudoarun/textcraft">
          Github
        </a>
      ),
    },
  ];
  const getDataBase = () => {
    getDoc(doc(db, "textCraft", name)).then((res) => {
      if (res.data() === undefined) {
        setDoc(doc(db, "textCraft", name), {
          sharedText: "",
          password: "",
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
      const { sharedText, password } = res?.data();
      const data = {
        type: "success",
        msg: "File Loaded",
      };
      sendMsg(data);
      setData(sharedText);
      setDocPassword(password);
      setProtectedSheet(password ? true : false);
      password ? setFilecrypt(true) : setFilecrypt(false);
    });
  };
  const onFormChange = (e) => {
    const value = e.target.value;
    setData(value);

    let intervel = setInterval(() => {
      const res = updateDoc(doc(db, "textCraft", name), {
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
    <div className="position-relative">
      {contextApi}
      {!filecrypt ? (
        <div>
          <textarea
            value={data}
            onChange={onFormChange}
            placeholder="Type Your Text Here ..."
            className="w-100 border-0 input-focus-none "
            style={{ height: "98vh" }}
          />

          <div className="background position-absolute ">
            <Dropdown
              menu={{
                items,
              }}
              trigger={["click"]}
            >
              <a onClick={(e) => e.preventDefault()}>
                <button className="menu__icon">
                  <span></span>
                  <span></span>
                  <span></span>
                </button>
              </a>
            </Dropdown>
          </div>
          <ModalUI
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            key={"Password Modal"}
            docName={name}
            docPass={docPassword}
            setDocPassword={setDocPassword}
          />
        </div>
      ) : (
        <div>
          <ContentLock setFilecrypt={setFilecrypt} docPassword={docPassword} />
        </div>
      )}
    </div>
  );
};

export default UserPage;
