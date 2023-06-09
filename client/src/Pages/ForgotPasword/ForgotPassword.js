import React, { useState } from "react";
import "./ForgotPassword.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import OTP from "../OTP/Otp.js";
import Cookie from "universal-cookie";

export const userEmail = React.createContext();
function ForgotPassword() {
  const [userData, setuserData] = useState({
    user_email_for_Password: "",
  });
  const [response, setResponse] = useState();
  const [encrypted, setEncypted] = useState("");
  let cookie = new Cookie();
  let navigate = useNavigate();

  let url = "http://localhost:6500/user/ForNewPassword";
  let userSet = (e) => {
    e.preventDefault();
    axios({
      method: "post",
      url,
      data: userData,
    }).then((response) => {
      setResponse(response.data);
      setEncypted(response.data.Encrypt);
      // console.log(response.data);
      // cookie.set("email", response.data.email);
    });
  };
  let handleChange = (e) => {
    switch (e.target.name) {
      case "user_email_for_Password":
        setuserData((pre) => {
          return { user_email_for_Password: e.target.value };
        });
        break;
      default:
        break;
    }
  };
  if (response) {
    if (response.confirmation == false) {
      return (
        <div className="forSuccessPa ">
          <h1 className="thankYou">{response.message}</h1>
          <a className="thankYouAnch" href={`${response.redirect}`}>
            {response.redirectMessage}
          </a>
        </div>
      );
    } else {
      return encrypted ? (
        // <userEmail.Provider value={userData.user_email_for_Password}>
        //   <OTP />
        // </userEmail.Provider>
        navigate(`/forgotPass/${encrypted}`)
      ) : (
        <h2>laoding</h2>
      );
    }
  } else {
    return (
      <div className="container-fluid login_page">
        <div className="container py-5 d-md-flex justify-content-between login_container">
          <div className="main container  h-100   my-1 p-4 col-12 col-md-6">
            <p className="p1">IITR Ethiopian Students Union</p>
            <p className="p2 text-center">
              Don't have an account?
              <Link to="/signup" className="a3">
                {" "}
                Create a new account
              </Link>
            </p>
            <form onSubmit={userSet}>
              <input
                className="in1"
                type="email"
                name="user_email_for_Password"
                placeholder="Your Email"
                required
                autoComplete="new-password"
                onChange={handleChange}
              />
              <button className="btn1">Send OTP</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default ForgotPassword;
