import axios from "axios";
export default function Home({ currentUser }) {
  console.log(currentUser);
  return <div>Wellcome Home </div>;
}

Home.getInitialProps = async () => {
  if (typeof window === "undefiend") {
    // so we are on the server
  } else {
    //so we are on the browser
  }
  return {};
};
