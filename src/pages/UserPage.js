import { onValue, ref, set, update } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { database } from "../firebase/config";

const UserPage = () => {
  const params = useParams();
  const { name } = params;
  const [data, setData] = useState("");
  const db = database;

  const getDataBase = () => {
    onValue(ref(db, "textCraft/" + name), (snapshot) => {
      const resData = snapshot.val();
      if (resData === null) {
        set(ref(db, "textCraft/" + name), {
          sharedText: "",
        });
        return;
      }
      setData(resData?.sharedText);
    });
  };
  const onFormChange = (e) => {
    const value = e.target.value;
    setData(value);
    setTimeout(() => {
      update(ref(db, "textCraft/" + name), {
        sharedText: value,
      });
    }, 2000);
  };

  useEffect(() => {
    getDataBase();
  }, []);

  return (
    <textarea
      value={data}
      onChange={onFormChange}
      placeholder="Type Your Text Here ..."
      className="w-100 border-0 input-focus-none"
      style={{ height: "98vh" }}
    />
  );
};

export default UserPage;
