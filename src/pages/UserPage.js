import { onValue, ref, set, update } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { database } from "../firebase/config";

const UserPage = () => {
  const params = useParams();
  const { name } = params;
  const [data, setData] = useState("");
  const db = database;
  const createDataBase = () => {
    if (data === "") {
      console.log("set");
      set(ref(db, "textCraft/" + name), {
        sharedText: "",
      });
      return;
    }
    update(ref(db, "textCraft/" + name), {
      sharedText: data,
    });
  };
  const getDataBase = () => {
    onValue(ref(db, "textCraft/" + name), (snapshot) => {
      const resData = snapshot.val();

      if (resData === null) {
        console.log(resData);
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
    createDataBase();
  };
  useEffect(() => {
    getDataBase();
  }, []);

  return (
    <textarea value={data} onChange={onFormChange} className="w-100 vh-100" />
  );
};

export default UserPage;
