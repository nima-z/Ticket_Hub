export default async function buildClient({ req }) {
  if (typeof window === "undefiend") {
    // so we are on the server
    return axios.create({
      baseURL: "http://ingress-nginx.ingress-nginx.svc.local",
      // req.headers includes host name (tickethub.dev) and cookie
      headers: req.headers,
    });
  } else {
    // so we are on the browser
    return axios.create({ baseURL: "/" });
  }
}
