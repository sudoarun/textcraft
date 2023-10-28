import React from "react";

export default function Home() {
  return (
    <div className="container-fluid vh-100 w-100 d-flex justify-content-center align-items-center">
      <div className="text-center">
        <h1 className="fw-bold">Text Craft</h1>
        <span>A Simple Way to Share Text Online!</span>
        <div>
          <div className="border border-dark mt-3">
            <span className="bg-black text-white py-2 px-3">TextCraft /</span>
            <input
              placeholder="Enter Secret Name"
              type="text"
              className="border-0 input-focus-none py-1"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
