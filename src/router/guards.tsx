import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import useAuth from "../utils/context/auth-context";

export function AuthGuard({ children }: { children: JSX.Element }) {
  const navigate = useNavigate();
  // const { auth } = useAuth();

  // useEffect(() => {
  //   if (!auth) {
  //     navigate("/auth/login");
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [auth]);

  // return auth ? children : <></>;
  return true ? children : <></>;
}
export function ReversGuard({ children }: { children: JSX.Element }) {
  const navigate = useNavigate();
  // const { auth } = useAuth();

  // useEffect(() => {
  //   if (auth) {
  //     navigate("/profile");
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [auth]);

  // return !auth ? children : <></>;
  return true ? children : <></>;
}
