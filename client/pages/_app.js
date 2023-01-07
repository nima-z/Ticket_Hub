import { Fragment } from "react";
//=======================================================
import buildClient from "../lib/build-client";
import Header from "../components/Header";
//=======================================================
import "bootstrap/dist/css/bootstrap.css";
//=======================================================

export default function MyApp({ Component, pageProps, currentUser }) {
  return (
    <Fragment>
      <Header currentUser={currentUser} />
      <Component {...pageProps} />
    </Fragment>
  );
}

MyApp.getInitialProps = async (appContext) => {
  // invoke getInitialProps at the APP level (before any pages), so we can use ctx in all pages.
  const res = await buildClient(appContext.ctx).get("/api/users/currentuser");

  let pageProps = {};
  // Check if the page has getInitialProps logic
  if (appContext.Component.getInitialProps) {
    // if it has, we pass the ctx to its props, otherwise it will be undefiend
    pageProps = await appContext.Component.getInitialProps(appContext.ctx);
  }

  return {
    pageProps,
    currentUser: res.data.currentUser,
  };
};
