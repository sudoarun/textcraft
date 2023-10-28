import React from "react";

export default function Home() {
  return (
    <div className="container-fluid vh-100 w-100 d-flex justify-content-center align-items-center">
      <div className="text-center">
        <h1>Text craft</h1>
        <span>A Simple Way to Share Text Online!</span>
        <div>
          <input placeholder="Enter Secret Name" />
        </div>
      </div>
    </div>
  );
}
