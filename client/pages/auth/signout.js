import { useRouter } from "next/router";
import { useEffect } from "react";
//=======================================================
import useRequest from "../../hooks/useRequest";
//=======================================================

export default function signout() {
  const router = useRouter();

  const { requestHandle } = useRequest({
    url: "/api/users/signout",
    method: "post",
    body: {},
    onSuccess: () => {
      router.push("/");
    },
  });

  useEffect(() => {
    requestHandle();
  }, []);
}
