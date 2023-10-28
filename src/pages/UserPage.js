import React from "react";
import { useParams } from "react-router-dom";

const UserPage = () => {
  const params = useParams();
  const { name } = params;
  return (
    <div>
      <h1>{name}</h1>
    </div>
  );
};

export default UserPage;
