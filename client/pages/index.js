import buildClient from "../lib/build-client";
//=======================================================
export default function Home({ currentUser }) {
  return currentUser ? (
    <h1>You are signed in</h1>
  ) : (
    <h1>You are not signed in</h1>
  );
}

Home.getInitialProps = async (context) => {
  const res = await buildClient(context).get("/api/users/currentuser");

  return res.data;
};
