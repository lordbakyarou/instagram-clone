import React, { useState, useEffect } from "react";
import InstagramIcon from "../assets/instagramIcon";
import homePagePhoto1 from "../assets/screenshot1-2x.png";

import homePagePhoto from "../assets/home-page-photo.png";
import googlePlayLogo from "../assets/google-play-logo.png";
import microsoftLogo from "../assets/microsoft-store-logo.png";

import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import axios from "axios";

//react-icons
import { RxCrossCircled } from "react-icons/rx";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { BsArrowClockwise } from "react-icons/bs";

import { useSelector, useDispatch } from "react-redux";

import { setToken } from "../redux/features/token/tokenSlice";

const URL = process.env.REACT_APP_API_URL;

const defaulProfile =
  "https://res.cloudinary.com/dj725mr8c/image/upload/v1705771318/default_profile.jpg";

const SignUp = () => {
  const navigate = useNavigate();

  const token = useSelector((state) => state.token);

  const dispatch = useDispatch();

  const [image, setImage] = useState(null);

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    document.title = "Sign up • Instagram";
  }, []);

  // console.log(user);

  const [isDarkBlue, setIsDarkBlue] = useState(false);
  const [userCreationError, setUserCreationError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function uploadPost(e) {
    e.preventDefault();

    const data = new FormData();
    data.append("file", image);

    data.append("upload_preset", "instagram");
    data.append("cloud_name", "dj725mr8c");
    // console.log(data, "this data");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dj725mr8c/image/upload",

        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // console.log(response.data, "cloudinary");

      createUser(response.data.url);
    } catch (err) {
      console.log(err);
      createUser(defaulProfile);
    }
  }

  function setUserProperties(e) {
    setUser({ ...user, [e.target.name]: e.target.value });

    if (
      validateEmail(user.email) &&
      user.password.length >= 8 &&
      user.username &&
      user.password == user.confirmPassword
    ) {
      setIsDarkBlue(true);
    } else {
      setIsDarkBlue(false);
    }
  }

  function createUser(imageData) {
    // e.preventDefault();
    // console.log(imageData, "this is image data");
    // Validation checks
    setIsLoading(true);

    axios
      .post(`${URL}/user/new/user`, {
        username: user.username,
        fullname: user.name,
        email: user.email,
        password: user.password,
        profile: imageData || defaulProfile,
        description: "",
      })
      .then((response) => {
        // console.log(response.data, "this is response.data");
        dispatch(setToken(response.data.accessToken));
        setIsLoading(false);

        navigate("/dashboard");
      })
      .catch((err) => {
        console.log(err, "print error");
        setUserCreationError(err.response.data);
        setIsLoading(false);
      });

    // console.log("createUser");
  }

  function validateEmail(email) {
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
    return true;
  }

  function validatePassword(password) {
    if (password) {
      return password.length >= 8;
    }
    return true;
  }

  const [showPassword, setShowPassword] = useState(false);

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
    <div className="w-screen flex justify-center h-screen  max-sm:scrollbar-hide max-sm:overflow-y-scroll h-screen text-sm  pt-10 pb-10 ">
      <div
        className="flex flex-col  gap-2.5 "
        style={{
          width: "450px",
          //   height: "500px",
        }}
      >
        <div className="flex justify-center items-center border border-gray-300 flex-col p-10 gap-5">
          <InstagramIcon />
          <p className="flex justify-center items-center text-gray-500 font-semibold text-center">
            Sign up to see photos and videos from your friends.
          </p>

          <div className="login-button-facebook">
            <button className="w-80 h-10 border rounded-lg  bg-dark-blue text-white font-semibold cursor-pointer flex justify-center items-center gap-2.5">
              <FaFacebookSquare className="text-white" />
              <span className="text-white font-semibold cursor-pointer">
                Log in with Facebook
              </span>
            </button>
          </div>

          <div className="flex flex-col gap-2.5">
            <div className="flex items-center justify-center pb-5">
              <div className="flex-1 border-t border-gray-300"></div>
              <p className="text-center mx-4 text-gray-600 font-semibold text-gray-500">
                OR
              </p>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>

            <form onSubmit={uploadPost} className=" flex flex-col gap-4">
              <div className="input-email relative">
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
                  left-2.5 -top-0.5
                   text-gray-400 
                   text-xxs peer-placeholder-shown:text-xs
                    peer-placeholder-shown:top-3
                    pointer-events-none"
                >
                  Email
                </label>
                {!validateEmail(user.email) && (
                  <RxCrossCircled className="absolute top-2 right-2 text-red-500 text-2xl  " />
                )}
              </div>
              <div className="input-confirm-password relative">
                <input
                  type="text"
                  placeholder="Full Name"
                  name="name"
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
                  Full Name
                </label>
              </div>
              <div className="input-username  relative">
                <input
                  type="text"
                  placeholder="Username"
                  name="username"
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
                  Username
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
                {!validatePassword(user.password) && (
                  <RxCrossCircled className="absolute top-2 right-10 text-red-500 text-2xl  " />
                )}

                {user.password && (
                  <div
                    className="absolute top-2.5 right-2 text-lg text-gray-800 cursor-pointer"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </div>
                )}
              </div>

              <div className="flex items-center  text-xs text-light-blue gap-2 cursor-pointer">
                <label htmlFor="file" className="cursor-pointer">
                  Add Photo/Videos
                </label>
                <input
                  id="file"
                  type="file"
                  className=" "
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </div>

              <div className="flex flex-col gap-5 pt-5 pb-5">
                <p className=" text-gray-500 text-center">
                  People who use our service may have uploaded your contact
                  information to Instagram.{" "}
                  <span className="text-blue-900">
                    {" "}
                    <NavLink
                      to="https://privacycenter.instagram.com/policies/cookies/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Learn More
                    </NavLink>
                  </span>
                </p>
                <p className=" text-gray-500  text-center">
                  By signing up, you agree to our{" "}
                  <span className="text-blue-900">
                    <NavLink
                      to="https://help.instagram.com/581066165581870/?locale=en_US"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Terms
                    </NavLink>
                  </span>{" "}
                  ,{" "}
                  <span className="text-blue-900">
                    {" "}
                    <NavLink
                      to="https://www.facebook.com/privacy/policy"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Privacy Policy
                    </NavLink>
                  </span>{" "}
                  and{" "}
                  <span className="text-blue-900">
                    {" "}
                    <NavLink
                      to="https://privacycenter.instagram.com/policies/cookies/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Cookies Policy
                    </NavLink>
                  </span>{" "}
                  .
                </p>
              </div>

              <div className="login-button flex justify-center">
                <button
                  type="submit"
                  className={`w-80 h-10 border rounded-lg
                   text-white font-semibold cursor-pointer 
                   flex justify-center items-center
                    ${
                      validateEmail(user.email) &&
                      user.password.length >= 8 &&
                      user.username &&
                      user.name
                        ? "bg-dark-blue"
                        : "bg-light-blue"
                    }
                   `}
                >
                  {isLoading ? (
                    <BsArrowClockwise className="animate-spin text-xl " />
                  ) : (
                    "Sign Up"
                  )}
                </button>
              </div>

              {userCreationError && (
                <div className="error">
                  <p className="flex justify-center items-center text-red-400">
                    {userCreationError}
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>

        <div className="flex border border-gray-300 items-center justify-center p-5 gap-1">
          <span>Have an account?</span>
          <span className="text-dark-blue font-semibold cursor-pointer">
            <NavLink to="/">Log in</NavLink>
          </span>
        </div>

        <div className="flex flex-col justify-center gap-5">
          <p className="flex  justify-center">Get the app.</p>
          <div className="flex item-center justify-center pb-10">
            <NavLink
              to="https://play.google.com/store/apps/details?id=com.instagram.android"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className="cursor-pointer"
                src={googlePlayLogo}
                style={{
                  maxWidth: "125px",
                }}
              />
            </NavLink>

            <NavLink
              to="https://www.microsoft.com/en-us/p/instagram/9nblggh5l9xt"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className="cursor-pointer"
                src={microsoftLogo}
                style={{
                  maxWidth: "100px",
                }}
              />
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
