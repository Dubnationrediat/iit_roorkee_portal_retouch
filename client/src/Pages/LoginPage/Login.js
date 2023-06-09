import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";
import "./Login.css";
import DashBoard from "../dashBordComponents/DashBoard.js";
import { getUser } from "../../components/Redux/Reducers/authSlice";
import { useDispatch, useSelector } from "react-redux";
//* to import icons
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";

import Ethiopia from "../../Images/countryFlags/Ethiopia_flag.png";
// *for cookie
const cookies = new Cookies();
// *--------
const Login = () => {
  const [type, setType] = useState("password");
  //* to change type attribute from 'password' to 'text' and vice versa
  const [icon, setIcon] = useState(eyeOff);
  const [response, setresponse] = useState();
  // user data
  const [userData, setUserData] = useState({
    user_email: "",
    user_password: "",
  });
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.auth);
  // console.log(isAuth);

  // to change the icon when clicked
  const HandleIconChange = () => {
    // event listenforPassworder function
    if (type === "password") {
      setIcon(eye);
      setType("text");
    } else {
      setIcon(eyeOff);
      setType("password");
    }
  };

  let navigate = useNavigate();

  let userSet = async (e) => {
    e.preventDefault();

    let url = `http://localhost:6500/user/tologin`;
    axios({
      method: "post",
      url: url,
      data: userData,
    })
      .then((data) => {
        setresponse(data.data);
        // console.log(data.data);
        let token = data.data.token;

        if (data.data.confirmation === "true") {
          cookies.set("token", token, {
            path: "/",
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
          });
          dispatch(getUser());
          navigate("/dashbord");
        }
      })
      .catch((err) => {
        // console.log(err)
      });
    //  dispatch(getUser())
  };

  // * handle change
  let handleChange = (e) => {
    switch (e.target.name) {
      case "user_email":
        setUserData((pre) => {
          return { ...pre, user_email: e.target.value };
        });
        break;
      case "user_password":
        setUserData((pre) => {
          return { ...pre, user_password: e.target.value };
        });
        break;
      default:
        break;
    }
  };

  if (response) {
    if (response?.confirmation === "false") {
      // return navigate("/dashboard");
      // } else {
      return (
        <div className="forSuccessPa">
          <h1 className="thankYou">{response.message}</h1>
        
          <a className="thankYouAnch" href={response.redirect}>
            {response.redirectMessage}
          </a>
        </div>
      );
    }
  } else {
    return (
      <div className="container me-5">
        <div className="container py-5 d-md-flex justify-content-between login_container">
          <div className="main col-12 col-md-6 me-md-2 p-5 d-flex flex-column justify-content-center">
            <p className="p1">IITR Ethiopian Students Union</p>
            <p className="p2 text-center">
              Don't have an account? <br />
              <Link to="/signup" className="a3">
                {" "}
                Create a new account
              </Link>
            </p>
            <form onSubmit={userSet}>
              <input
                className="in1"
                type="email"
                name="user_email"
                placeholder="Your Email"
                required
                autoComplete="new-password"
                onChange={handleChange}
              />
              <input
                className="in1"
                type={type}
                name="user_password"
                placeholder="Your Password"
                required
                autoComplete="new-password"
                onChange={handleChange}
              />
              <span className="showHide1">
                <Icon icon={icon} size={20} onClick={HandleIconChange} className="iconss"/>
              </span>
              <button className="btn1">submit</button>
            </form>

            <Link to="/forgotPass" className="a3 a1">
              Forgot password ?
            </Link> 
            <Link to="/signup" className="a3 a1 my-3">
            Click Here To Create an Account?
            </Link>
            <Link to="/developer" className="a22">
                Word From The Developers
              </Link>
          </div>
          <div className="sideNote1 container col-12 col-md-5 ms-md-2 mt-sm-4 mt-md-0 ">
              <p className="forTitle">David Rocastle Once Said...</p>
              <h1 className="title">Remember Who You Are, What you Are and Who you Represent!</h1>
               <img  src={Ethiopia} alt="" />
            </div>

        </div>
      </div>
    );
  }
};

export default Login;
