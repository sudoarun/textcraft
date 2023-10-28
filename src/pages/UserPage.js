import { onValue, ref, set } from "firebase/database";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { database } from "../firebase/config";

const UserPage = () => {
  const params = useParams();
  const { name } = params;
  const dataRef = ref(database);
  const createDataBase = () => {
    const db = database;
    set(ref(db, "textCraft/" + name), {
      sharedText: "",
    });
  };
  const getDataBase = () => {
    onValue(dataRef, (state) => {
      const data = state.val();
      console.log(data);
    });
  };
  useEffect(() => {
    getDataBase();
    createDataBase();
  }, []);
  return (
    <div>
      <h1>{name}</h1>
    </div>
  );
};

export default UserPage;
