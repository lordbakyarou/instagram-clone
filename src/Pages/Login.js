import React, { useEffect, useState } from "react";
import InstagramIcon from "../assets/instagramIcon";

import homePagePhoto from "../assets/home-page-photo.png";
import googlePlayLogo from "../assets/google-play-logo.png";
import microsoftLogo from "../assets/microsoft-store-logo.png";

import { FaFacebookSquare } from "react-icons/fa";

import { NavLink } from "react-router-dom";

import { FaEye, FaEyeSlash } from "react-icons/fa";

import { BsArrowClockwise } from "react-icons/bs";

import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import { setToken } from "../redux/features/token/tokenSlice";

import axios from "axios";

const URL = process.env.REACT_APP_API_URL;

// console.log(URL, "this is url");

const Login = () => {
  const navigate = useNavigate();

  const token = useSelector((state) => state.token);

  const dispatch = useDispatch();

  // console.log(token, "this is token");

  useEffect(() => {
    document.title = "Log in • Instagram";
  }, []);

  const [loginInUser, setLoginUser] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [userCreationError, setUserCreationError] = useState(null);

  function setUserProperties(e) {
    setLoginUser({ ...loginInUser, [e.target.name]: e.target.value });
  }

  function validateEmail(email) {
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
    return true;
  }

  function loginUser(e) {
    e.preventDefault();

    setIsLoading(true);

    axios
      .post(`${URL}/user/login`, {
        email: loginInUser.email.trim(),
        password: loginInUser.password.trim(),
      })
      .then((response) => {
        navigate("/dashboard");
        localStorage.setItem("token", response.data.accessToken);
        setIsLoading(false);
        dispatch(setToken(response.data.accessToken));
        // console.log(response);
      })
      .catch((err) => {
        console.log(err);

        setIsLoading(false);
        setUserCreationError(err.response.data);
      });

    // console.log("User Log in");
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    const getLocalToken = localStorage.getItem("token");
    // console.log(getLocalToken);

    if (getLocalToken != undefined) {
      // navigate("/dashboard");
    }
  }, []);

  return (
    <div className="w-screen flex justify-center  max-sm:scrollbar-hide max-sm:overflow-y-scroll h-screen items-center">
      <div className="flex relative">
        <div className="w-96 flex jusity-start max-md:hidden">
          <img
            src={homePagePhoto}
            alt="home-page-photo"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col gap-2.5 ">
          <div className="flex justify-center items-center border border-gray-300 flex-col p-10 gap-10">
            <InstagramIcon />

            <div className="flex flex-col gap-2.5 relative">
              <form onSubmit={loginUser} className=" flex flex-col gap-4">
                <div className="input-username">
                  <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    className="peer bg-gray-50 w-full h-10 p-2 text-xs rounded border focus:outline-none focus:border-gray-400 placeholder-transparent"
                    onChange={(e) => setUserProperties(e)}
                  />
                  <label
                    className="absolute
                 transition-all
                  left-2.5 -top-0
                   text-gray-400 
                   text-xxs peer-placeholder-shown:text-xs
                    peer-placeholder-shown:top-3
                    pointer-events-none"
                  >
                    Email
                  </label>
                </div>
                <div className="input-password  relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    name="password"
                    className="peer bg-gray-50 w-full h-10 p-2 text-xs rounded border focus:outline-none focus:border-gray-400 placeholder-transparent"
                    onChange={(e) => setUserProperties(e)}
                  />
                  <label
                    className="absolute
                 transition-all
                  left-2.5 -top-0.5
                   text-gray-400 
                   text-xxs peer-placeholder-shown:text-xs
                    peer-placeholder-shown:top-3
                    pointer-events-none"
                  >
                    Password
                  </label>

                  {loginInUser.password && (
                    <div
                      className="absolute top-2.5 right-2 text-lg text-gray-800 cursor-pointer"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </div>
                  )}
                </div>
                <div className="login-button">
                  <button
                    className={`w-80 cursor-pointer  h-10 border rounded-lg
                   text-white font-semibold  flex justify-center items-center
                    ${
                      validateEmail(loginInUser.email) &&
                      loginInUser.password.length >= 8
                        ? "bg-dark-blue"
                        : "bg-light-blue"
                    }
                   `}
                    type="submit"
                  >
                    {isLoading ? (
                      <BsArrowClockwise className="animate-spin text-xl " />
                    ) : (
                      "Log in"
                    )}
                  </button>
                </div>
              </form>

              <div className="flex  items-center justify-center">
                <div className="flex-1 border-t border-gray-300"></div>
                <p className="mx-4 text-gray-600 font-semibold text-gray-500">
                  OR
                </p>
                <div className="flex-1 border-t border-gray-300"></div>
              </div>

              <div className="flex justify-center items-center gap-2">
                <FaFacebookSquare className="text-blue-950" />
                <span className="text-blue-900 font-semibold cursor-pointer">
                  Log in with Facebook
                </span>
              </div>

              <div className="flex justify-center items-center cursor-pointer">
                <span>Forgot password?</span>
              </div>
              {userCreationError && (
                <div className="error">
                  <p className="flex justify-center items-center text-red-400">
                    {userCreationError}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="flex border border-gray-300 items-center justify-center p-5 gap-1">
            <span>Don't have an account?</span>
            <span className="text-dark-blue font-semibold cursor-pointer">
              <NavLink to="/signup">Sign up</NavLink>
            </span>
          </div>

          <div className="flex flex-col justify-center gap-5">
            <p className="flex  justify-center">Get the app.</p>
            <div className="flex item-center justify-center">
              <img
                className="cursor-pointer"
                src={googlePlayLogo}
                style={{
                  maxWidth: "100px",
                }}
              />
              <img
                className="cursor-pointer"
                src={microsoftLogo}
                style={{
                  maxWidth: "100px",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
