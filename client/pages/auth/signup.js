import React, { useState } from "react";
import useRequest from "../../hooks/useRequest";

export default function signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { requestHandle, errors } = useRequest({
    url: "/api/users/signup",
    method: "post",
    body: {
      email,
      password,
    },
  });

  function emailHandle(e) {
    setEmail(e.target.value);
  }
  function passwordHandle(e) {
    setPassword(e.target.value);
  }

  async function onSubmit(event) {
    event.preventDefault();
    requestHandle();
  }
  return (
    <form onSubmit={onSubmit} style={{ width: "600px", margin: "100px auto" }}>
      <h1>Sign Up</h1>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="text"
          className="form-control"
          name="email"
          value={email}
          onChange={emailHandle}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          className="form-control"
          name="password"
          value={password}
          onChange={passwordHandle}
        />
      </div>
      {errors}
      <button className="btn btn-primary">Sign Up</button>
    </form>
  );
}
