import React, { useEffect,useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
const Logout = () => {
  let Navigate=useNavigate();
  const { dispatch} = useContext(UserContext);
  // using promises
  useEffect(() => {
    fetch("/logout", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => {
        dispatch({type:"USER",payload:false})
        Navigate("login", { replace: true });
        if (!res.status === 200) {
          const error = new Error(res.error);
          throw error;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <h1>logout</h1>
    </>
  );
};

export default Logout;
