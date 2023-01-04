import React from "react";

export default function signup() {
  return (
    <form>
      <h1>Sign Up</h1>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input type="text" className="form-control" name="email" />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input type="password" className="form-control" name="password" />
      </div>
      <button className="btn btn-primary">Sign Up</button>
    </form>
  );
}
