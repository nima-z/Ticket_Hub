import { useState } from "react";
import { useRouter } from "next/router";
//=======================================================
import useRequest from "../../hooks/useRequest";
//=======================================================

export default function auth() {
  const [isSigned, setIsSigned] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const { requestHandle, errors } = useRequest({
    url: `/api/users/${isSigned ? "signin" : "signup"}`,
    method: "post",
    body: {
      email,
      password,
    },
    onSuccess: () => {
      router.push("/");
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

  function changeForm() {
    setIsSigned((prev) => !prev);
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
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
      {isSigned ? (
        <div>
          <p>Not have an account?</p>
          <button type="button" onClick={changeForm}>
            Create account
          </button>
        </div>
      ) : (
        <div>
          <p>Already have an account?</p>
          <button type="button" onClick={changeForm}>
            Sign in
          </button>
        </div>
      )}
    </form>
  );
}
s;
