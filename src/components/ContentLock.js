import React, { useState } from "react";
import AccessModal from "./AccessModal";

const ContentLock = ({ setFilecrypt, docPassword }) => {
  const [access, setAccess] = useState(false);

  return (
    <div className="vh-100 vw-100 d-flex justify-content-center align-items-center">
      <input
        type="checkbox"
        id="lock"
        onClick={() => setAccess(true)}
        defaultChecked={access ? true : false}
      />
      <label htmlFor="lock" className="lock-label">
        <span className="lock-wrapper">
          <span className="shackle"></span>
          <svg
            className="lock-body"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0 5C0 2.23858 2.23858 0 5 0H23C25.7614 0 28 2.23858 28 5V23C28 25.7614 25.7614 28 23 28H5C2.23858 28 0 25.7614 0 23V5ZM16 13.2361C16.6137 12.6868 17 11.8885 17 11C17 9.34315 15.6569 8 14 8C12.3431 8 11 9.34315 11 11C11 11.8885 11.3863 12.6868 12 13.2361V18C12 19.1046 12.8954 20 14 20C15.1046 20 16 19.1046 16 18V13.2361Z"
              fill="white"
            ></path>
          </svg>
        </span>
      </label>
      <AccessModal
        access={access}
        setAccess={setAccess}
        key={"access modal"}
        setFilecrypt={setFilecrypt}
        docPassword={docPassword}
      />
    </div>
  );
};

export default ContentLock;
