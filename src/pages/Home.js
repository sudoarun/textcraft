import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [secret, setSecret] = useState("");
  const router = useNavigate();
  const onSubmit = (e) => {
    e.preventDefault();
    if (secret === "") {
      return;
    }
    router(`/${secret}`);
  };
  const onInputChange = (e) => {
    const value = e.target.value;
    let regexValue = value.replace(/[^a-zA-Z0-9]/g, "");
    setSecret(regexValue.toLowerCase());
  };
  return (
    <div className="container-fluid vh-100 w-100 d-flex justify-content-center align-items-center position-relative">
      <div className="text-center">
        <h1 className="fw-bold">Text Craft</h1>
        <span>A Simple Way to Share Text Online!</span>
        <div>
          <form onSubmit={onSubmit}>
            <div className="border border-dark mt-3">
              <span className="bg-black text-white py-2 px-3">TextCraft /</span>
              <input
                placeholder="Enter Secret Name"
                type="text"
                value={secret}
                onChange={onInputChange}
                className="border-0 input-focus-none py-1"
              />
            </div>
            <button className="d-none" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
      <div className="position-absolute bottom-0">
        <span style={{ fontSize: 10 }}>Created by sudoarun, @ 2024</span>
      </div>
    </div>
  );
}
